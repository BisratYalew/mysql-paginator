const knex      = require('knex');

/**
 * Paginate Data from Mysql/Maria Databases.  
 * 
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

    var firstQueryParam;

    if(query.length) firstQueryParam = String(query[Object.keys(query)[0]]);
    else firstQueryParam = 'id';

    knex(table_name).count(`${firstQueryParam} as num`).then((result) => {   
        let paginationData = preparePaginationValues(Number(opts.per_page), Number(opts.page), result[0].num);
        knex(table_name).select().where(query).limit(paginationData.start_limit)
            .then((result) => {
            let docs = {
            total_pages: paginationData.total_pages,
            total_docs: paginationData.total_docs,
            page: paginationData.page,
            per_page: paginationData.per_page,
            docs: result
          }
          console.log(docs);
          return docs;
        });
    })
}


/**
 * Prepare Pagination Limit, Offset and other values 
 * 
 * @name Paginate Data
 * @function
 * @param  {String} per_page    Number of data to get per page
 * @param  {String} page        Page Number to show data
 * @param  {String} total_docs  Number of total documents found on the db
 */
const preparePaginationValues = async (per_page, page, total_docs) => {
    
    var total_pages = total_docs/per_page;

    
    if(per_page > 100) per_page = 100;
    if(per_page > total_docs) per_page = total_docs;
  
    var last_limit = page * per_page;
    var start_limit = last_limit - per_page;
  
    if(Number.isInteger(total_pages) == false) total_pages = Number.parseInt(total_pages) + 1
      
    if(Number.isInteger(page) == false) page = Number.parseInt(page) + 1
       
    if(Number.isInteger(start_limit) == false) {
       start_limit = Number.parseInt(start_limit)  
    }
  
    if(start_limit < 0) start_limit = 0    
  
    if(page==0) page=1;      
   
    pagination_data = {
       total_pages: total_pages,
       total_docs: total_docs,
       per_page: per_page,
       page: page-1 || page,
       start_limit: start_limit,
       last_limit: last_limit
    }
  
    return pagination_data;
}
