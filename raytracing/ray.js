class Ray {
    constructor(pos, angle, maxRayDist = Infinity) {
        this.pos = pos
        this.dirr = p5.Vector.fromAngle(angle);
        this.maxRayDist = maxRayDist;
    }

    lookAt(x, y) {
        this.dirr.x = x - this.pos.x;
        this.dirr.y = y - this.pos.y;
        this.dirr.normalize();
    }

    cast(wall) {
        const x1 = wall.a.x;
        const x2 = wall.b.x;
        const y1 = wall.a.y;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const x4 = this.pos.x + this.dirr.x;
        const y3 = this.pos.y;
        const y4 = this.pos.y + this.dirr.y;

        const den = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
        if (den == 0)
            return;
        else {
            const t = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / den;
            const u = (((x1 - x3) * (y1 - y2)) - ((y1 - y3) * (x1 - x2))) / den;

            if (t >= 0 && t <= 1 && u >= 0)
                return createVector((x1 + t * (x2 - x1)), (y1 + t * (y2 - y1)));
            return;
        }

    }

    show() {
        stroke(255);
        push()
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dirr.x * this.maxRayDist, this.dirr.y * this.maxRayDist);
        pop()
    }
}