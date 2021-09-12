const express = require('express');

const app = express();

const homerouter = require('./Api/home')
const searchrouter = require('./Api/search')
const searchdetailsrouter = require('./Api/search_details')
const episoderouter = require('./Api/episodes')





app.use(express.json({ extended: false }));

app.use('/home', homerouter)
app.use('/search', searchrouter)
app.use('/searchdetails', searchdetailsrouter)
app.use('/episode', episoderouter)



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('started'));




