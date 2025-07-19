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

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
});
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: "The Park Camper",
    price: 997
});

testTour.save().then(doc => {
    console.log(doc);
}).catch(err => {
    console.log('Error 🎆: ', err)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
