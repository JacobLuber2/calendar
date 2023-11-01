var sessionData = {};

exports.setUser = (user) => {
    sessionData.user = user;
}

exports.getUser = () => {
    return sessionData.user;
}