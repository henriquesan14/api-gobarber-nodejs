require('../bootstrap');

module.exports = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    no_ready_check: true,
    auth_pass: process.env.REDIS_PASSWORD,
};
