const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');
const courses = require('./routes/api/courses');
const config = require('config');

const statusOption = config.get('statusOption');

const app = express();

app.use(require('express-status-monitor')(statusOption));

app.use(express.json());

app.use(cors());

app.set('trust proxy', true);

connectDB();

app.get('/', (req, res) => res.send('LADDI EXPRESS API'));

// Router
app.use('/user', courses);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
