const { connection } = require("../../db-connection");

class Disciplines {
  static findOneDisciplineById(id) {
    const sql = "SELECT * FROM DISCIPLINES WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
  static async dsciplinesAlreadyExists(disciplines_name) {
    const sql = "SELECT * FROM DSCIPLINES WHERE royaume_name=?";
    const [result] = await connection.promise().query(sql, [disciplines_name]);
    return result.length > 0;
  }

  static updateOneDisciplines(majDisciplines, id) {
    const sql = "UPDATE DISCIPLINES SET ? WHERE id=?";
    return connection.promise().query(sql, [majDisciplines, id]);
  }

  static deleteOneDisciplinesById(id) {
    const sql = "DELETE FROM DISCIPLINES WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOneDisciplines(discipline) {
    const sql = "INSERT INTO DISCIPLINES SET ?";
    return connection.promise().query(sql, [discipline]);
  }
}

module.exports = Disciplines;