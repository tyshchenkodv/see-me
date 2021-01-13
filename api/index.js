const Config = require('./config');
const app = require('./app');

const config = new Config();

const listen = app.listen(config.getConfig('PORT'), () => {
    console.log(`App server is running on port ${config.getConfig('PORT')}`);
});
