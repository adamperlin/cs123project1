var treeDx = -5;
var treeDy = 0;

var width = 600, height = 600;

function setup() {
	createCanvas(600,600);
	angleMode(DEGREES);
	noStroke();
	frameRate(30);
}

class Tree {
	constructor(treePosX, treePosY, treeSize, dx, dy) {
		this.treePosX = treePosX;
		this.treePosY = treePosY;
		this.treeSize = treeSize;
		this.dx = dx;
		this.dy = dy;
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
		vertex(33,-235);
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
		console.log("Update pos: ", this.treePosX, this.treePosY);
		this.treePosX += this.dx;
		this.treePosY += this.dy;
	}
}

var tree1 = new Tree(width/2, height, 1, treeDx, treeDy);
var tree2 = new Tree(width/4, height, .9, treeDx, treeDy);
var tree3 = new Tree(3*width/4, height, .8, treeDx, treeDy);

function draw() {

	background(245);

	// scale(random(1,1.002));
	// translate(random(0,1),random(0,1));

	//sun
	fill(255,100,30);
	ellipse(width/2*(random(1,1.01)), height/2*(random(1,1.01)), width/3.5, height/4);


	//tree(width/2, height, 1);
	//tree(width/4, height, .9);
	//tree(3*width/4, height, .6);

	tree1.drawTree();
	tree2.drawTree();
	tree3.drawTree();




	//Text
	push();
	fill(255,125,125);
    textSize(width/6.6);
    textAlign(CENTER);
    textFont("HELVETICA");
    textStyle('bold');
    text("STUBBORN",width/2,120);
    pop();
}

