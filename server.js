const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());
const logger = (req, res, next) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${req.method}] ${req.path} - ${timestamp}`);
    next();
};
app.use(logger);
let blogPosts = [];

app.get("/", (req, res) => {
    res.json({
        message: "The Data Hub API is running"
    });
});
app.get("/posts", (req, res) => {
    res.json(blogPosts);
});
app.get("/posts/:id",(req, res) => {
    const id = Number(req.params.id);
    const post = blogPosts.find((post) => post.id === id);
    res.json(post);
});
app.post("/posts", (req, res) => {
    const newPost = req.body;//take the data sent by the client and store it in newPost
    blogPosts.push(newPost); 
    res.json(newPost);
});
app.put("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const updatedPost = req.body;
    const postIndex = blogPosts.findIndex((post) => post.id === id);
    if(postIndex === -1){
        return res.status(404).json({
            message: "Post not found"
        });
    }
    blogPosts[postIndex] = {
        ...blogPosts[postIndex],
        ...updatedPost,
        id: id
    };
    res.json(blogPosts[postIndex]);
});
app.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const postExists = blogPosts.some((post) => post.id === id);
    if(!postExists){
        return res.status(404).json({
            message: "Post not found!"
        });
    }
    blogPosts = blogPosts.filter((post) => post.id !== id);
    res.json({
        message: "Post deleted successfully"
    });
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// middleware is a function that runs between recieving an http request and sending a response

