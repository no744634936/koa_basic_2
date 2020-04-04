let MongoClient=require("mongodb").MongoClient;
let config=require("./config.js");

class Db{


    constructor(){
        this.connect();
        this.dbClient="";
    }

    static getInstance=()=>{
        //如果不存在Db的instance 那么新建一个实例
        if(!(Db.instance)){
            Db.instance=new Db();
        }
        return Db.instance;

        //为什么这样写不行？？？？
        // if(!Db.instance){
        //     Db.instance=new Db();
        // }else{
        //     return Db.instance;
        // }

        //为什么这样写也不行？？？？？？
        // if(Db.instance){
        //     return Db.instance;
        // }
        //  Db.instance=new Db();

    }


    connect=()=>{
        if(!this.dbClient){
            return new Promise((resolve,reject)=>{
                MongoClient.connect(config.dbUrl,{ useUnifiedTopology:true },(err,client)=>{
                    if(err){
                        reject(err);
                    }else{
                        let db=client.db(config.dbName);
                        this.dbClient=db;
                        resolve(this.dbClient);
                    }
                })
            });
        }else{
            resolve(this.dbClient);
        }

    }

    find=(collectionName,json)=>{
        return new Promise(async(resolve,reject)=>{
            try{

                let db=await this.connect();
                let result=db.collection(collectionName).find(json);
                result.toArray((err,docs)=>{
                    resolve(docs);
                })
            }catch(err){
                reject(err);
            }
        })
    }

    update=async()=>{

    }
    
    insert=async()=>{

    }

}



//把代码改成单例模式了之后。想多次实例化的时候就不是使用new了。而是是使用静态方法。
//ctrl 加 alt 加 m 停止运行代码

let test1=Db.getInstance();
let test2=Db.getInstance();
let test3=Db.getInstance();

test1.find("test",{}).then((data)=>{
    console.log(data);
});
test2.find("test",{}).then((data)=>{
    console.log(data);
});
test3.find("test",{}).then((data)=>{
    console.log(data);
});