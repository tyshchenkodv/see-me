const { asClass, asValue, createContainer} = require('awilix');
const Config = require('../config');
const Database = require('./database');
const NotFoundException = require('../exceptions/NotFoundException');
const BadRequestException = require('../exceptions/BadRequestException');
const InternalErrorException = require('../exceptions/InternalErrorException');

const container = createContainer();
container.register({
    config: asClass(Config),
    db: asClass(Database),
    notFoundException: asValue(NotFoundException),
    badRequestException: asValue(BadRequestException),
    internalErrorException: asValue(InternalErrorException),
});

module.exports = container;
