import { WS_HOST } from './config/configData.json';

export const wsConnection = new WebSocket(`${ WS_HOST }/comments-ws`);
wsConnection.onopen = function () {
    console.log('Соединение установлено.');
};

wsConnection.onclose = function (event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения');
    }
    console.log(`Код: ${ event.code } причина: ${ event.reason }`);
};

wsConnection.onerror = function (error) {
    console.log(`Ошибка ${ error.message }`);
};
