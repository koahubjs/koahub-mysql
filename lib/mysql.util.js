const assert = require('assert');

module.exports = {

    handle(data) {
        if (typeof data === 'object' && data != null) {
            return data.toJSON();
        }
        return data;
    },

    // 查询
    async find(callback = {}, options) {

        let data;
        if (typeof callback === 'function') {
            data = await this.query(function(qb) {
                callback(qb);
            }).fetch(options);
        } else {
            data = await this.query({ where: callback }).fetch(options);
        }

        return this.handle(data);
    },

    // 查询分页
    async findPage(callback = {}, options) {

        let data;
        if (typeof callback === 'function') {
            data = await this.query(function(qb) {
                callback(qb);
                qb.orderBy('id', 'desc');
            }).fetchPage(options);
        } else {
            data = await this.query({ where: callback }).fetchPage(options);
        }

        return {
            data: this.handle(data),
            pagination: data.pagination
        };
    },

    // 查询所有
    async findAll(callback = {}, options) {

        let data;
        if (typeof callback === 'function') {
            data = await this.query(function(qb) {
                callback(qb);
                qb.orderBy('id', 'desc');
            }).fetchAll(options);
        } else {
            data = await this.query({ where: callback }).fetchAll(options);
        }

        return this.handle(data);
    },

    // 新增或者修改
    async add(data = {}, options) {
        return await this.save(data, options);
    },

    // 新增或者修改所有
    async addAll(data, options) {
        return await this.saveAll(data, options);
    },

    // 新增或者修改
    async save(data = {}, options) {
        if (!data.id) {
            delete data.id;
        }
        if (data.created_at) {
            delete data.created_at;
        }
        if (data.updated_at) {
            delete data.updated_at;
        }

        data = await this.forge(data).save(null, options);
        return this.handle(data);
    },

    // 新增或者修改所有
    async saveAll(data, options) {
        assert(data instanceof Array, 'saveAll must be an array');

        const result = [];
        for (let key in data) {
            result.push(await this.save(data[key], options));
        }
        return result;
    },

    // 删除
    async delete(condition = {}, options) {
        const data = await this.forge(condition).destroy(options);
        return this.handle(data);
    },

    // 删除所有
    async deleteAll(condition, options) {
        assert(condition instanceof Array, 'deleteAll must be an array');

        const result = [];
        for (let key in condition) {
            result.push(await this.delete(condition[key], options));
        }
        return result;
    },

    // 输出SQL
    async toSQL(callback = {}){

        let data;
        if (typeof callback === 'function') {
            data = await this.query(function (qb) {
                callback(qb);
            });
        } else {
            data = await this.query({where: callback});
        }

        return data._knex.toSQL();
    }
}
