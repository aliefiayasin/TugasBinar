class Animals {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sing() {
        return `${this.name} can sing`;
    }
    dance() {
        return `${this.name} can dance`;
    }    
    walk() {
        return `${this.name} can walk`;
    }
    walk() {
        return `${this.name} can eat`;
    }
    walk() {
        return `${this.name} can scream`;
    }
} 
class Cats extends Animals {
    constructor(name, age, whiskerColor) {
        super(name, age);
        this.whiskerColor = whiskerColor;
    }
    whiskers() {
        return `I have ${this.whiskerColor} whiskers`;
    }
}
class Dogs extends Animals {
    constructor(name, age, type) {
        super(name, age);
        this.type = whiskerColor;
    }
    whiskers() {
        return `I have ${this.type} dog`;
    }
}
let clara = new Dogs("Clara", 33, "indigo");