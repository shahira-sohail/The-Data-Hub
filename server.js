require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const User = require("./models/User");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const logger = (req, res, next) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${req.method}] ${req.path} - ${timestamp}`);
    next();
};
app.use(logger);

app.get("/", (req, res) => {
    res.json({
        message: "The Data Hub API is running"
    });
});
app.get("/posts", async (req, res) => {
    try{
        const posts = await Post.find().populate("authorId");
        res.json(posts);
    }catch(error){
        res.status(500).json({
            message: "Error fetching posts",
            error: error.message
        });
    }
});
app.get("/posts/recent", async (req, res) => {
    try{
        const posts = await Post.aggregate([
            // runs an aggregation pipeline which means MongoDB process documents through stages , one after another 
            {
                $sort: {createdAt: -1}//sorts posts by ceation date, newest first .
            },
            {
                $limit: 3
            },
            {
                $lookup: {//populate is a mongoose feature and lookup is a MongoDB aggregation stage
                    from: "users",
                    localField: "authorId",//the author ID stored in each post
                    foreignField: "_id",//The user ID to match against
                    as: "authorDetails"//The name of the new field containing the matched user
                }
            },
            {
                $unwind: {
                    path: "$authorDetails",//tells MongoDB which array to unwind
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
        res.json(posts);
    }catch(error){
        res.status(500).json({
            message: "Error fetching recent posts",
            error: error.message
        });
    }
});
app.get("/posts/:id",async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.json(post);
    }catch(error){
        res.status(500).json({
            message: "Error fetching post",
            error: error.message
        });
    }
});
app.post("/posts", async (req, res) => {
    try{
        console.log("Request body:", req.body);
        const newPost = await Post.create(req.body);
        res.status(201).json(newPost);
    }catch(error){
        res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
});
app.post("/users", async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    }catch(error){
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});
app.get("/users", async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
});
app.put("/posts/:id", async (req, res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if(!updatedPost){
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.json(updatedPost);
    }catch(error){
        res.status(500).json({
            message: "Error updating post",
            error: error.message
        });
    }
});
app.delete("/posts/:id", async (req, res) => {
    try{
        const deletedPost = await Post.findByIdAndDelete(
            req.params.id
        );
        if(!deletedPost){
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.json({
            message: "Post deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            message: "Error while deleting post",
            error: error.message
        });
    }
});

app.post("/login",(req, res) => {
    const {username, password} = req.body;
    const mockToken = "mock-jwt-token-12345";
    res.json({
        message: "Login successful",
        username: username,
        token: mockToken
    });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

// middleware is a function that runs between recieving an http request and sending a response

