function ground() {
  strokeWeight(1);
  stroke(255);
  line(0, height*.95, width, height*.95);
}

let totalDividingPoints = 10;
let totalLines = 10;
// height = totalHeight/(num of lines + 1)
let lineSpacing;
let allLines = [];

let p;
let randomizeYrange = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  lineSpacing = height/(totalLines+1);
  for (let i = 0; i < totalLines; i++) {
    let newLine = new _line(0.1*width, (i+1)*lineSpacing, 0.9*width, (i+1)*lineSpacing);
    allLines.push(newLine);
  }
}

function draw() {
  background(51);
  // ground();
  for (let currLine of allLines) {
    currLine.show();
    currLine.randomize();
  }

}

class _line
{
  constructor(x1, y1, x2, y2)
  {
    this.pos1 = createVector(x1, y1);
    this.pos2 = createVector(x2, y2);
    // this.length = dist(this.pos1, this.pos2);
    this.length = this.pos2.x - this.pos1.x
    this.minDist = this.length/totalDividingPoints;
    this.allPointX = [];
    this.allPointY = [];
    this.supports = [];

    this.randomizedYN = true;

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
    stroke(255);
    // line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
    for (let i = 0; i < this.allPointX.length-1; i++) {
      // line(this.allPointX[i][0], this.allPointX[i][1], this.allPointX[i+1][0], this.allPointX[i+1][1]);
      line(this.allPointX[i], this.allPointY[i], this.allPointX[i+1], this.allPointY[i+1]);
    }
    line(this.allPointX[totalDividingPoints-1], this.allPointY[totalDividingPoints-1], this.pos2.x, this.pos2.y);
    console.log(this.m);
    // console.log(this.allPointX.length);
  }

  randomize()
  {
    if (!this.randomizedYN) {
      for (let i = 0; i < this.allPointY.length; i++) {
        this.allPointY[i] += random(-1*randomizeYrange, randomizeYrange);
      }
      this.randomizedYN = true;
    }
  }
}

/*
let v1 = createVector(1, 0, 0);
let v2 = createVector(0, 1, 0);

let angle = v1.angleBetween(v2);
// angle is PI/2
print(angle);
*/