const express=require('express');
const app=express();
const cors = require('cors');
const dbcon=require('./dbConnection');
const bodyParser=require('body-parser');


const PORT=process.env.PORT || 8080;
const allowedOrigins=["http://localhost:3000","http://localhost:8081"];

// const corsOptions={
//     origin:allowedOrigins
// }


const corsOptions={
    origin:function(origin,callback){
        if(!origin){
            callback(null,true);
        }
        
        else if(allowedOrigins.indexOf(origin)!==-1){
            
            callback(null,true);
        }
        else{
            callback(new Error("not an allowed origin",false));
        }
    }
}


app.use(cors(corsOptions));
app.use(bodyParser.json({type:'application/json'}));


app.get('/',async (req,res)=>{
    try{
       var {db,client}=await dbcon();    
        res.json(await db.collection('samplecollection').find({}).toArray());
       
    }catch(err){
        console.error(err);
    }finally{
        client.close();
       
    }
        
});

app.post('/addTask',async (req,res)=>{
        try{
            var {db,client}=await dbcon();
             const cursor =  await db.collection('samplecollection').insertOne(req.body);
            
             if(cursor.result.ok==1){
                res.json([{msg:1}]);
             }
             else{
                 res.json([{msg:-1}])
             }
            
        }catch(err){
            console.error(err);
            
        }finally{
            client.close();
        }

        
        
});


app.post('/deleteTask',async (req,res)=>{
    try{
        var {db,client}=await dbcon();
         const taskResult =  await db.collection('samplecollection').deleteOne(req.body);

         if(taskResult.result.ok==1){
            res.json([{msg:1}]);
         }
         else{
             res.json([{msg:-1}]);
         }
        
    }catch(err){
        console.error(err);
        
    }finally{
        client.close();
    }

});

app.listen(PORT,()=>console.log(`server is running on ${PORT}`));

