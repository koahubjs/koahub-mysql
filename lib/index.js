/*  
"host": "127.0.0.1",
"user": "root",
"password": "",
"database": "koahub",
"charset": "utf8"
*/
const Knex = require('knex');
const Bookshelf = require('bookshelf');
const mysql = require('./mysql.util');

module.exports = function(options) {

    const knex = new Knex({
        client: 'mysql',
        connection: options
    });

    const bookshelf = new Bookshelf(knex);
    // 开启分页
    bookshelf.plugin('pagination');
    // 隐藏字段
    bookshelf.plugin('visibility');
    // 导入扩展
    bookshelf.plugin(function(bookshelf, options) {
        for (let key in mysql) {
            bookshelf.Model[key] = mysql[key];
        }
    });
    // 注入koahub
    koahub.model = bookshelf.Model;

    return async function(ctx, next) {

        ctx.model = function(_model) {
            const model = koahub.models[_model];
            if (!model) {
                return bookshelf.Model.extend({
                    tableName: _model,
                    hasTimestamps: true
                });
            } else {
                return model;
            }
        }

        await next();
    }
}
