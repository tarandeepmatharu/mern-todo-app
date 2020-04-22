const dbcon=require('./dbConnection');

async function just(){
    const db=await dbcon();

    console.log(await db.collection('samplecollection').find({}).toArray());
    
}




