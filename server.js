const express = require('express');
const app = express();

//routes
app.get('/', (req, res) => {
    res.send("Hello, customer, you are running your api on port 3000")
})

app.listen(3000, () => {
    console.log('Successfully connected to port 3000');
})