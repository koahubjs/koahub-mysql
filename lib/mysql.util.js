const assert = require('assert');

module.exports = {

    handle(data) {
        if (typeof data === 'object' && data != null) {
            return data.toJSON();
        }
        return data;
    },

    // 查询
    async find(condition = {}, options) {
        const data = await this.query({ where: condition }).fetch(options);
        return this.handle(data);
    },

    // 查询所有
    async findAll(condition = {}, options) {
        const data = await this.query({ where: condition }).fetchAll(options);
        return this.handle(data);
    },

    // 新增或者修改
    async add(data = {}) {
        return await this.save(data);
    },

    // 新增或者修改所有
    async addAll(data) {
        return await this.saveAll(data);
    },

    // 新增或者修改
    async save(data = {}) {
        if (!data.id) {
            delete data.id;
        }
        data = await this.forge(data).save();
        return this.handle(data);
    },

    // 新增或者修改所有
    async saveAll(data) {
        assert(data instanceof Array, 'saveAll must be an array');

        const result = [];
        for (let key in data) {
            result.push(await this.save(data[key]));
        }
        return result;
    },

    // 删除
    async delete(condition = {}) {
        const data = await this.forge(condition).destroy();
        return this.handle(data);
    },

    // 删除所有
    async deleteAll(condition) {
        assert(condition instanceof Array, 'deleteAll must be an array');

        const result = [];
        for (let key in condition) {
            result.push(await this.delete(condition[key]));
        }
        return result;
    }
}
