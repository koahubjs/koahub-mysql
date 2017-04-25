## 介绍

KoaHub Mysql -- KoaHub.js mysql库。

## 特性
1. 支持created_at, updated_at时间戳
2. 支持 `find`, `findPage`, `findAll`, `add`, `addAll` `save`, `saveAll`, `delete`, `deleteAll`
3. ...

## 安装
```js
npm install koahubjs/koahub-mysql --save
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
    	 
    	const user = await this.model('user').findAll();
        this.view(user);
    }
}

// app/model/user.model.js
module.exports = koahub.model.extend({
    tableName: 'user',
    hasTimestamps: true
});
```
### API
```
// 查询
this.model('user').find();
// 查询分页
this.model('user').findPage();
// 查询所有
this.model('user').findAll();
// 新增或者修改
this.model('user').add();
// 新增或者修改所有
this.model('user').addAll();
// 新增或者修改
this.model('user').save();
// 新增或者修改所有
this.model('user').saveAll();
// 删除
this.model('user').delete();
// 删除所有
this.model('user').deleteAll();

// 更多方法请参考bookshelf
this.model('user').query();
this.model('user').count();
this.model('user').where();
...

```

## KoaHub.js
[KoaHub.js框架](https://github.com/koahubjs/koahub)

## 官网
[KoaHub.js官网](http://js.koahub.com)