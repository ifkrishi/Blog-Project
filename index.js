import express from "express";
import router from "./routes/articles.js";
import mongoose from 'mongoose';
import Article from "./models/article.js";
import methodOverride from "method-override";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(process.env.Mongo_URI);
//Middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//Routes
app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'});
    res.render('index.ejs', {articles : articles});
})
app.use('/articles', router);
app.listen(port, (req, res) => {
    console.log(`Your server is running on port: ${port}`);
})
