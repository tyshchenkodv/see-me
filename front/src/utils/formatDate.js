import dayjs from "dayjs";

const formatDate = (date) => {
    return dayjs(date).format('DD.MM.YYYY');
}

const getDateNowForDB = () => {
    return dayjs().format('YYYY-MM-DD');
}

export {
    formatDate,
    getDateNowForDB,
}
