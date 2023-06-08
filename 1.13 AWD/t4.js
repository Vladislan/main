function СreateGreetable (str) {
    //this.greeting='';
    this.perName=str;
    // return `${this.greet}, ${this.perName}!`
    //console.log(new.target);
}

СreateGreetable.prototype.greet=function(greet){
    this.greeting=greet;
    return this;
}



//console.log(СreateGreetable()); //undefined without new
const g= new СreateGreetable('Andriy!').greet('Hello ');
console.log(g.greeting+g.perName);
// console.log(g.__proto__);//get prototype obj
// console.log(СreateGreetable.prototype);//get funct prototype
const f=Object.create(g);
f.perName='gs';
console.log(СreateGreetable.prototype);
const d= new f.constructor('Ivan!');
d.greet('Hello');
console.log(d.greeting+' '+d.perName);