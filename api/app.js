const express = require('express');
const app = express();
const PostsRoutes = require('./routes/postsRoutes');
const AuthRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const DIContainer = require('./services/DIContainer');
const { scopePerRequest } = require('awilix-express');

app.use(scopePerRequest(DIContainer));

app.use(express.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.use(cors());
app.use('/auth', AuthRoutes);
app.use('/posts', PostsRoutes);

app.use(errorHandler);

module.exports = app;
