function pluck(objects,property) {

     let mas= [];
     for (let value of Object.values(objects)){
     mas.push(value[property]);
     }
    delete mas[0]; //check if is not cloned by ref
    return mas;

}

let characters = [
    { name: "barney", age: 14 },
    { name: "sten", age: 18 }];
console.dir({characters});
console.log(pluck(characters, 'name')); //['barney', 'fred'];
console.dir({characters});

