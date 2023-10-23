// class Spring
// {
//     constructor(k, restLength, a, b)
//     {
//         this.k = k;
//         this.restLength = restLength;
//         this.a = a;
//         this.b = b;
//     }

//     update()
//     {
//         let force = p5.Vector.sub(this.a.position, this.b.position);
//         let x = force.mag() - this.restLength;
//         force.normalize();
//         force.mult(-1 * this.k * x);
//         this.a.applyForce(force);
//         force.mult(-1); //forces have to point in opposite directionsl thus inverting the force for 1 particle
//         this.b.applyForce(force);
//         // this.a.applyForce(createVector(1, 1));
//         // this.b.applyForce(createVector(0, 0));
//     }

//     show()
//     {
//         strokeWeight(3);
//         line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
//     }

// }

class Spring {
    constructor(k, restLength, a, b) {
      this.k = k;
      this.restLength = restLength;
      this.a = a;
      this.b = b;
    }
  
    update() {
      let force = p5.Vector.sub(this.b.position, this.a.position);
      let x = force.mag() - this.restLength;
      force.normalize();
      force.mult(this.k * x);
      this.a.applyForce(force);
      force.mult(-1);
      this.b.applyForce(force);
    }
  
    show() {
      strokeWeight(4);
      stroke(255);
      line(
        this.a.position.x,
        this.a.position.y,
        this.b.position.x,
        this.b.position.y
      );
    }
  }