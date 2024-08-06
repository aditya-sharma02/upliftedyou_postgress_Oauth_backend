// require("dotenv").config({path:"../.env"});
// const express = require("express")
// const app = express()
// const cors = require("cors");
// const User = require("./model/user")
// const bcryptjs = require("bcryptjs")
// const Message = require("./model/message")
// let corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200,
//     methods: "GET, PATCH, DELETE, POST"
// }

// require("./dbconn/connection")

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
// app.use(cors(corsOptions));
// // console.log(process.env.KEY)

// app.post("/signup", async (req, res) => {
//     try {

//         const user = await User.findOne({ email: req.body.email })
//         if (user) {
//             res.status(409).send({ status: 409, message: "User Already Registered" })
//         }
//         else {
//             let data = new User(req.body);
//             data = await data.save();
//             // console.log(data)
//             res.status(201).send({ status: 201, data })
//         }

//     } catch (e) {
//         res.status(400).send({ status: "bad", message: "sign up failed !!!" })
//     }
// })

// app.post("/login", async (req, res) => {
//     try {
//         const isuser = await User.findOne({ email: req.body.email })
//         if (!isuser) {
//             res.status(401).send({ status: 401, message: "Invalid Credentials" })
//         }
//         const pmatch = await bcryptjs.compare(req.body.password, isuser.password)
//         if (!pmatch) {
//             res.status(401).send({ status: 401, message: "Invalid Credentials" })
//         }
//         else {
//             res.status(200).send({ status: 200, isuser })
//         }

//     } catch (e) {
//         console.log("123")
//         console.log(e)
//         res.status(400).send({ status: "bad", message: "login failed !!!" })
//     }
// })

// app.post("/getdata", async (req, res) => {
//     try {
//         const { details } = req.body;
//         const prompt = `Answer the following question:What is human life expectancy in the United States{}`;

//         // // const completion = await openai.createCompletion({
//         // //     model: "text-davinci-003",
//         // //     prompt: details,
//         // //     max_tokens: 2048
//         // // })
//         // // console.log(data)
//         // const response = await openai.createCompletion("text-davinci-001", {
//         //     prompt: prompt,
//         //     temperature: .7,
//         //     max_tokens: 1200,
//         //     // top_p: 1,
//         //     frequency_penssalty: 0,
//         //     presence_penalty: 0,
//         //     stop: ["{}"],
//         // });
//         // res.send(completion.data.choices[0].text)
//         // res.send(response.data.choices[0].text)
//         // res.send({details})

//     } catch (e) {
//         console.log(e)
//         // res.send(e)
//     }
// })

// app.get("/getblogs", async (req, res) => {
//     try {
//         const date = new Date();
//         date.setMonth(4);
//         const response = await fetch(`https://newsapi.org/v2/everything?q=depression%20or%20anxiety%20or%20mental%20health&from=${date}&sortBy=publishedAt&apiKey=47764c0938d24be380f64d387a006bc3`)
//         const data = await response.json();
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send({ status: "bad", message: "Sorry !! unable to fetch the data" })
//         console.log(error);
//     }
// })
// app.get("/getuser", async (req, res) => {
//     try {
//         const user = await User.findOne({ _id: req.query.id });
//         res.status(200).send({ status: 200, user })
//     } catch (error) {
//         console.log(e)
//     }
// })

// app.post('/message', async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email })
//         const message = new Message({
//             name: req.body.name,
//             email: req.body.email,
//             message: req.body.message,
//             ref: user._id
//         })
//         let data = await message.save()
//         res.status(200).send({ status: 200, message: "hi" })
//     } catch (e) {
//         res.status(500).send({ status: 500, message: "bad server" })
//     }
// })

// app.listen(5000, () => {
//     console.log("hii there listening at 5000")
// })


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

client.connect();

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


