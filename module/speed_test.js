
var MongoClient = require('mongodb').MongoClient;

var Config=require('./config.js');

class Db{


    static getInstance(){ 

        if(!Db.instance){
            Db.instance=new Db();
        }
        return  Db.instance;
    }

    constructor(){
        this.dbClient='';
    }

    connect(){
      let _that=this;
      return new Promise((resolve,reject)=>{
          if(!_that.dbClient){
              MongoClient.connect(Config.dbUrl,(err,client)=>{

                  if(err){
                      reject(err)

                  }else{

                      _that.dbClient=client.db(Config.dbName);
                      resolve(_that.dbClient)
                  }
              })

          }else{
              resolve(_that.dbClient);

          }


      })

    }

    find(collectionName,json){

       return new Promise((resolve,reject)=>{

           this.connect().then((db)=>{

               var result=db.collection(collectionName).find(json);

               result.toArray(function(err,docs){

                   if(err){
                       reject(err);
                       return;
                   }
                   resolve(docs);
               })

           })
       })
    }
    update(){

    }
    insert(){


    }
}





//因为find的方法是异步，所以在测试速度的时候为了不让他这几个方法同时进行，要用setTimeout来让他们分别进行。


var myDb=Db.getInstance();

setTimeout(function(){
    console.time('start');
    myDb.find('user',{}).then(function(data){
        console.timeEnd('start');
    })


},100)


setTimeout(function(){
    console.time('start1');
    myDb.find('user',{}).then(function(data){
        console.timeEnd('start1');
    })


},3000)





var myDb2=Db.getInstance();

setTimeout(function(){
    console.time('start3');
    myDb2.find('user',{}).then(function(data){
        console.timeEnd('start3');
    })


},5000)


setTimeout(function(){
    console.time('start4');
    myDb2.find('user',{}).then(function(data){
        console.timeEnd('start4');
    })


},7000)

