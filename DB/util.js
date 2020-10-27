const { pool } = require('./config');

/**
 * query: DB에 요청할 쿼리문을 작성한다.
 * @param {{ text: "", values: [] }!} statement: text: 쿼리문, values: 쿼리문에 들어갈 값(변수)
 */
const query = (statement = { text: "", values: [] }) => {
    return new Promise((res, rej) => {
      pool.query(statement, (err, data) => (err ? rej(err) : res(data["rows"])));
    });
};
  
  
/**
 * statement: SQL 쿼리문을 value 와 함께 파싱한다.
 * @param {String} text : DB 쿼리문
 * @param {Array} values : 쿼리문에 인자로 넘길 값
 */
const statement = (text="", values=[]) => {
    return { text, values };
}

module.exports.query = query;
module.exports.statement = statement;
