function ground() {
  strokeWeight(1);
  stroke(255);
  line(0, height*.95, width, height*.95);
}

let totalDividingPoints = 1000;
let totalLines = 50;
// height = totalHeight/(num of lines + 1)
let lineSpacing;
let allLines = [];

let p;
let randomizeYrange = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  lineSpacing = height/(totalLines+1);
  for (let i = 0; i < totalLines; i++) {
    let newLine = new _line(0.1*width, (i+1)*lineSpacing, 0.9*width, (i+1)*lineSpacing, i);
    allLines.push(newLine);
  }
}

function draw() {
  background(255);
  // ground();
  for (let currLine of allLines) {
    currLine.show();
    currLine.randomize();
  }

}

class _line
{
  constructor(x1, y1, x2, y2, indexVal)
  {
    this.indexVal = indexVal;
    this.pos1 = createVector(x1, y1);
    this.pos2 = createVector(x2, y2);
    // this.length = dist(this.pos1, this.pos2);
    this.length = this.pos2.x - this.pos1.x
    this.minDist = this.length/totalDividingPoints;
    this.allPointX = [];
    this.allPointY = [];
    this.supports = [];

    this.allPointY2 = [];

    this.randomizedYN = false;

    this.m = (this.pos2.y - this.pos1.y)/(this.pos2.x - this.pos1.x);
    this.b = this.pos1.y - this.m*this.pos1.x;

    for (let i = 0; i < totalDividingPoints; i++) {
      this.allPointX.push(this.pos1.x + this.minDist*(i))
      this.allPointY.push(this.m*(this.pos1.x + this.minDist*(i+1)) + this.b);
      
    }
  }
  
  show()
  {
    strokeWeight(1);
    stroke(51);
    // line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
    for (let i = 0; i < this.allPointX.length-1; i++) {
      // line(this.allPointX[i][0], this.allPointX[i][1], this.allPointX[i+1][0], this.allPointX[i+1][1]);
      line(this.allPointX[i], this.allPointY[i], this.allPointX[i+1], this.allPointY[i+1]);
    }
    line(this.allPointX[totalDividingPoints-1], this.allPointY[totalDividingPoints-1], this.pos2.x, this.pos2.y);
    console.log(this.m);
    // console.log(this.allPointX.length);
  }

  show2()
  {
    strokeWeight(1);
    stroke(51);
    // line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
    for (let i = 0; i < this.allPointX.length-1; i++) {
      // line(this.allPointX[i][0], this.allPointX[i][1], this.allPointX[i+1][0], this.allPointX[i+1][1]);
      line(this.allPointX[i], this.allPointY2[i], this.allPointX[i+1], this.allPointY2[i+1]);
    }
    line(this.allPointX[totalDividingPoints-1], this.allPointY2[totalDividingPoints-1], this.pos2.x, this.pos2.y);
    this.allPointY2 = [];
    // console.log(this.m);
    // console.log(this.allPointX.length);
  }

  randomize()
  {
    if (!this.randomizedYN) {
      for (let i = 0; i < this.allPointY.length; i++) {
        // if (1-) {
          
        // }
        this.allPointY[i] += random(-1*randomizeYrange*((this.indexVal/totalLines)*(i/this.allPointY.length)), randomizeYrange*(this.indexVal/totalLines)*(i/this.allPointY.length));
        // this.allPointY2.push(random(-1*randomizeYrange*((this.indexVal/totalLines)*(i/this.allPointY.length)), randomizeYrange*(this.indexVal/totalLines)*(i/this.allPointY.length)));
      }
      this.randomizedYN = true;
    }
    // this.show2();
  }
}

/*
let v1 = createVector(1, 0, 0);
let v2 = createVector(0, 1, 0);
let angle = v1.angleBetween(v2);
// angle is PI/2
print(angle);
*/
