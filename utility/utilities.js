const utilities = {
    missingParams: (body) => {
        return Object.values(body).some(element => element === null || element === '')
    },
}

module.exports = utilities