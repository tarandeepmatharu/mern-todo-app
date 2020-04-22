
async function connectingToDb(){
    const MongoClient = require('mongodb').MongoClient;
const uri= "mongodb://127.0.0.1:27017/";

const client=new MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology:true})
const dbName="sample";

    try{

    
    await client.connect();
    const db=client.db(dbName);
    return {db,client};
        
   
    }catch(err){
        console.error(err);
    }
}

module.exports=connectingToDb;
