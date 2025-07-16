const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require("./app3");

dotenv.config({ path: "./config.env" });


// console.log(process.env);
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

//mongoose.connect(process.env.DATABASE_LOCAL, {  // if using local database
mongoose.connect(DB, { //if using cloud database
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    //console.log(con.connections);
    console.log('DB Connection sucessful!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
