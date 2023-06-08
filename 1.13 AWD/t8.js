

class MyTask{
      
    constructor (name, desrp, stDate,finDate) {
        this._name=name;
        this._desrp=desrp;
        this._stDate=stDate;
        this._finDate=finDate;
    }
   
    getText() {
        return "Ваша задача "+this.name+"\n"+"Опис задачі: "+this.desrp+"\n"+"Початок: "+this.stDate.toLocaleDateString()+
        "\n"+"Кінець: "+this.finDate.toLocaleDateString()+"\n";
    }
    

    
}

MyTask.prototype.toString=function(){
    return this.getText();
}
class ExecutedTask extends MyTask{
    constructor(name, desrp, stDate,finDate,percentExec){
        super(name,desrp,stDate,finDate);
        this.percentExec=percentExec;
        this.isFinished=percentExec==100?true:false;
    }

    
}

ExecutedTask.prototype.toString=function(){
  return this.getText()+"Відсоток виконання: "+this.percentExec+"%"+"\n"+(this.isFinished==true?"Робота завершена":"В процесі")+";\n"
}


let t1=new ExecutedTask("t1","difficult",new Date(1998,2,12),new Date(1998,4,12),50);
let t2=new ExecutedTask("t2","very difficult",new Date(1998,6,12),new Date(1998,8,12),100);
let t3=new MyTask("t3","very difficult",new Date(1998,6,12),new Date(1998,8,12));


console.log(t1.toString())
console.log(t2.toString())
console.log(t3.toString())

