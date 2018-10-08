"use strict";

function setup() {	
	createCanvas(treeImageWidth + diverImageWidth, treeImageHeight);
	angleMode(DEGREES);
	noStroke();
	frameRate(60);
}


const LEFT_BOUND_RESET  = -300;
class Tree {
	constructor(opts) {
		this.treePosX = opts.treePosX;
		this.treePosY = opts.treePosY;
		this.originalPosX = opts.treePosX;
		this.originalPosY = opts.treePosY;
		this.treeSize = opts.treeSize;
		this.dx = opts.treeDx;
		this.dy = opts.treeDy;

		this.leftMostX = -78;
		this.rightMostX = 81;
		this.MAX_X = diverImageWidth + treeImageWidth;
		this.MIN_X = 0;
		this.duplicated = false;
	}

	drawTree() {
		this.updatePos();

		push();

		fill(140,82,45);
		translate(this.treePosX,this.treePosY);
		scale(this.treeSize);
		//branches pt 1
		beginShape();
		vertex(6,-241)
		vertex(30,-240);
		vertex(46,-265);
		vertex(35,-300);
		vertex(13,-327);
		vertex(36,-305);
		vertex(46,-329);
		vertex(39,-301);
		vertex(51,-267);
		vertex(33,-235)
		vertex(10,-225);
		endShape(CLOSE);

		//trunk
		beginShape();
		vertex(10,0);
		vertex(10,-225);
		vertex(-10,-225);
		vertex(-10,0);
		endShape(CLOSE);

		//branches pt2
		beginShape();
		vertex(8,-241);
		vertex(12,-257);
		vertex(30,-279);
		vertex(68,-293);
		vertex(80,-311);
		vertex(81,-326);
		vertex(74,-311);
		vertex(69,-310);
		vertex(58,-324);
		vertex(67,-307);
		vertex(71,-307);
		vertex(67,-297);
		vertex(28,-284);
		vertex(7,-258);
		vertex(-3,-247);
		vertex(-32,-281);
		vertex(-32,-290);
		vertex(-26,-306);
		vertex(-24,-326);
		vertex(-29,-311);
		vertex(-40,-325);
		vertex(-32,-304);
		vertex(-35,-292);
		vertex(-36,-279);
		vertex(-58,-295);
		vertex(-64,-311);
		vertex(-58,-323);
		vertex(-68,-312);
		vertex(-78,-322);
		//vertex(-72,-309);
		vertex(-61,-291);
		vertex(-34,-273);
		vertex(-17,-251);
		vertex(-10,-225);
		vertex(10,-225);
		vertex();
		vertex();
		vertex();
		endShape(CLOSE);

		pop();
	}

	updatePos() {
		if (!ANIMATE) return;

		if (this.treePosX + this.rightMostX < this.MIN_X) {
			this.treePosX = this.MAX_X;
			return;
		}
	
		this.treePosX += this.dx;
		this.treePosY += this.dy;
	}

	wrapAroundDuplicate() {
		if (this.treePosX + this.leftMostX < this.MIN_X && !this.duplicated) {
			this.duplicated = true;
			return new Tree({
					treePosX: this.MAX_X - this.leftMostX, 
					treePosY: this.treePosY,
					treeSize: this.treeSize, 
					treeDx: this.dx, 
					treeDy:this.dy
				})
		} else {
			return null;
		}
	}

	offScreen() {
		return this.treePosX + this.rightMostX < this.MIN_X;
	}
}

class TreeScene {
	constructor(opts) {
		this.trees = [];
		opts.treeOpts.forEach(treeOpt => {
			let t = new Tree(treeOpt);
			this.trees.push(t);
		})
		this.duplicates = [];
		this.sunX = opts.sunX;
		this.sunY = opts.sunY;
		this.sunWidth = opts.sunWidth;
		this.sunHeight = opts.sunHeight;
		this.textPos = opts.textPos;
		this.textScale = opts.textScale;
		this.originX = opts.originX;
		this.originY = opts.originY;
		this.imageHeight = opts.imageHeight;
		this.imageWidth = opts.imageWidth;
	}

	renderComponents() {
		fill(245);
		rect(this.originX, this.originY, treeImageWidth, treeImageHeight);

		//sun
		fill(255,100,30);
		ellipse(this.originX * random(1,1.01), this.imageHeight/2*(random(1,1.01)), this.sunWidth, this.sunHeight);

		for (var i = 0; i < this.trees.length; i++) {
			var currentTree = this.trees[i];
			var newTree = currentTree.wrapAroundDuplicate();
			if (newTree !== null) {
				this.duplicates[i] = newTree;
			}

			currentTree.drawTree();
			if (typeof this.duplicates[i] !== 'undefined' && this.duplicates[i] !== null) {
				this.duplicates[i].drawTree();
			}

			if (currentTree.offScreen()) {
				this.trees[i] = this.duplicates[i];
				this.duplicates[i] = null;
			}
		}
	//Text
		push();
		fill(255,125,125);
		textSize(treeImageWidth/6.6);
		textAlign(LEFT);
		textFont("HELVETICA");
		textStyle('bold');
		text("STUBBORN",treeImageWidth/2,120);
		pop();

		fill(211, 183, 22);
		triangle(516 + treeImageWidth, 376 + (treeImageHeight - diverImageHeight), 565 + treeImageWidth, 283 + (treeImageHeight - diverImageHeight), 565 + treeImageWidth, 376 + (treeImageHeight - diverImageHeight));
	}
}

class Diver { 
	constructor(opts) {
		this.opts = opts;
		this.animationIncrement = 1;
		this.direction = 1;
		this.iterationCount = 0;
		this.diverInitialVelocity = 2;
		this.diverStartX = opts.diverOrigin.x;
		this.diverStartY = opts.diverOrigin.y;
		this.diverCurrentX = opts.diverOriginX;
		this.diverCurrentY = opts.diverOriginY;
		this.diverOrigin = opts.diverOrigin;
		this.rotation = opts.diverRotation;
		this.scale = opts.diverScale;
	}

	yPos() {
		let t = this.iterationCount/20;
		let pos = 4.9 * t * t + this.diverInitialVelocity * t + this.diverStartY;
		if (pos > height) {
			this.direction = -this.direction;
		}
		return pos;
	}

	xPos() {
		let pos = this.diverStartX + this.iterationCount;
		if (pos < diverX) {
			this.direction = -this.direction;
		}
		return pos;
	}	

	render() {
	  	if (!ANIMATE) {
			this.animationIncrement = 0;
		} else {
			this.animationIncrement = 1;
		}

		push();

		translate(this.xPos(), this.yPos());
		rotate(this.rotation);
		scale(this.scale);

		let bodyCorners = [
			{x: 8, y: 9},
			{x: -3, y: -7},
			{x: -4, y: -16},
			{x: -8, y: -17},
			{x: 6, y: 10}
		]

		
		// Diver
		fill(209, 194, 125);
		beginShape();
			vertex(bodyCorners[0].x, bodyCorners[0].y);
			bezierVertex(4, 4, 2, -3, bodyCorners[1].x, bodyCorners[1].y);
			vertex(bodyCorners[2].x, bodyCorners[2].y);
			vertex(bodyCorners[3].x, bodyCorners[3].y);
			bezierVertex(-3, -1, 3, 6, bodyCorners[4].x, bodyCorners[4].y);
		endShape();
	
		fill(202, 207, 209);
		triangle(bodyCorners[2].x, bodyCorners[2].y, -10, -45, bodyCorners[3].x, bodyCorners[3].y);
		
		fill(202, 207, 209);
		//stroke(128);
		beginShape();
	//		vertex(bodyCorners[0].x, bodyCorners[0].y);
			vertex(bodyCorners[4].x, bodyCorners[4].y);
			bezierVertex(10, 23, 9, 18, 15, 28);
			bezierVertex(10, 21, 9, 16, bodyCorners[0].x, bodyCorners[0].y);
		endShape();
		fill(23, 23, 21);
		ellipse(11, 4, 8, 8);	

		pop();
		this.iterationCount += this.animationIncrement * this.direction;
	}
}

class DiverScene {
	constructor(opts) {
		this.diver = new Diver(opts);
		this.opts = opts;
	}

	renderComponents() {
		fill(213, 213, 213);
		rect(0, 0, diverImageWidth, treeImageHeight);
		// first mountain shape
		push();

		translate(this.opts.backgroundOrigin.x, this.opts.backgroundOrigin.y);
		scale(this.opts.backgroundScale);
		rotate(this.opts.backgroundRotation);
		noStroke();

		//background(213, 213, 213);

	
		

		fill(213, 120, 89);
		quad(0, 0, 0, -120, 56, 140, 0, 376);
	
		fill(48, 63, 84);
		beginShape();
			vertex(0, 376)
			vertex(56, 140);
			vertex(89, 0);
			vertex(89, 0);
			//184
			vertex(184, 308);
			vertex(196, 376);
		endShape();
	
		fill(49, 48, 62);
		triangle(56, 140, 0, 376, 140, 376);
	
		fill(181, 188, 204);
		let leftX = 171;
		let rightX = 290;
		triangle(leftX + (rightX - leftX) / 2, 60, leftX, 376, rightX, 376);
	
		
		fill(41, 59, 83);
		stroke(41, 59, 83);
		triangle(171, 376, 198, 376, 184, 309);
	
		
		
		// 516
		

	
		pop();
		this.diver.render();
	}
}

var ANIMATE = false;

const treeDx = -5;
const treeDy = 0;
const treeImageWidth = 600, treeImageHeight = 600;
const diverImageWidth = 565, diverImageHeight = 376;

const diverX = 315;
const diverY = 269;
let diverScene = new DiverScene({
	backgroundOrigin: {x: 0, y: treeImageHeight - diverImageHeight},
	backgroundScale: 1,
	backgroundRotation: 0,
	diverOrigin: {
		x: diverX,
		y: diverY,
	},
	diverScale: 1,
	diverRotation: 0
});

const textPosX = treeImageWidth/2, textPosY = 120;
const textScale = treeImageWidth/6.6;
const sunX = diverImageWidth; //+ treeImageWidth/2;
const sunY =  treeImageHeight/2;
const sunWidth = treeImageWidth/3.5;
const sunHeight = treeImageHeight/4;

let treeScene = new TreeScene({
	treeOpts: [

		// middle
		{
			treePosX: diverImageWidth + treeImageWidth/2,
			treePosY: treeImageHeight, 
			treeSize: 1, 
			treeDx: treeDx, 
			treeDy: treeDy,
		},
		// left
		{
			treePosX:diverImageWidth,
			treePosY: treeImageHeight,
			treeSize: 0.9,
			treeDx: treeDx, 
			treeDy: treeDy,
		},
		// right
		{
			treePosX: diverImageWidth + treeImageWidth, 
			treePosY: treeImageHeight, 
			treeSize: 0.8,
			treeDx: treeDx, 
			treeDy: treeDy,
		}
	],
	textPosX: textPosX,
	textPosY: textPosY,
	textScale: textScale,
	sunWidth: sunWidth,
	sunHeight: sunHeight,
	sunX: sunX, 
	sunY: sunY,
	originX: diverImageWidth,
	originY: 0,
	imageWidth: treeImageWidth,
	imageHeight: treeImageHeight
});

function draw() {
	diverScene.renderComponents();
	treeScene.renderComponents();
}

function withinEllipse(x, y, h, k, a, b) {
	return (x - h) ** 2 / (a ** 2) + (y - k) ** 2 / (b ** 2);
}

function mouseClicked() {
	if (withinEllipse(mouseX, mouseY, sunX, sunY, sunWidth/2, sunHeight/2)) {
		ANIMATE = !ANIMATE;
	}
}


