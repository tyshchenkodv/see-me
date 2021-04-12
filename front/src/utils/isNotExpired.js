export const isNotExpired = (exp) => {
    if (!exp) {
        return false;
    }

    return Date.now() < exp;
};
