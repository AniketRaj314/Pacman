let width, height, diameter, pacman, gap, flg_gap, steps, factor;
let food;

function setup() {
    width = innerWidth;
    height = innerHeight - 4;
    diameter = 50;
    createCanvas(width, height);
    pacman = new Pacman();
    angleMode(DEGREES);
    gap = 0;
    flg_gap = 0;
    steps = 5;
    factor = 0;
    food = [];
    spawnFood();
}

function spawnFood() {
    for(let i = 0; i < 30; i++) {
        food.push(new Food(floor(random(width - diameter)), floor(random(height - diameter))));
    }
}

function draw() {
    for (let i = 0; i < steps; i++) {
        background(0);
        for(const f of food) {
            f.update();
            f.show();
        }
        pacman.update();
        pacman.show();
        alterGap();
        console.log(gap);
    }
}

function alterGap() {
    if (!flg_gap) {
        gap++;
        if (gap == 90) {
            flg_gap = !flg_gap;
        }
    } else {
        gap--;
        if (gap == 0) {
            flg_gap = !flg_gap;
        }
    }
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        pacman.xSpeed = 0;
        pacman.ySpeed = -1;
        factor = 3;
    }
    if (keyCode == DOWN_ARROW) {
        pacman.xSpeed = 0;
        pacman.ySpeed = 1;
        factor = 1;
    }
    if (keyCode == LEFT_ARROW) {
        pacman.xSpeed = -1;
        pacman.ySpeed = 0;
        factor = 2;
    }
    if (keyCode == RIGHT_ARROW) {
        pacman.xSpeed = 1;
        pacman.ySpeed = 0;
        factor = 0;
    }
}

class Pacman {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.xSpeed = 1;
        this.ySpeed = 0;
    }

    show() {
        fill(255, 255, 0);
        stroke(255);
        strokeWeight(2);
        ellipseMode(CENTER);
        let start = factor * 90 + gap / 2;
        let stop = start + (360 - gap);
        arc(this.x, this.y, diameter, diameter, start, stop);
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.x = constrain(this.x, diameter / 2, width - diameter / 2);
        this.y = constrain(this.y, diameter / 2, height - diameter / 2);
    }
}

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.exist = 1;
    }

    show() {
        fill(255);
        if(this.exist) {
            ellipse(this.x, this.y, 5, 5);
        }
    }

    update() {
        if(abs(this.x - pacman.x) <= diameter / 2 && abs(this.y - pacman.y) <= diameter / 2) {
            this.exist = 0;
        }
    }
}