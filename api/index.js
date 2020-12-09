const app = require('./app');
const port = '3333';

const listen = app.listen(port, () => {
    console.log(`App server is running on port ${port}`);
});
