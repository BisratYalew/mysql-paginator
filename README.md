
# mysql-paginator

> Document Query Paginator for  [Mysql](https://www.mysql.com) and [MariaDB](http://mariadb.org)

[![NPM version](https://img.shields.io/npm/v/mysql-paginator.svg)](https://npmjs.org/package/mysql-paginator)

**Note:** This library will only work with Node.js >= 4.2
=======
[![NPM](https://nodei.co/npm/mysql-paginator.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mysql-paginator/)


## Installation

```sh
npm install mysql-paginator
```

## Usage

```js
const Paginator = require('mysql-paginator');

const paginator = new Paginator({
    database: [database],
    host : [host-name],
    user : [username],
    password : [password]
  }    
);
```

### paginator.paginate([table_name], [query], [options], [callback]);

**Parameters**

* `[table_name]` {String} - Table name to select data
* `[query]` {Object} - Query criteria.
* `[options]` {Object}
  - `[per_page]` {Object | String} - Data's to return per page 
  - `[page]` {Object | String} - Page Number to select data. 
  - `[page=1]` {Number}
  - `[limit=10]` {Number}
* `[callback(err, result)]` - If specified the callback is called once pagination results are retrieved

**Return value**

Promise fulfilled with object having properties:
* `docs` {Array} - Array of documents
* `total_docs` {Number} - Total number of documents in collection that match a query
* `total_pages` {Number} - Total number of pages
* `[page]` {Number} - Returned Page Number

### Examples

#### Return 20 documents per page at page 1

```js
paginator.paginate('user', { user: 'something' }, { 
  per_page: 20, 
  page: 1  
}, (err, result) => {
  // result.total_docs
  // result.total_pages
  // result.page
  // result.per_page
  // result.docs  
});
```

## Tests

```sh
npm install
npm run test
```

## Author
Developed by [Bisrat Yalew](https://t.me/bisratyalew)

## License
[MIT](LICENSE)
