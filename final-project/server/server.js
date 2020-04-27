const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectMongoDB = require("./config/initMongoDB");
const PORT = process.env.PORT || 3001;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

connectMongoDB();

// initialize routes
app.use(require('./routes/jobGrowthRoutes'));
app.use(require('./routes/loadCSV'));

app.listen(PORT, () => console.log('Server listening on port:', PORT));
