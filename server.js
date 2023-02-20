const app = require(`${__dirname}/app`);
const mongoose = require("mongoose");

//mongoDB Atlas Connection String
const db_url = "mongodb+srv://101300174_Ronak:Greatnews_321@cluster0.18gn2vn.mongodb.net/comp3133_assigment1"
mongoose.set('strictQuery', true); // for suppressing the deprecation warning
mongoose.connect(db_url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

// Request listening
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});
