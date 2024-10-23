require('dotenv').config();
// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: process.env.AUTH_USER, password: process.env.AUTH_PASS, name: process.env.AUTH_NAME, info: process.env.AUTH_INFO }];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
