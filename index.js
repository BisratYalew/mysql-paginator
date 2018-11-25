const _     = require('lodash');

class Paginator {

    constructor(dbConfig= {}){
        if(!dbConfig || !dbConfig.database || !dbConfig.host ||
           !dbConfig.user || !dbConfig.password) throw new Error("Database Configurations are needed!");
        else {
            this.dbConfig = _.pick(dbConfig, 'host', 'database', 'user', 'client', 'config', 'password');
        }
    };
    
    /**
     * Paginate
     */
    paginate () {

    }
    
}

module.exports = Paginator;