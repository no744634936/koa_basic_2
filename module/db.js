let MongoClient=require("mongodb").MongoClient;
let config=require("./config.js");

class Db{
    constructor(){
        //初始化的时候连接数据库
        this.connect();
        this.dbClient=""; //放入db对象
    }


    connect=()=>{

        //如果dbClient没有值，那么就把连接的db对象给dbClient
        //解决数据库多次连接的问题
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
            //第二次调用connect方法的时候直接返回
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



let test=new Db();
test.find("test",{}).then((data)=>{
    console.log(data);
});



test.find("test",{}).then((data)=>{
    console.log(data);
});



//这样写就不会每次调用find方法都连接一次数据库了。but这段代码还是有问题。
//多次实例话的时候还是要，多次连接数据库。所以要使用单例模式。

let test2=new Db();

let test3=new Db();