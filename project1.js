"use strict";

var treeDx = -5;
var treeDy = 0;
var treeImageWidth = 600, treeImageHeight = 600;
let diverImageWidth = 565, diverImageHeight = 376;

function setup() {	
	createCanvas(treeImageWidth + diverImageWidth, treeImageHeight);

	angleMode(DEGREES);
	noStroke();
	frameRate(30);
}

let diverScene = {
	renderComponents: (opts) => {
		// first mountain shape
		push();

		translate(opts.backgroundOrigin.x, opts.backgroundOrigin.y);
		scale(opts.backgroundScale);
		rotate(opts.backgroundRotation);
		noStroke();

		//background(213, 213, 213);

		fill(213, 213, 213);
		rect(0, 0, diverImageWidth, treeImageHeight);

		fill(213, 120, 89);
		quad(0, 0, 7, 0, 56, 140, 0, 376);
	
		fill(48, 63, 84);
		beginShape();
			vertex(0, 376)
			vertex(56, 140);
			vertex(89, 0);
			vertex(125, 0);
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
	
		fill(211, 183, 22);
		triangle(516, 376, 565, 283, 565, 376);
	
		pop();


		
		//let diverX = 315, diverY = 269;

		push();

		translate(opts.diverOrigin.x, opts.diverOrigin.y);
		rotate(opts.diverRotation);
		scale(opts.diverScale)

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
	}
}


/*const drawBuffer = (buffer, scene, pos, opts) => {
	pixelDensity(1);
	scene.renderComponents(buffer, opts);
	image(buffer, pos.x, pos.y);
}*/


const LEFT_BOUND_RESET  = -300;
class Tree {
	
	constructor(treePosX, treePosY, treeSize, dx, dy) {
		this.treePosX = treePosX;
		this.treePosY = treePosY;
		this.originalPosX = treePosX;
		this.originalPosY = treePosY;
		this.treeSize = treeSize;
		this.dx = dx;
		this.dy = dy;

		this.leftMostX = -78;
		this.rightMostX = 81;
		this.MAX_X = diverImageWidth + treeImageWidth;
		this.MIN_X = 0;
		this.duplicated = false;
	}

	/*wrapAroundVertex(pointX, pointY) {
		if (this.treePosX + pointX < this.MIN_X) {
			console.log("wrapping around...")
			this.pointX = 
		}

		console.log(adjX, " ", pointY)
		push();
		translate(, pointY);
		scale(this.treeSize);
		
		vertex(pointX, pointY);
		pop();
	}*/

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
			return new Tree(this.MAX_X - this.leftMostX, this.treePosY, this.treeSize, this.dx, this.dy)
		} else {
			return null;
		}
	}

	offScreen() {
		return this.treePosX + this.rightMostX < this.MIN_X;
	}
}

let diverX = 315, diverY = 269;

var ANIMATE = true;

var tree1 = new Tree(diverImageWidth + treeImageWidth/2, treeImageHeight, 1, treeDx, treeDy);
var tree2 = new Tree(diverImageWidth + treeImageWidth/4, treeImageHeight, 0.9, treeDx, treeDy);
var tree3 = new Tree(diverImageWidth + 3*treeImageWidth/4, treeImageHeight, 0.8, treeDx, treeDy);

var trees = [tree1, tree2, tree3];
var duplicates = [];

function draw() {
	//background(213, 213, 213)
	
	diverScene.renderComponents({
		backgroundOrigin: {x: 0, y: 0},
		backgroundScale: 1,
		backgroundRotation: 0,
		diverOrigin: {
			x: diverX,
			y: diverY
		},
		diverScale: 1,
		diverRotation: 0
	});







	// Tree scene 

	//background(245);
	fill(245);
	rect(diverImageWidth, 0, treeImageWidth, treeImageHeight);

	// scale(random(1,1.002));
	// translate(random(0,1),random(0,1));

	//sun
	fill(255,100,30);
	ellipse(diverImageWidth + treeImageWidth/2*(random(1,1.01)), treeImageHeight/2*(random(1,1.01)), treeImageWidth/3.5, treeImageHeight/4);


	//tree(width/2, height, 1);
	//tree(width/4, height, .9);
	//tree(3*width/4, height, .6);

	for (var i = 0; i < trees.length; i++) {
		var currentTree = trees[i];
		var newTree = currentTree.wrapAroundDuplicate();
		if (newTree !== null) {
			duplicates[i] = newTree;
		}

		currentTree.drawTree();
		if (typeof duplicates[i] !== 'undefined' && duplicates[i] !== null) {
			duplicates[i].drawTree();
		}

		if (currentTree.offScreen()) {
			trees[i] = duplicates[i];
			duplicates[i] = null;
		}

		
		console.log(trees.length);
		console.log(duplicates.length);
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
}



function mouseClicked() {
	ANIMATE = !ANIMATE;
}


