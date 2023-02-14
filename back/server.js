const express = require('express');
const cors = require('cors');
const fileupload = require("express-fileupload")
var mysql = require('mysql');


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload());



var con = mysql.createConnection({
    host: "192.168.2.8",
    user: "trainee",
    password: "trainee@123",
    database: "trainee"
})

con.connect(function(err){
     if(err) throw err;
     console.log('Database Connected');
})

app.get("/message",(req,res)=>{
    res.json({message: "Hello from server"});
});

app.get("/user", (req, res) => {
    console.log(req.query);
    const code = req.query.code;
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const email = req.query.email;
    const gender = req.query.gender;
    const hobbies = req.query.hobbies;
    //const file = req.query.file;
    const country = req.query.country;
    const dateadded = req.query.dateadded;
    console.log("ramesh",code);
    con.query(`insert into users19(code, firstname, lastname, email, gender, hobbies, country, dateadded) values("${code}","${firstname}","${lastname}","${email}","${gender}","${hobbies}","${country}","${dateadded}")`,function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log(country);
        console.log(req.query);
        console.log("inserted");
      }
    );
  });

  app.get("/listdata", (req, res) => {
    //console.log(req.body)
    con.query(`select * from users19 where isactive=1`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/deletedata", async (req, res) => {
    con.connect(function (err, result) {
      console.log("hello");
      const eid = req.query.recid;
      console.log(eid);
      con.query(`update users19 set isactive='false' where recid="${eid}"`,
        function (err, result) {
          if (err) throw err;
  
          res.send(result);
          console.log(result);
        }
      );
    });
  });

  // app.post("/userimage", async (req, res) => {
  //   //const file = req.files.file;
  //   const filename = file.name;
  //   console.log(filename);
  //   console.log("user img upload");
  //   file.mv(`./images/${filename}`,(err)=>{
  //     if(err){
  //       console.log(err);
  //       return res.status(400).send({message: "File upload failed"});
  //     }
  //     return res.status(200).send({message: `./images/${filename}`, code:200});
  //   })
  // });

  app.get("/userdata", async (req, res) => {
    con.connect(function (err, result) {
      const eid = req.query.eid;
      console.log("fetch id", eid);
      con.query(`select * from users19 where recid="${eid}"`,
        function (err, result) {
          if (err) throw err;
          res.send(result);
        }
      );
    });
  });
  
  app.get("/updateuser", async (req, res) => {
    con.connect(function (err, result) {
      const eid = req.query.recid;
      console.log("bhavya", eid);
      const code = req.query.code;
      const firstname = req.query.firstname;
      const lastname = req.query.lastname;
      const email = req.query.email;
      const gender = req.query.gender;
      const hobbies = req.query.hobbies;
      // const file = req.query.file;
      const country = re.query.country;
      console.log("fetch id", eid);
      con.query(`update users19 set code="${code}",firstname="${firstname}", lastname="${lastname}", email="${email}", gender="${gender}", hobbies="${hobbies}", country="${country}" where recid="${eid}" `,
        function (err, result) {
          if (err) throw err;
          res.send(result);
        }
      );
    });
  });

app.listen(8000,()=>{
    console.log(`server is running on port 8000`);
});