let MongoClient=require("mongodb").MongoClient;
let config=require("./config.js");

class Db{
    constructor(){
        //初始化的时候连接数据库
        // this.connect();
    }

    //连接数据库并返回数据库对象。
    connect=()=>{
        return new Promise((resolve,reject)=>{
            MongoClient.connect(config.dbUrl,{ useUnifiedTopology:true },(err,client)=>{
                if(err){
                    reject(err);
                }else{
                    //数据库对象
                    let db=client.db(config.dbName);
                    console.log("success");
                    resolve(db);
                }
            })
        });
    }

    find=(collectionName,json)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                // collectionName 就是数据库里的表单名称，json就是查询条件。
                let db=await this.connect();
                let result=db.collection(collectionName).find(json);
                //toArray是mongodb的方法。它必须包含两个参数，第一个是err 第二个是docs
                result.toArray((err,docs)=>{
                    resolve(docs);
                })
            }catch(err){
                reject(err);
            }
        })

        // return new Promise((resolve,reject)=>{
        //     this.connect().then((db)=>{
        //         let result=db.collection(collectionName).find(json);
        //         toArray是mongodb的方法。
        //         result.toArray((err,docs)=>{
        //             resolve(docs);
        //         })
        //     })
        // })
    }

    update=async()=>{

    }
    
    insert=async()=>{

    }

}

let test=new Db();
//await 只能在async函数里面使用
test.find("test",{}).then((data)=>{
    console.log(data);
});



test.find("test",{}).then((data)=>{
    console.log(data);
});



//这里有个问题
//问题一: 每次使用find 方法的时候都要连一次数据库。很麻烦