const express = require('express');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');


//create connection
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'recipes'
});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql connected...")
});

//create DB
//app.get('/createdb', (req, res) => {
//    let sql = 'CREATE DATABASE nameOfDB';
    // db.query(sql, (err, result) =>{
    //     if (err) throw err;
    //      consolt.log(result);
    //     res.send('Database created...');
    // })
//})

// create table
    // app.get('/createpoststable', (req, res) => {
    //     let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),body (VARCHAR(255)) PRIMARY KEY (id) )';
    //     db.query(sql, (err, result) => {
    //      if (err) throw err;
    //      console.log(result);
    //      res.send('Post table created...');
    //      });
    // });

//insert post 


const app = express();
app.use(bodyParser.json());
app.use(cors());


//another endpoint (test)
// app.get("", (req, res) => {
//     res.json("hello world");
// });


//gets all the recipes titles, links and pictures
app.get("/recipes", async (req,res) => {
    db.query('SELECT * FROM recipes', (err, results) => { 
		if (err) throw err;
        res.send(results); 
        console.log(results);
    }); 
    
});


//gets the specific recipes titles, links and pictures
app.get("/recipes/:id", async (req,res) => {
    db.query(`SELECT * FROM recipes WHERE recipes.recipeID = "${req.params.id}";`, (err, results) => { 
		if (err) throw err;
        res.send(results); 
        console.log(results);
    }); 
});



//gets the specific ingredients
app.get("/recIngr/:id", async (req,res) => {
    console.log(req.params);
    db.query(`SELECT * FROM ingredients WHERE ingredients.recipeID = "${req.params.id}";`, (err, results) => { 
		if (err) throw err;
        res.send(results); 
        console.log(results);
    }); 
});

//gets the specific steps
app.get("/recSteps/:id", async (req,res) => {
    console.log(req.params);
    db.query(`SELECT * FROM steps WHERE steps.recipeID = "${req.params.id}";`, (err, results) => { 
		if (err) throw err;
        res.send(results); 
        console.log(results);
    }); 
});

//sends the title, link, ingredients and image of the recipe to the db when button is pressed
app.post("/submitRecipe", async (req,res) => {
    // console.log(req);
    console.log(req.body);
    const recipeName = req.body.recipeTitle;
    const recipeImg = req.body.recipeImage;
    const recipeLink = req.body.recipeLink;
    const sql = `INSERT INTO recipes (recipeName, recipeImg, recipeLink) VALUES ("${recipeName}", "${recipeImg}", "${recipeLink}");`;
    
    // try {
    //     var result = await db.query(sql);
    //     for (let i = 0; i< req.body.recipeIngredients.length; i++){
    //         console.log("Thomas is my bf")
    //         const recipeIngredient = req.body.recipeIngredients[i];
    //         console.log(result);
    //         const sql2 = `INSERT INTO ingredients (ingredient, recipeID) VALUES ("${recipeIngredient}", ${result.insertId});`;
    //         const result2 = await db.query(sql2);
    //     }    
    // }
    // catch (e){
    //     console.log(e);
    // }
    
    //the second function runs after the first sql query, as the ingredients depend on a column from the first query (recipeID)
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        for (let i = 0; i< req.body.recipeIngredients.length; i++){
            const recipeIngredient = req.body.recipeIngredients[i];
            const sql2 = `INSERT INTO ingredients (ingredient, recipeID) VALUES ("${recipeIngredient}", ${result.insertId});`;
            db.query(sql2, function (err, res) {
                if (err) throw err;
                console.log(result);
            });
            const sql3 = `INSERT INTO steps (steps, recipeID) VALUES ("${recipeSteps}", ${result.insertId});`;
            db.query(sql3, function (err, res) {
                if (err) throw err;
                //console.log(result);
            });
        }
    });
});


//upload endpoint (get request from react and send)
app.post('/upload', (req, res) => {
    if(req.files === null){
        return res.status(400).json({msg: 'No file uploaded'});
    }
    const file = req.files.file;

    //moves the file
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err=>{
        if(err) {
            console.error(err);
            return res.status(500).send;
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
    }); 
});

app.listen('5000', () => {
    console.log("Server started on port 5000.")
});

//to start server: npm start


//SELECT * FROM recipes LEFT JOIN ingredients ON recipes.recipeID = ingredients.recipeID;