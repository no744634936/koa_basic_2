
let MongoClient=require("mongodb").MongoClient;
let config=require("./config.js");

class Db{

    constructor(){
        this.connect();
        this.dbClient="";
    }

    static getInstance=()=>{
        if(!(Db.instance)){
            Db.instance=new Db();
        }
        return Db.instance;
    }


    connect=()=>{

            return new Promise((resolve,reject)=>{
                if(!this.dbClient){
                    MongoClient.connect(config.dbUrl,{ useUnifiedTopology:true },(err,client)=>{
                        if(err){
                            reject(err);
                        }else{
                            let db=client.db(config.dbName);
                            this.dbClient=db;
                            resolve(this.dbClient);
                        }
                    })
                }else{
                    resolve(this.dbClient);
                }
            });

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



let test1=Db.getInstance();

test1.find("test",{}).then((data)=>{
    console.log(data);
});

//test1=Db.getInstance();

module.exports=Db.getInstance();
