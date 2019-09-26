// Global variables
var tatImg,dagImg,deathImg,benImg,xWingImg,tieImg,yodaImg,rockImg,dag2Img;
var fontReg,fontBold;
var level,stage,gameOver,count,execute,lives,loseLife;
var posX,posY,shipX,shipY,pos2X,pos2Y;
var enemies,rock1,wall1,wall2,wallS;
var crash;

function ready(){
	document.getElementById('opening').click();
	document.getElementById('opening').play();
}

function videoEnd(){
	$('#vidContainer').remove();
}

function lightsaber(choice){ // Change cursor with lightsaber choice
	var l_url = 'url(images/' + choice + '_l.png), auto';
	$('html,body,#l1,#l2,#l3,#l4,#l5,#l6,#submit_button,#padawan,#knight,#master').css('cursor',l_url);
}

function askLevel(){ // Have user choose level
	$('#page1').html('');
	$('#page2').css('display','block');
	return false;
}

function showCanvas(level_num){ // Show appropriate canvas once level is chosen
	$('#page2').html('');
	$('#defaultCanvas0').css('display','block');
	level = level_num;

	if (level_num == 0){
		lives = 3;
	}
	else if (level_num == 1){
		lives = 2;
	}
	else if (level_num == 2){
		lives = 1;
	};

	return false;
}

function preload(){ // Preload images and font
	fontReg = loadFont('fonts/pixelmix.ttf');
	fontBold = loadFont('fonts/pixelmix_bold.ttf');

	tatImg = loadImage('images/tatooine2.jpg');
	dagImg = loadImage('images/dagobah.jpg');
	deathImg = loadImage('images/deathstar.png');
	benImg = loadImage('images/benkenobi.png');
	xWingImg = loadImage('images/xwing.png');
	tieImg = loadImage('images/tiefighter.png');
	yodaImg = loadImage('images/yoda.png');
	rockImg = loadImage('images/rock3.png');
	dag2Img = loadImage('images/dagobah2.jpg');

	crash = loadSound('sounds/crash.mp3');
}

function setup(){ //Set up canvas and all initial items
	cnv = createCanvas(698,600);
	cnv.position(((windowWidth - width)/2), ((windowHeight - height)/2));

	//General formatting
	colorMode(RGB, 255, 255, 255, 1);
	textFont(fontReg);
	noStroke();

	// Action logic variables
	stage = 0;
	gameOver = false;
	count = 0;
	execute = false;

	// Padawan
		// Ship
		posX = width/2 - 20;
		posY = -3400;

		// TIE fighters
		enemies = [];
		for (var i=0; i<25; i++){
			enemies[i] = new Enemy();
		}

		// Rock and walls
		rock1 = new Rock();
		wall1 = -50;
		wall2 = 630;
		wallS = random(-2,2);

	// Knight
		// Ship
		pos2X = width/2 - 20;
		pos2Y = -3400;

		// TIE fighters
		enemies2 = [];
		for (var i=0; i<40; i++){
			enemies2[i] = new Enemy();
		}

		//Droids and walls

	// Master
		// Ship
		// TIE fighters and ships
		// Objects and walls
}

function draw(){
	if (!gameOver && !loseLife){
		if (level == 0){ // Padawan
			if (stage == 0){ // Tatooine to Dagobah
				image(tatImg,0,posY);
				image(benImg, width/2,posY+3700);
				fill(255,255,255,.5);
				rect(75,posY+3600,360,70);
				fill(0,0,0,1);
				text('Ben: To begin your training, you must\nleave Tatooine and head straight for\nDagobah! What are you waiting for? Go!', 100, posY+3625);
				fill(255,215,0,1);
				text('Avoid enemy ships on your way!', 225, posY+3300);

				for (var i=0; i<25; i++){
					enemies[i].display(posX,posY);
					enemies[i].move();
				}

				fill(255,215,0,1);
				image(xWingImg,posX,500);

				if (keyIsDown(87)){
					posY += 2;
				};
				if (keyIsDown(65)){
					posX -= 2;
				};
				if (keyIsDown(68)){
					posX += 2;
				};

				posX = constrain(posX, 0, width-50);
				posY = constrain(posY, -3400, 0);

				if (posY == 0 && 450 <= posX && posX <= 600){
					stage = 1;
				};
			}
			else if (stage == 1){ // Dagobah intro
				image(dagImg,0,0);
				image(yodaImg, 40,250);
				fill(255,255,255,.5);
				rect(88,185,360,50);
				fill(0,0,0,1);
				text('Yoda: Want to train, you do? Hee hee hee, \nMmm, lift rocks, you must.', 100, 207);
				fill(255,215,0,1);
				text('Oh no, your ship has crash landed...', 210, 100);
				rock1.display();

				setTimeout(function(){
					stage = 1.1;
				}, 3000);
			}
			else if (stage == 1.1){ //Dagobah lift 1 rock
				image(dagImg,0,0);
				image(yodaImg, 40,250);
				fill(255,215,0,1);
				text('Lift the rock!', 300, 100);
				rock1.display();

				if (execute){
					text('Stay within the boundaries!', 240, 125);
					rock1.move();

					fill(255,255,255,.75);
					rect(width/2-200,wall1,400,20);
					rect(width/2-200,wall2,400,20);

					if (wall1 == 180 || wall2 == 400){
						stage = 1.2;
					}
					else{
						wall1 += .25;
						wall2 -= .25;
					};
				};
			}
			else if (stage == 1.2){ //Dagobah lift 1 rock while walls move
				image(dagImg,0,0);
				image(yodaImg, 40,250);
				rock1.display();
				rock1.move();

				fill(255,215,0,1);
				text('count: '+count, 20, 50);

				fill(255,255,255,.75);
				rect(width/2-200,wall1,400,20);
				rect(width/2-200,wall2,400,20);

				if (wall1 < 0){
					wallS = random(.25,1.75);
					count += 1;
				};
				if (wall2 > height-20){
					wallS = random(-1.75,-.25);
					count += 1;
				};

				if (count == 7){
					level = 1;
					stage = 0;
				};

				wall1 += wallS;
				wall2 += wallS;
			}
		}
		else if(level == 1){ // Knight
			if (stage == 0){ //Dagobah to Death Star
				image(dag2Img,0,pos2Y);
				image(yodaImg, 40,pos2Y+3650);
				fill(255,255,255,.5);
				rect(88,pos2Y+3600,395,35);
				fill(0,0,0,1);
				text('Yoda: Ready, you are. Time to face Sith, it is.', 100, pos2Y+3622);
				fill(255,215,0,1);
				text('Head for the DEATH STAR.', 250, pos2Y+3500);

				for (var i=0; i<40; i++){
					enemies2[i].display(pos2X,pos2Y);
					enemies2[i].move();
				}

				fill(255,215,0,1);
				image(xWingImg,pos2X,500);

				if (keyIsDown(87)){
					pos2Y += 2;
				};
				if (keyIsDown(65)){
					pos2X -= 2;
				};
				if (keyIsDown(68)){
					pos2X += 2;
				};

				pos2X = constrain(pos2X, 0, width-50);
				pos2Y = constrain(pos2Y, -3400, 0);

				if (pos2Y == 0 && 35 <= pos2X && pos2X <= 215){
					stage = 1;
				};
			}
			else if (stage == 1){ //Death star intro
				background(0,0,0,1);
				fill(255,215,0,1);
				textAlign(CENTER);
				text('That\'s all I have for now!\nI plan on working on this game more, but\nI really should get this assignment in...', 349, height/2-15);
			}
			else if (stage == 1.1){ //Death star lift 2 droids
			}
			else if (stage == 1.2){ //Death star lift 2 droids while walls move
			}
		}
		else if(level == 2){ // Master
			if (stage == 0){ // Death star to star destroyer
				background(0,0,0,1);
				fill(255,215,0,1);
				textAlign(CENTER);
				text('That\'s all I have for now!\nI plan on working on this game more, but\nI really should get this assignment in...', 349, height/2-15);
			}
			else if (stage == 1){ // Star destoryer intro
			}
			else if (stage == 1.1){ // Star destoryer lift 3 objects
			}
			else if (stage == 1.2){ // Star destoryer lift 3 objects while walls move
			}
			else if (stage == 2){ // Strike down sith
			}
			else if (stage == 2.1){ // Congrats!
			};
		};
	}
	else if (gameOver){
		fill(255,215,0,1);
		textSize(20);
		textAlign(CENTER)
		text('Game Over!',width/2,height/2-10);
	};

	if (loseLife){
		noLoop();
		lives -= 1;

		if (stage == 0){
			crash.play();
		}

		if (lives == 2 || lives == 1){
			fill(255,215,0,1);
			textSize(20);
			textAlign(CENTER);
			text('Life lost!',width/2,height/2-40);
			text('Lives left: '+lives,width/2,height/2-10);
			text('Press SPACE to continue.',width/2,height/2+75);
		}
		else if (lives == 0){
			gameOver = true;
			loseLife = false;
			loop();
		};
	};
	textSize(12);
	fill(255,215,0,1);
	textAlign(LEFT);
	text('Lives: '+lives, 20, 25);
};

function keyTyped(){
	if (key === 'w' && level == 0 && stage == 1.1){
		execute = true;
	};
	if (keyCode === 32 && loseLife){
		loseLife = false;

		posX = width/2 - 20;
		posY = -3400;
		pos2X = width/2 - 20;
		pos2Y = -3400;
		wall1 = -50;
		wall2 = 630;
		count = 0;

		if (level == 0 && stage == 1.2){
			stage = 1.1;
		};

		loop();
	};
}

function windowResized(){ // Keep canvas centered
	cnv.position(((windowWidth - width)/2), ((windowHeight - height)/2));
}

class Rock{ // Rock object
	constructor(){
		this.graphic = rockImg;
		this.rockX = width/2-40;
		this.rockY = 500;
		this.speed = 2;
	}
	display(){
		image(this.graphic,this.rockX,this.rockY);

		if (this.rockY < wall1+20 || this.rockY+71 > wall2 || this.rockY < 0 || this.rockY > 600){
			loseLife = true;
		};
	}
	move(){
		this.rockY += this.speed;
		if (keyIsDown(87)){
			this.rockY -= 4;
		};
		if (this.rockY > height-71){
			this.speed = 0;
		};
	}
}

class Enemy{ //TIE fighters
	constructor(){
		this.graphic = tieImg;
		this.shipX = random(0,width-75);
		this.shipY = random(600,3000);
		this.speed1 = random(-2,-.25);
		this.speed2 = random(.25,2);
		if (random(-1,1) > 0){
			this.speed = this.speed1;
		}
		else{
			this.speed = this.speed2;
		};
	}
	display(posX,posY){
		image(this.graphic,this.shipX,posY+this.shipY);
		var d = dist(posX, 500, this.shipX, posY+this.shipY);

		if (d < 65){
			loseLife = true;
		};
	}
	move(){
		this.shipX += this.speed;
		if (this.shipX < 0 || this.shipX > width-75){
			this.speed *= -1;
		}
	}
}
