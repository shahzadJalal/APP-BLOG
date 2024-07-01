import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port =3000;

app.use(bodyParser.urlencoded({extended: true}));

// for the static files from the public directory
app.use(express.static("Public"));

//Sets EJS as the templating engine for the app.
//app.set("view engine","ejs");

//An array to store blog posts temporarily (non-persistent).
let posts=[];

//Home page
//Renders the index.ejs view and passes the posts array to it.
app.get("/",(req,res)=>{
	res.render("index.ejs", {
	posts: posts});
});

// New post page
//Renders the new-post.ejs view for creating a new post.
app.get("/new-post",(req,res)=>{
	res.render("new-post.ejs");
});

//create post page
//Creates a new post with a unique ID and adds it to the posts array. Redirects to the home page.
app.post("/new-post",(req,res)=>{
	const post = {
	id: Date.now(),
	title: req.body.title,
	content: req.body.content 
};
	posts.push(post);
	res.redirect("/");
});

//edit post page
// Renders the edit-post.ejs view for editing an existing post. Finds the post by its ID.
app.get("/edit-post/:id",(req,res)=>{
	const post = posts.find(p=>p.id==req.params.id);
	res.render("edit-post.ejs", {
	post:post});
});

//update post page 
//Updates the post's title and content. Redirects to the home page
app.post("/edit-post/:id", (req,res)=>{
	const post = posts.find(p=>p.id==req.params.id);
	post.title=req.body.title;
	post.content = req.body.content;
	res.redirect("/");
});


//delete post page
// Deletes the post by filtering it out from the posts array. Redirects to the home page.
app.post("/delete-post/:id",(req,res)=>{
	posts=posts.filter(p=>p.id != req.params.id);
	res.redirect("/");
});


app.listen(port,()=>{
 console.log(`Server is running at Port: ${port}`);
});
