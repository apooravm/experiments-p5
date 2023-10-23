class Particle
{
    constructor(x, y)
    {
        this.position = createVector(x, y);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.mass = 1;
        this.locked = false;
        // this.gravity
    }

    applyForce(force)
    {
        let f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    update()
    {
        if(!this.locked)
        {
            // this.applyForce(createVector(1, 1));
            this.velocity.mult(0.96);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }
    }

    show()
    {
        stroke(255);
        strokeWeight(1);
        fill(155, 70, 90);
        ellipse(this.position.x, this.position.y, 5);
    }
}