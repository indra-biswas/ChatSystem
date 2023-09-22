const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

//to use css files
app.use(express.static(path.join(__dirname, "public")));
//to get access of all the data coming from req.body
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main().then(() => console.log('connection successful'))
      .catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/letsgossip');
}

//index route / home route
app.get("/chats", async (req,res) => {
    let chats = await Chat.find();  //chat.find() function is asynchronous function so we have to write "await keyword before it and to do that our call back function must be a async type"
    console.log(chats);
    res.render("index.ejs",{chats});
})


//creating new chats
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
})
//creating new chat 
app.post("/chats", (req, res) => {
    let {from , to, message } = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        message : message,
        created_at : new Date(),
    });
    
    newChat
        .save()
        .then(res => console.log("Chat was saved!"))
        .catch(err => console.log(err));
    
        res.redirect("/chats");
});


//edit route
app.get("/chats/:id/edit", async (req, res) =>{
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
})
//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message : newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {message : newMsg},
        { runValidators : true, new : true },
        );
    console.log(updatedChat);
    res.redirect("/chats");
})


//delete route
app.delete("/chats/:id", async (req,res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/", (req, res) =>{
    res.send("Root is working!!");
})

app.listen(8080, () => {
    console.log("Server is listening  to port 8080");
});
