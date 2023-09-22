//initializing our database
const mongoose = require("mongoose");
const Chat = require("./models/chat");

main().then(() => console.log('connection successful'))
      .catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/letsgossip');
}

let chats = [
    {
        from : "Gojo",
        to : "Jogo",
        message : "Yowaimo",
        created_at : new Date(),
    },
    {
        from : "Neha",
        to : "Indra",
        message : "Dekhte Geli Finally Jawan?",
        created_at : new Date(),
    },
    {
        from : "Soumyadip",
        to : "Indra",
        message : "TPI jabe aaj?",
        created_at : new Date(),
    },
    {
        from : "Indra",
        to : "Tiasha",
        message : "Kaal free achis?",
        created_at : new Date(),
    },
    {
        from : "Raj",
        to : "Indra",
        message : "Buskin Robbins Gelooo eka eka!",
        created_at : new Date(),
    },
]

Chat.insertMany(chats);