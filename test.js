global.koahub = {};
const connet = require("./lib/index")

connet({
    connection: {
        host: '192.168.1.7',
        user: 'root',
        password: '786699892qing',
        database: 'agent',
        charset: 'utf8'
    }
})

koahub.bookshelf.knex.raw('select * from admin').then(res => {
    console.log(res);
})