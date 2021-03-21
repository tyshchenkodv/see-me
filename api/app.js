const express = require('express');
const app = express();
const ArticleRoutes = require('./routes/articlesRoutes');
const AuthRoutes = require('./routes/authRoutes');
const UserRoutes = require('./routes/usersRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const DIContainer = require('./services/DIContainer');
const { scopePerRequest } = require('awilix-express');

app.use(scopePerRequest(DIContainer));

app.use(express.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000,
}));
app.use(bodyParser.json());

app.use(cors());
app.use('/auth', AuthRoutes);
app.use('/articles', ArticleRoutes);
app.use('/users', UserRoutes);

app.use(errorHandler);

module.exports = app;
