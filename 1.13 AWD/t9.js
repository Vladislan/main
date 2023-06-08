class Worker{

    #rate=0;
    #days=0;

    constructor(name,surname){
        this.name=name;
        this.surname=surname;
    }

    set rate(value){
        if(value <=0) throw new Error("Зарплата не натуральне число!");
        this.#rate=value;

    }

    set days(value){
        if(value <=0) throw new Error("К-ть днів не натуральне число!");
        this.#days=value;

    }
    


    getSalary(){
        let price=this.#rate*this.#days;
        return price==0?'невизначена':price +" грн";
    }

    toString(){
        return this.name+" "+this.surname+"  зарплата "+this.getSalary();
    }

}

let w1=new Worker("w1","good");
w1.days=2;
w1.rate=5;
console.log(w1.toString());