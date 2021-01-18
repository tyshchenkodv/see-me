const { asClass, asValue, createContainer} = require('awilix');
const Config = require('../config');
const Database = require('./database');
const Mailer = require('./mailer');
const NotFoundException = require('../exceptions/NotFoundException');
const BadRequestException = require('../exceptions/BadRequestException');
const InternalErrorException = require('../exceptions/InternalErrorException');
const UnauthorizedException = require('../exceptions/UnauthorizedException');

const container = createContainer();
container.register({
    config: asClass(Config),
    db: asClass(Database),
    mailer: asClass(Mailer),
    notFoundException: asValue(NotFoundException),
    badRequestException: asValue(BadRequestException),
    internalErrorException: asValue(InternalErrorException),
    unauthorizedException: asValue(UnauthorizedException),
});

module.exports = container;
