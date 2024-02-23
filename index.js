const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());

// ใช้ bodyParser เพื่อ parse ข้อมูลจาก body ของ request
app.use(bodyParser.urlencoded({ extended: true }));

// ตั้งค่าการเชื่อมต่อ MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test_mysql',
  port: '3306'
});

// เชื่อมต่อกับ MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL database.');
});
// create routes
app.post("/create", async (req,res)=>{
    const {email, name, password}= req.body;
    try{
        connection.query(
            "INSERT INTO users(email, fullname, password) VALUES(?, ?, ?)",
            [ email, name, password],
            (err,result,field)=>{
                if(err){
                    console.log("Error while inserting a user into the database",err);
                    return res.status(400).send();
                }
                return res.status(201).json({message: "New user successfully created!"});
            }
        )
    }
    catch(err){
        console.log(err);
        return res,status(500).send();
    }
})

app.get("/read", async (req,res)=>{
    try{
        connection.query("SELECT * FROM users",(err,results,fields)=>{
                if(err){
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results);
            }
        )
    }
    catch(err){
        console.log(err);
        return res,status(500).send();
    }
})

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});