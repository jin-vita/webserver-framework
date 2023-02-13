const util = require(`../util/util`);
const param = require(`../util/param`);
const logger = require(`../util/logger`);

const Database = require(`../database/database_mysql`);
const userSql = require(`../database/sql/user_sql`);

/**
 * @Controller(path="/user")
 */
class UserController {
  constructor() {
    this.database = new Database(`database_mysql`);
  }

  /**
   * @RequestMapping(path="/list", method="get,post")
   */
  async userList(req, res) {
    logger.debug(`userList 요청됨.`);
    const params = param.parse(req);

    try {
      // 레코드 개수 조회
      let sql = param.getCountSql(userSql.user_list, params);
      let queryParam = {
        sql: sql,
      };
      let rows = await this.database.query(queryParam);
      const total = rows[0].total;
      // SQL 문 실행
      sql = param.getSql(userSql.user_list, params);
      queryParam = {
        sql: sql,
      };
      rows = await this.database.query(queryParam);

      // 응답 보내기
      const output = {
        header: {
          requestCode: params.requestCode,
          page: params.page,
          perPage: params.perPage,
          total: total,
          search: params.search,
          searchValue: params.searchValue,
          searchJoin: params.searchJoin,
          searchLike: params.searchLike,
          order: params.order,
          orderDirection: params.orderDirection,
        },
        body: rows,
      };
      util.sendRes(res, 200, `OK`, output);
      logger.debug(`userList -> ${JSON.stringify(output)}`);
    } catch (err) {
      util.sendError(res, 400, `Error : ${err}`);
      logger.error(`Error in UserController:userList -> ${err}`);
    }
  }

  /**
   * @RequestMapping(path="/insert", method="get,post")
   */
  async userInsert(req, res) {
    logger.debug(`userInsert 요청됨.`);
    const params = param.parse(req);

    try {
      const queryParam = {
        sqlName: `user_insert`,
        params: params,
        paramType: {},
      };

      let rows = await this.database.execute(queryParam);
      // 응답 보내기
      const output = {
        header: {
          requestCode: params.requestCode,
        },
        body: rows,
      };
      util.sendRes(res, 200, `OK`, output);
      logger.debug(`userInsert -> ${JSON.stringify(output)}`);
    } catch (err) {
      util.sendError(res, 400, `Error : ${err}`);
      logger.error(`Error in UserController:userInsert -> ${err}`);
    }
  }
}

module.exports = UserController;
