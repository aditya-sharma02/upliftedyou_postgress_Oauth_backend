require("dotenv").config({path:"../.env"});
// // console.log(process.env.KEY)


// *************postgresql

const client = require('./dbconn/connection')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "GET, PATCH, DELETE, POST"
}
app.use(cors(corsOptions));

client.connect().then(() => {
    console.log("eel")
});

app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    try {
        let tempu = req.body
        let finque = `select u_email from users where u_email='${tempu.email}'`
        client.query(finque, (err, result) => {
            if (result.rowCount >0) {
                console.log("already registerd");
                res.status(409).send({ status: 409, message: "User Already Registered" })
            }
            else{
                console.log("insertinf the values");
                let insque = `insert into users(u_name,u_email,u_password,u_gender) values('${tempu.name}', '${tempu.email}', '${tempu.password}', '${tempu.gender}')`
                client.query(insque, (err, result) => {
                    if (!err) {
                        res.status(201).send({ status: 201 ,email:tempu.email})
                    }
                    else console.log(err)
                });
            }

        })
    } catch (e) {
        res.status(400).send({ status: "bad", message: "sign up failed !!!" })
    }

})

app.post('/login', (req, res) => {
    try {
        let tempu = req.body
        let finque = `select * from users where u_email='${tempu.email}'`
        client.query(finque, (err, result) => {
            if (result.rowCount == 0) {
                console.log("not registerd");
                res.status(401).send({ status: 401, message: "Invalid Credentials" })
            }
            else{
                res.status(200).send({ status: 200, email:tempu.email })
            }

        })
    } catch (e) {
        res.status(400).send({ status: "bad", message: "login failed !!!" })
    }

})

app.post("/getuser",  (req, res) => {
    try {
        const tempu = req.body
        let seaque = `select u_name, u_email from users where u_email='${tempu.email}'`
        client.query(seaque, (err, result) => {
            if (result.rowCount) {
                console.log(result);
                let user = {
                    name: result.rows[0].u_name,
                    email:result.rows[0].u_email,
                }
                res.status(200).send({ status: 200, user})
            }
        })
        
    } catch (e) {
        res.status(400).send({ status: "bad", message: "failed to load data" })
    }
})
app.post("/getuser",  (req, res) => {
    try {
        const tempu = req.body
        let seaque = `select u_name, u_email from users where u_email='${tempu.email}'`
        client.query(seaque, (err, result) => {
            if (result.rowCount) {
                // console.log(result);
                let user = {
                    name: result.rows[0].u_name,
                    email:result.rows[0].u_email,
                }
                res.status(200).send({ status: 200, user})
            }
        })
        
    } catch (e) {
        res.status(400).send({ status: "bad", message: "failed to load data" })
    }
})
app.post("/message", (req, res) => {
    try {
        const tempu = req.body
        console.log(tempu.email);
        let insque = `insert into messages(u_email,u_message) values('${tempu.email}','${tempu.message}')`
        client.query(insque, (err, result) => {
            console.log(result);
            res.status(200).send({status:"good",message:"send succesfully"})
        })
        
    } catch (e) {
        res.status(500).send({ status: 500, message: "bad server" })
    }
    
})
app.listen(5000, () => {
    console.log("Sever is now listening at port 5000");
})


