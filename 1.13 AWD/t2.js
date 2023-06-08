function Table(length, width) {
    this.length = length;
    this.width = width;
    this.print = function () {
        let a = " @ "
        let sharp = " # "
        let board = "";
        for (let i = 1; i < this.length * this.width; i += 1) {
            if ((i % (this.length)) === 0) {
                board += i
            }
            if ((i % (this.width + 1)) === 0) {
                board += "\n";
            } else if (i % 2 !== 0) {
                board += sharp;
            } else if (i % 2 !== 1) {
                board += a;
            }
        }
        console.log( board)
    }
}

let t1 = new Table(10, 10)
let t2 = new Table(8,8)
t2.width=8;
t2.length=8;
t1.print();
t2.print();