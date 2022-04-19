const argon2 = require("argon2");
const { connection } = require("../../db-connection");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

class Admin {
  static findMany() {
    const sql = "SELECT id, email FROM ADMIN";
    return connection.promise().query(sql);
  }

  static findOneAdminById(id) {
    const sql = "SELECT * FROM ADMIN WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneAdminByEmail(email) {
    const sql = "SELECT * FROM ADMIN WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static deleteOnebyId(id) {
    const sql = "DELETE FROM ADMIN WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  // vérifie que l'email existe via query de email ds la database
  static async emailAlreadyExists(email) {
    const sql = "SELECT * FROM ADMIN WHERE email=?";
    const [result] = await connection.promise().query(sql, [email]);
    return result.length > 0;
  }

  // vérifie que le password est ok
  static async verifyPassword(hashedPassword) {
    const sql = "SELECT hashedPassword FROM ADMIN WHERE email=?";
    return connection.promise().query(sql, [hashedPassword]);
  }

  // hash le password via argon2
  static async passwordHashing(password) {
    const hashedPassword = await argon2.hash(password, hashingOptions);
    return hashedPassword;
  }

  static verifyPasswordHash(hashedPassword, password) {
    return argon2.verify(hashedPassword, password, hashingOptions);
  }

  static createOne(admin) {
    const sql = "INSERT INTO ADMIN SET ?";
    return connection.promise().query(sql, [admin]);
  }
}

module.exports = Admin;