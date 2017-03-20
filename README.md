## 介绍

KoaHub Mysql -- KoaHub.js mysql库。

## 特性
1. 支持created_at, updated_at时间戳
2. 支持数据库字段验证
3. 支持 `findAll`, `findOne`, `findOrCreate`, `create`, `update`, and `destroy`
4. ...

## 安装
```js
npm install github:koahubjs/koahub-mysql --save
```

## 使用

```javascript
//创建app/middleware/mysql.middleware.js
module.exports = require('koahub-mysql');
//配置app/config/middleware.config.js
module.exports = {
   mysql: {
     "host": "127.0.0.1",
     "user": "root",
     "password": "",
     "database": "koahub",
  }
}
//配置app/config/default.config.js
module.exports = {
   loader: {
        "models": {
            root: 'model',
            suffix: '.model.js'
        }
    }
}
```

### 入门
```js
// app/home/index.controller.js
module.exports = class extends koahub.controller {

    async _initialize() {
        // 控制器初始化
    }

    async index() {
    	
    	await this.model('user').create({ firstName: 'Grayson' });
      
    	const grayson = await this.model('user').findOne({ firstName: 'Grayson' }, { require: true });
      	const basil = await this.model('user').update({ firstName: 'Basil' }, { id: grayson.id });
      
      	await this.model('user').destroy({ id: basil.id });
      
      	const collection = this.model('user').findAll();
      	this.view(collection);
    }
}

// app/model/user.model.js
module.exports = koahub.model.extend({
  tableName: 'users'

  // validation is passed to Joi.object(), so use a raw object
  validate: {
    firstName: Joi.string()
  }
});
```


### API

#### model.create

```js
/**
  * Naive add - create and save a model based on data
  * @param {Object} data
  * @param {Object} options (optional)
  * @return {Promise(bookshelf.Model)} single Model
  */
create: function (data, options) {
  return this.forge(data)
  .save(null, options);
}
```

#### model.destroy

```js
/**
  * Naive destroy
  * @param {Object} options
  * @return {Promise(bookshelf.Model)} empty Model
  */
destroy: function (options) {
  return this.forge({ [this.prototype.idAttribute]: options.id })
  .destroy(options);
}
```

#### model.findAll

```javascript
/**
  * Naive findAll - fetches all data for `this`
  * @param {Object} options (optional)
  * @return {Promise(bookshelf.Collection)} Bookshelf Collection of all Models
  */
findAll: function (options) {
  return bookshelf.Collection.forge([], { model: this }).fetch(options);
}
```

#### model.findById

```javascript
/**
 * Find a model based on it's ID
 * @param {String} id The model's ID
 * @param {Object} [options] Options used of model.fetch
 * @return {Promise(bookshelf.Model)}
 */
findById: function (id, options) {
  return this.findOne({ [this.prototype.idAttribute]: id }, options)
}
```

#### model.findOne

```js
/**
  * Naive findOne - fetch data for `this` matching data
  * @param {Object} data
  * @param {Object} options (optional)
  * @return {Promise(bookshelf.Model)} single Model
  */
findOne: function (data, options) {
  return this.forge(data).fetch(options);
}
```

#### model.findOrCreate
```js
/**
  * Find or create - try and find the model, create one if not found
  * @param {Object} data
  * @param {Object} options
  * @return {Promise(bookshelf.Model)} single Model
  */
findOrCreate: function (data, options) {
  var self = this;

  return self.findOne(data, options)
  .then(function (model) {
    return model ? model : self.create(data, options);
  })
}
```

#### model.update

```js
/**
  * Naive update - update a model based on data
  * @param {Object} data
  * @param {Object} options
  * @return {Promise(bookshelf.Model)} edited Model
  */
update: function (data, options) {
  _.defaults(options, {
    patch: true
  });
  return this.forge({ [this.prototype.idAttribute]: options.id }).fetch(options)
  .then(function (model) {
    if (model) {
      return model.save(data, options);
    }
  })
}
```

### model.upsert
```js
/**
  * Upsert - select a model based on data and update if found, insert if not found
  * @param {Object} selectData Data for select
  * @param {Object} updateData Data for update
  * @param {Object} [options] Options for model.save
  * @return {Promise(bookshelf.Model)} edited Model
  */
upsert: function (selectData, updateData, options) {
  return this.findOne(selectData, extend(options, { require: false }))
  .bind(this)
  .then(function (model) {
    return model
      ? model.save(updateData, extend({ patch: true }, options))
      : this.create(extend(selectData, updateData), options)
  })
}
```


## KoaHub.js
[KoaHub.js框架](https://github.com/koahubjs/koahub)

## 官网
[KoaHub.js官网](http://js.koahub.com)