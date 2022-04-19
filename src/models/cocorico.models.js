const { connection } = require("../../db-connection");

class Cocorico {

  static findManyCocorico() {
    const sql ="SELECT * FROM COCORICO";
    return connection.promise().query(sql);
  }
  static findOneCocoricoById(id) {
    const sql = "SELECT * FROM COCORICO WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static async personnageAlreadyExists(name) {
    const sql = "SELECT * FROM COCORICO WHERE name=?";
    const [result] = await connection.promise().query(sql, [name]);
    return result.length > 0;
  }

  static updateOneCocorico(majCocorico, id) {
    const sql = "UPDATE COCORICO SET ? WHERE id=?";
    return connection.promise().query(sql, [majCocorico, id]);
  }

  static deleteOnePersonnageById(id) {
    const sql = "DELETE FROM COCORICO WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOnePersonnage(personnage) {
    const sql = "INSERT INTO COCORICO SET ?";
    return connection.promise().query(sql, [personnage]);
  }
}

module.exports = Cocorico;
