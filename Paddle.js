class Paddle {
    constructor(x, y, w, h, side, c, pres) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.side = side;
        this.c = c;
        this.vy = 0;
        this.pres = pres
    }


    draw(ctx, img) {
        ctx.drawImage(img, this.x, this.y, 155, 120);
    }



    move(isCPU, ball) {

        if (isCPU) {
            if (ball.x <= 200) {
                hit_leftSide = true;
            }
            if (ball.x >= 595) {
                hit_leftSide = false;
            }
            if (hit_leftSide == true && ball.x >= 200) {
                this.y = this.moveWithCPU(ball.x, ball.y, ball.vy, ball.vx);
                hit_leftSide = false;
            }

            // this.y = ball.y;
        }

        this.y += this.vy;
        if (this.y < 0) this.y = 0;
        if (this.y + this.h > boardHeight) this.y = boardHeight - this.h;

    }
    moveWithCPU(x, y, y_vel, x_vel) {
        if ((y <= 0 || y >= 750) && x < this.x) {
            y_vel = -1 * y_vel;
            x = x + x_vel
            y = y + y_vel
            return this.moveWithCPU(x, y, y_vel, x_vel);
        }
        if (x < this.x) {
            return this.moveWithCPU(x += x_vel, y += y_vel, y_vel, x_vel);
        } else {
            return y;
        }


    }
}