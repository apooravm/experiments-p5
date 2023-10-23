let bob;
let bob2;
let bob3;
let spring;
// let spring2;
// let spring3;

// let bobs = [[]];
let springs = [];
let spacing = 20;
// let spacingRowsDiff = 10;
let gravity;

let sx;
let sy;
let sRadius = 30;

let squareLength = 20

var bobs = new Array(squareLength);

for (var i = 0; i < bobs.length; i++) {
  bobs[i] = new Array(squareLength);
}

// console.log(x);

let k = 0.3;
let restLength = 300;

function setup() {
  // createCanvas(1200, 600);
  createCanvas(windowWidth-1, windowHeight-1);
  // bob = new Particle(200, 200);
  // bob2 = new Particle(400, 500);
  // bob3 = new Particle(600, 700);
  // spring = new Spring(k, restLength, bob2, bob);
  // spring2 = new Spring(k, restLength, bob2, bob3);
  // // spring3 = new Spring(k, restLength, bob3, bob2);

  // for (let i = 0; i < 50; i++) {
  //   bobs[i] = new Particle(200, i*spacing);
  //   if (i != 0) {
  //     let a = bobs[i];
  //     let b = bobs[i-1];
  //     let spring = new Spring(k, spacing, a, b);
  //     springs.push(spring);
  //   }

  for (let i = 0; i < squareLength; i++) {
    for (let j = 0; j < squareLength; j++) {
      bobs[i][j] = new Particle(i*spacing, j*spacing);
      if (j!=0) {
        let a = bobs[i][j];
        let b = bobs[i][j-1];
        let spring = new Spring(k, spacing, a, b);
        springs.push(spring);
      }
      if (i!=0) {
        let a = bobs[i][j];
        let b = bobs[i-1][j];
        let spring = new Spring(k, spacing, a, b);
        springs.push(spring);
      }
    }
  }
  bobs[0][0].locked = true;
  bobs[bobs.length-1][0].locked = true;
  // bobs[bobs.length-1].locked = true;

  gravity = createVector(0, 0.1);

  sx = width/2;
  sy = height/2;
}

function draw() {
  background(51);
  // spring.show();
  // spring2.show();
  // // spring3.show();

  // bob.show();
  // bob.update();

  // bob2.show();
  // bob2.update();

  // bob3.show();
  // bob3.update();

  // spring.update();
  // spring2.update();
  // // spring3.update();

  // if (mouseIsPressed) {
  //   bob2.position.set(mouseX, mouseY);
  //   // bob.velocity.set(0, 0);
  // }

  for (let spring of springs) {
    spring.update();
    spring.show();
  }

  for (let bob of bobs) {
    for (let b of bob) {
      b.applyForce(gravity);
      b.update();
      b.show();
    }
  }

  // bobs[0].position.set(width/2, 0);
  // bobs[0].velocity.set(0, 0);

  let mid = bobs[bobs.length-1][bobs.length-1];
  if (mouseIsPressed) {
    mid.position.set(mouseX, mouseY);
    mid.velocity.set(0, 0);
    // let minLength = 15
    // for (let bob of bobs) {
    //   for (let b of bob) {
    //     if (b.position.x < mouseX+minLength && b.position.x > mouseX-minLength && b.position.y < mouseY+minLength && b.position.y > mouseY-minLength)
    //     {
    //       b.position.set(mouseX, mouseY);
    //       b.velocity.set(0, 0);
    //     }
    //   }
    // }
  }

}