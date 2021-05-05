const DIContainer = require('./services/DIContainer');
const env = DIContainer.resolve('env');
const app = require('./app');

const listen = app.listen(env.get('API_PORT'), () => {
    console.log(`App server is running on port ${env.get('API_PORT')}`);
});
