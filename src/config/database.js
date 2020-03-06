require('../bootstrap');

module.exports = {
    dialectOptions: {
        ssl: true
    },
    storage: './__tests__/database.sqlite',
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
    },
};
