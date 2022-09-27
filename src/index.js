const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const  mongoose  = require('mongoose');
const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect("mongodb+srv://group45Database:LluRUzY3qvGKUVwo@project-3.hwz6k4u.mongodb.net/group45Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

//----------wrong api edge case--------------------------------------------
app.use((req, res, next) => {
    res.status(400).send({ status: false, error: "URL is wrong" });
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
