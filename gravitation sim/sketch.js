let allThings = [];
let tempThing;
let maxThings = 1000;
let minWallDist = 0;
let wallMass = 999;
let wallU1 = 1;
let negAccVal = -1;
let G = 1000;
let velRetardingRate = 1;

let AttractionX;
let AttractionY;

let targetPos;

// let pt = createVector(400, 400);

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(400, 400);
  AttractionX, AttractionY = 400, 400;
  for (let i = 0; i < maxThings; i++) {
    tempThing = new Thing(random(width), random(height));// random(height));
    allThings.push(tempThing);
    
  }
  targetPos = createVector(AttractionX, AttractionY);
  background(51);
}

function draw() {
  background(51);
  // for (let currBall of allThings) {
  //   for (let otherBall of allThings) {
  //     if (otherBall != currBall) {
  //       let distance = dist(otherBall.x, otherBall.y, currBall.x, currBall.y);
  //       if (distance <= currBall.radius + otherBall.radius ) {
  //         if (currBall.isCollidingWithBall == false) {
  //           currBall.bounceOffBall(otherBall.mass, otherBall.velocity);
  //           currBall.isCollidingWithBall = true;
  //         }
  //       else
  //       {
  //         currBall.isCollidingWithBall = false;
  //       }
  //         // continue;
  //       }
  //     }
  //   }
  // }

  for (let ball of allThings) {
    // ball.applyForce(0, 0.1);
    // let dist = p5.
    // ball.applyForce((G/((ball.x-mouseX)**2)), (G/((ball.y-mouseY)**2)));
    let pos = createVector(ball.x, ball.y);
    let force = p5.Vector.sub(createVector(mouseX, mouseY), pos);
    let distSq = force.magSq();
    let strength = G / (constrain(distSq, 20, 3000));
    force.setMag(strength);
    ball.applyForce(force);

    ball.bounceOffWall();
    ball.update();
    ball.draw();
  }
}

class Thing
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.accelerationRange = 2;
    this.acceleration = createVector(random(-1*this.accelerationRange, this.accelerationRange), random(-1*this.accelerationRange, this.accelerationRange));
    this.velocity = createVector(0, 0);
    this.maxVelocity = 10;
    this.radius = random(5, 10);
    // this.radius = 5;
    this.isPoint = true;
    this.mass = 1;
    this.tempVelocity = this.velocity;
    this.isStuckToWallX = false;
    this.isStuckToWallY = false;
    this.isCollidingWithBall = false;
  }

  update()
  {
    this.velocity = this.tempVelocity;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.mult(velRetardingRate);
    this.acceleration.mult(0);
  }

  applyForce(force)
  {
    // this.acceleration.x += constrain(force.x, 0, 1000);
    // this.acceleration.y += constrain(force.y, 0, 1000);
    this.velocity.x += constrain(force.x, -100, 100);
    this.velocity.y += constrain(force.y, -100, 100);
  }

  getV2(m1=wallMass, u1=wallU1, m2, u2)
  {
    // let m1 = wallMass;
    // let u1 = wallU1;
    return (((m2-m1)/(m1+m2))*u2) + (((2*m1)/(m1+m2))*u1)
  }

  bounceOffWall()
  {
    if (this.x+this.radius + minWallDist > width || this.x-this.radius - minWallDist < 0) {
      if (!this.isStuckToWallX) {
        this.velocity.x *= negAccVal;
        this.isStuckToWallX = true; 
      }
      // this.velocity.x = this.getV2(this.mass, this.velocity.x);
    }
    else {
      this.isStuckToWallX = false;
    }
    if (this.y+this.radius + minWallDist > height || this.y-this.radius - minWallDist < 0) {
      if (!this.isStuckToWallY) {
        this.velocity.y *= negAccVal;
        this.isStuckToWallY = true; 
      }
      // this.velocity.y = this.getV2(this.mass, this.velocity.y);
    }
    else
    {
      this.isStuckToWallY = false;
    }
  }

  bounceOffBall(otherM1, otherU1)
  {
    this.tempVelocity.x = this.getV2(otherM1, otherU1.x, this.velocity.x, this.mass);
    this.tempVelocity.y = this.getV2(otherM1, otherU1.y, this.velocity.y, this.mass);
  }

  draw()
  {
    noFill();
    strokeWeight(1);
    stroke(255);
    if (!this.isPoint) {
      circle(this.x, this.y, this.radius*2); //takes diameter not radius!!!
    } else
    {
      // strokeWeight(this.radius);
      strokeWeight(2);
      point(this.x, this.y);
    }
    
  }
}
