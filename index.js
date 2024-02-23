const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// สร้าง connection กับ MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

// เชื่อมต่อกับ MySQL
connection.connect((err) => {
  if (err) {
    console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', err);
    return;
  }
  console.log('เชื่อมต่อกับ MySQL สำเร็จ');
});

// การตั้งค่า Express เพื่อใช้ body-parser
app.use(express.urlencoded({ extended: true }));

// แสดงหน้า register form
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// บันทึกข้อมูลจากฟอร์ม register
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const INSERT_USER_QUERY = `INSERT INTO users (username, password) VALUES (?, ?)`;
  connection.query(INSERT_USER_QUERY, [username, password], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้:', err);
      return res.status(500).send('มีข้อผิดพลาดระหว่างการสมัครสมาชิก');
    }
    console.log('เพิ่มผู้ใช้เรียบร้อย');
    res.status(200).send('สมัครสมาชิกเรียบร้อย');
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์เริ่มทำงานที่ http://localhost:${port}`);
});