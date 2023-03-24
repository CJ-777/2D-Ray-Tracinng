class Particle {
    constructor(x, y, numOfRays, rayMaxRadius) {
        this.pos = createVector(x, y);
        this.rayMaxRadius = rayMaxRadius;
        this.numOfRays = numOfRays;
        const angleOfRays = (int)(360 / this.numOfRays);
        this.rays = [];
        for (let i = 0; i < 360; i += angleOfRays)
            this.rays.push(new Ray(this.pos, radians(i), this.rayMaxRadius));
    }

    castAt(walls) {
        for (let ray of this.rays) {
            let minDist = Infinity;
            let minDistPoint = null;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let dist = pt.dist(this.pos);
                    if (dist < minDist) {
                        minDist = dist;
                        minDistPoint = pt;
                    }
                }
            }
            if (minDistPoint)
                line(this.pos.x, this.pos.y, minDistPoint.x, minDistPoint.y);
        }
    }

    setNumOfRays(val) {
        this.numOfRays = val;
        const angleOfRays = (int)(360 / this.numOfRays);
        this.rays = [];
        for (let i = 0; i < 360; i += angleOfRays)
            this.rays.push(new Ray(this.pos, radians(i), this.rayMaxRadius));
    }

    setPos(x, y) {
        this.pos.set(x, y);
    }

    show() {
        stroke(255);
        ellipse(this.pos.x, this.pos.y, 10, 10);
        for (let ray of this.rays)
            ray.show();
    }
}