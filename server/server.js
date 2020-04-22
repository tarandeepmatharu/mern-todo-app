const express=require('express');
const app=express();
const path=require('path');

const staticPath=path.join(__dirname,'..','build');
app.use(express.static(staticPath));

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(staticPath,'index.html'));
    
});

app.listen(8081,()=>console.log('frontend server running on port 8081'));