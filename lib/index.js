/**	
 	"type": "mysql",
    "host": "127.0.0.1",
    "user": "root",
    "password": "",
    "database": "koahub",
    "charset": "utf8"
*/
const Knex = require('knex');
const Bookshelf = require('bookshelf');
const modelbase = require('bookshelf-modelbase');

module.exports = function(options) {

    const knex = new Knex({
        client: 'mysql',
        connection: options
    });

    const bookshelf = new Bookshelf(knex);
    const Model = koahub.model = modelbase(bookshelf);

    return async function(ctx, next) {

        ctx.model = function(_model) {

            const model = koahub.models[_model];
            if (!model) {
                return Model.extend({
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
