
class City {
    #stations = [];
    #sunPanels = [];
    #livingBuildings=[];
    #totalConsume=0;
    #powerAvailable=0;
    #money=0;
    static notEnough=[];
    static moreEnough=[];

    getStation(i){
        return this.#stations[i];
    }
    getPanel(i){
        return this.#sunPanels[i];
    }
    setPowerAvailable(value){
        this.#powerAvailable=value;
    }
    addMoney(money){
        this.#money+=money;
    }
    getMoney(){
        return this.#money;
    }

    getTotalConsume(){
        return this.#totalConsume;
    }
    getPowerAvailable(){
        return this.#powerAvailable;
    }
    getName(){
        return this.name;
    }


    constructor(name) {
        this.name = "----------CITY "+name+"------------";
    }

    
    static toFill(...values){
        for(let i=0; i<values.length; i++){
            for(let j=0;j<15;j++){
                let build=new Building(j,Random.nextInt(1,400));
                values[i].addBuildig(build);

            }

            if(values[i] instanceof City){
                for(let j=0; j<2; j++){
                    let st=new Station(j,Random.nextInt(3,8));
                    let pan=new SunPanel(j,Random.nextInt(1,2));
                    values[i].addSource(st);
                    values[i].addSource(pan);
                    values[i].setPowerAvailable(values[i].getPowerAvailable()
                        +values[i].getStation(j).power+values[i].getPanel(j).power);
                    
                }
                values[i].setPowerAvailable(values[i].getPowerAvailable()-values[i].getTotalConsume());
                
            }
            else{
                throw new Error("unvalid type");
            }
        }
    }


    addSource(value) {
        if (value instanceof SunPanel){
            this.#sunPanels.push(value);
        }
        else if (value instanceof Station){
            this.#stations.push(value);
        }
        else{
            throw new Error("unvalid type");
        }
    }

    addBuildig(value){
        if(value instanceof Building){

        this.#totalConsume+=value.getConsume()*value.getFlatCount();   
        this.#livingBuildings.push(value);
        }
        else{
            throw new Error("unvalid type");
        }
    }

    
    

    getInfo(){
        console.log(this.name)

        // for (let i = 0; i < this.#livingBuildings.length; i++) {
        //     console.log(this.#livingBuildings[i]);
        // }
        console.log("Flats consume in total " +this.#totalConsume+" MWats");

        // for (let i = 0; i < this.#stations.length; i++) {
        //     console.log(this.#stations[i]);
        // }
        // for (let i = 0; i < this.#sunPanels.length; i++) {
        //     console.log(this.#sunPanels[i]);
            
        // }
        console.log("Power is free in total " +this.getPowerAvailable()+" MWats");
        console.log("Money: "+this.getMoney());

        

    }

    static toBalance(...cities){
        

        for (let i=0; i<cities.length; i++){
            cities[i].getInfo();
        }

        


        let indexNot=0;
        let indexMore=0;
        for (let i=0; i<cities.length; i++) {
              if(cities[i].getPowerAvailable()<0){
                    City.notEnough[indexNot]=cities[i];
                    indexNot++;
              }
              else if (cities[i].getPowerAvailable()>0){
                    City.moreEnough[indexMore]=cities[i];
                    indexMore++;
              }  
        }

        City.notEnough.sort((x,y)=>x.getPowerAvailable()-y.getPowerAvailable());
        City.moreEnough.sort((x,y)=>x.getPowerAvailable()-y.getPowerAvailable()).reverse();

        for (let i = 0; i < City.notEnough.length; i++) {
                for (let j = 0; j < City.moreEnough.length; j++) {
                    if(City.moreEnough[j].getPowerAvailable()==0){
                        continue;
                    }

                    if(City.notEnough[i].getPowerAvailable()!=0){
                        let cNotEn=City.notEnough[i];
                        let cMoreEn=City.moreEnough[j];
                        
                        if(Math.abs(cNotEn.getPowerAvailable())>cMoreEn.getPowerAvailable()){
                            let mon=TransferLine.getProfitableLine(cMoreEn.getPowerAvailable(),cNotEn);
                            cMoreEn.addMoney(mon);

                            cNotEn.addMoney(-Math.abs(mon));

                            cNotEn.setPowerAvailable(cNotEn.getPowerAvailable()+cMoreEn.getPowerAvailable());
                            cMoreEn.setPowerAvailable(0);
                        }
                        else if(Math.abs(cNotEn.getPowerAvailable())==cMoreEn.getPowerAvailable()){
                            let mon=TransferLine.getProfitableLine(cMoreEn.getPowerAvailable(),cNotEn);
                            cMoreEn.addMoney(mon);

                            cNotEn.addMoney(-Math.abs(mon));


                            cNotEn.setPowerAvailable(0);
                            cMoreEn.setPowerAvailable(0);
                        }
                        else if(Math.abs(cNotEn.getPowerAvailable())<cMoreEn.getPowerAvailable()){
                            
                            let mon=TransferLine.getProfitableLine(Math.abs(cNotEn.getPowerAvailable()),cNotEn);
                            cMoreEn.addMoney(mon);
                            
                            cNotEn.addMoney(-Math.abs(mon));
                            
                            cMoreEn.setPowerAvailable(cMoreEn.getPowerAvailable()+cNotEn.getPowerAvailable());
                            cNotEn.setPowerAvailable(0);
                        }

                            

                    }
                }
                
        }
        

    }

    



}

class TransferLine{
    static #transLines=[];
    #usedWats=0;
    constructor(name,power,priceForWat){
        this.name="Transfer line "+name;
        this.power=setPower(this,power);
        this.priceForWat=priceForWat;
    }
    
    getUsedWats(){
        return this.#usedWats;
    }
    setUsedWats(value){
        this.#usedWats=value;
    }

    getPowerAvailable(){
        return this.power-this.getUsedWats();
    }

    getTotalPrice(value){
        return this.priceForWat;
    }

    static addTransLine(value){
        if(value instanceof TransferLine){
            this.#transLines.push(value);
        }
        else{
            throw new Error("unvalid type");
        }
    }
    static getProfitableLine(wats,city){

        this.#transLines.sort((x,y)=>x.priceForWat-y.priceForWat);

        for (let i = 0; i < this.#transLines.length; i++) {
            let line=this.#transLines[i];
             if(line.getPowerAvailable()>=wats ){
                i=0;
                line.setUsedWats(line.getUsedWats()+wats);
                console.log("Price "+line.getTotalPrice(wats)+" will be for "+city.getName());
                return line.getTotalPrice(wats);
             }
            
        }
    }

    

}

class Building{
    consume=0.004+0.001;//MWats DAY + NIGHT 
    constructor(name, flatCount){
        this.name="Building "+name;
        this.flatCount=this.checkCount(flatCount)

    }
    getConsume(){
        return this.consume;
    }
    getFlatCount(){
        return this.flatCount;
    }



    checkCount(flatCount){
        if(flatCount>=1 && flatCount<=400){
            return flatCount;
        }
        else{
            throw new Error("flat count must be from 1 to 400");
        }
    }
}

class SunPanel {
    constructor(name, power) {
        this.name="Panel "+name;
        this.power=setPower(this,power);
    }
    
}

class Station{
    constructor(name, power) {
        this.name="Station "+name;
        this.power=setPower(this,power);
    }
    
    
    
    
} 
    function setPower(source,power){
        let flag=false;
        let msg="";
        source instanceof SunPanel?(power>=1&&power<=5?this.power=power:flag=true):msg="SunPanel from 1 to 5 MWats";
        source instanceof Station?(power>=1&&power<=80?this.power=power:flag=true):msg="Station from 1 to 25 MWats";
        source instanceof TransferLine?(power>=1&&power<=25?this.power=power:flag=true):msg="Line from 1 to 25 MWats";
        if(flag){
            throw new Error(msg);
        }
        return power;
    }


    


class Random{
    static nextInt(low,high){
        return Math.ceil(Math.random() * (high - low)) + low;
    }
}


    for(let i=0;i<10;i++){
    TransferLine.addTransLine(new TransferLine(i,Random.nextInt(1,4),Random.nextInt(50,100)));
    }
    
    let c1=new City("1");
    let c2=new City("2");
    let c3=new City("3");
    let c4=new City("4");
    let c5=new City("5");
    
    City.toFill(c1,c2,c3,c4,c5);
    
    City.toBalance(c1,c2,c3,c4,c5);

    c1.getInfo();
    c2.getInfo();
    c3.getInfo();
    c4.getInfo();
    c5.getInfo();

























//class ElectricitySourses {
    //     constructor(name, power) {
    //         if (this.constructor === ElectricitySourses) {
    //             throw new Error("FYI: Instance of Abstract class cannot be instantiated");
    //         }
    //         this.name=name;
    //         this.power=this.setPower(power);
    //     }
    
    //     getName(){
    //         return this.name;
    //     }
    //     setPower(power){
    //         throw new Error("FYI: Instance of Abstract class cannot be instantiated");
    //     }
    //     // getName();{
    //     //     return this.name;
    //     // }
    //     // set power(){
    //     // }
    
    //     // get p
    // }

    //ElectricitySourses.prototype.getName = function () { return this.name }
    // ElectricitySourses.prototype.setPower = function () { return 0; }
    