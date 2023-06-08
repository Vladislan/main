function* genSeq(start,step){
    for(let i=start; ; i+=step){
        yield i;
    }
}


function* sequence(start, step=1) {
    yield*  genSeq(start,step);
    // for(let i=start; i<=step; i++){
    //     yield i;
    // }
}

//let generator = [...sequence(4,9)];
let generator2 = sequence(7,1);
let generator = sequence(10,3);

//console.log(generator);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator2.next().value);
console.log(generator.next().value);
console.log(generator2.next().value);




