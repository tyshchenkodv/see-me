const { asClass, asValue, createContainer} = require('awilix');
const env = require('env-wrapper');

env.load();
const Database = require('./database');
const Mailer = require('./mailer');
const NotFoundException = require('../exceptions/NotFoundException');
const BadRequestException = require('../exceptions/BadRequestException');
const InternalErrorException = require('../exceptions/InternalErrorException');
const UnauthorizedException = require('../exceptions/UnauthorizedException');
const ForbiddenExceptions = require('../exceptions/ForbiddenException');

const container = createContainer();
container.register({
    env: asValue(env),
    db: asClass(Database),
    mailer: asClass(Mailer),
    notFoundException: asValue(NotFoundException),
    badRequestException: asValue(BadRequestException),
    internalErrorException: asValue(InternalErrorException),
    unauthorizedException: asValue(UnauthorizedException),
    forbiddenExceptions: asValue(ForbiddenExceptions),
});

module.exports = container;
