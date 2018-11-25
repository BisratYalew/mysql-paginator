const knex      = require('knex');

/**
 * Paginate Data from Mysql/Maria Databases.  
 * @name Paginate Data
 * @function
 * @param  {String} table_name  Table name to paginate data
 * @param  {String} per_page    Number of data to get per page
 * @param  {String} page        Page number to show data
 */
const paginator = async function paginateData(table_name, query, opts) { 
    
    let dbConfig = {
        connection: this.dbConfig
    }
    
    if(!query) throw new Error('You must have to pass query');

    if(!this.dbConfig.client) dbConfig.client = 'mysql';

    if(!table_name) throw new Error('You must have to specify table name');

    knex = await knex(dbConfig);

}