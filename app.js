//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://admin-vishwaraj:9637774387@cluster0.rojdl.mongodb.net/blogDB");


const homeStartingContent = "Welcome to the Blog. You can post a new article by simply adding /compose to current home route. Hope you have a good time.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



const postSchema = {
  title : String,
  content : String
};

const Post = mongoose.model("post", postSchema);

// route for home , about & contact & compose

app.get("/", function(req, res) {


  Post.find({}, function(err, posts){
    res.render("home", {
      homePageContent : homeStartingContent,
      newContent : posts,
    });
  });






});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutPageContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactPageContent: contactContent
  });
});


app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postId", function(req, res) {
  const requestedPostId = req.params.postId;

  Post.findById(requestedPostId, function(err, post) {
    res.render("post", {
      Title : post.title,
      Content : post.content
    });
  });


  // posts.forEach(function (post) {
  //   const postTitle = _.lowerCase(post.title);
  //
  //   if (postTitle === requestedTopic) {
  //     res.render("post", {
  //       Title : post.title,
  //       Content : post.post
  //     });
  //   };
  // });

});





// post route for compose

app.post("/compose", function(req, res) {

  // const post = {
  //   title : req.body.createTitle,
  //   post : req.body.createPost
  // }

  const post = new Post ({
    title : req.body.createTitle,
    content : req.body.createPost
  });

  post.save();

  // posts.push(post);

  res.redirect("/");



});




app.listen(port, function() {
  console.log("Server started on port 3000");
});
