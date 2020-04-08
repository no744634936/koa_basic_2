
var mysql = require('mysql');


function __connection(){

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'no744634',
        database : 'koacms'
    });
    connection.connect();
    return connection;
}

exports.query=function(sql,parmas=null){

        //1,连接数据库
        var connection=__connection();
        return new Promise(function(resolve,reject){

            //2执行sql语句。
            try{
                connection.query(sql,parmas, function (error, results, fields) {
                    if (error){
                        throw error;
                    }
                    resolve(results);
                });
    
            }catch(err){
                //3关闭数据库
                connection.end();
            }


        })
}


