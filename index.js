const _            = require('lodash');

const paginator    = require('./src/paginator');

class Paginator {

    constructor(dbConfig= {}) {
        
        if(!dbConfig || !dbConfig.database || !dbConfig.host ||
           !dbConfig.user || !dbConfig.password) 
               throw new Error("Database Configurations are needed!");
        
        else {
            this.dbConfig = _.pick(dbConfig, 'host', 'database', 'user', 'client', 'config', 'password');
        }
    };

    
    /**
     * Paginate
     */
    paginate () {
        return paginator.bind(this)(...arguments);
    }
    
}

module.exports = Paginator;
