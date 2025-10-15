const express=require('express');
const app=express();
const port=4030;
const cors= require('cors');
const mysql=require('mysql2');
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'vishnu',
    database:'too'
});
db.connect((err)=>{
    if(err){
        console.log("Error Occured",err);
    }
    console.log("Connected To DataBase successfully");
})

app.get('/',(req,res)=>{
    console.log("Default Route");
    db.query('select *from toits',(err,result)=>{
        if(err){
            console.log("Error Occured",err);
        }
        console.log('Data:',result);
        res.send(result)
    })
})

app.post('/add-item',(req,res)=>{
    console.log(req.body);
    db.query(`insert into toits(itemDes)values('${req.body.text}')`,(err,results)=>{
        if(err){
            console.log("Error Occured",err);
        }
        console.log("Inserted The Elements");
    })

    res.send("Added successfully");
})

app.put('/edit-item',(req, res)=>{
    db.query(`update toits set itemDes="${req.body.itemDes}" where ID=${req.body.ID};`,(err)=>{
        if(err){
            console.log("Error Occured",err);
            return
        }
        console.log("Update Successfully");
    })
})

//app.delete('/delete-item',(req, res)=>{
//    db.query(`delete from toits ;"`,(err,results)=>{
//        if(err){
//            console.log("Error Occured on deleted");
//        }
//        console.log("Deleted Successfully");
//        
//    })
//})






app.listen(port,()=>{
    console.log("Server Is Running On the port 4030");
})