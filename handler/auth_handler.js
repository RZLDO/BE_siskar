const connection = require('../connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const saltRounds = 10;
const loginHanlder = async (request, h) => {
  try {
    const { username, password } = request.payload;

    if (!username || !password) {
      const response = h.response({
        error: true,
        message: 'username and password are required',
      });
      response.code(400);
      return response;
    }
    const checkUsername = 'SELECT * FROM tb_admin WHERE username = ?';
    const [rows] = await (await connection).execute(checkUsername, [username]);
    if (rows.length === 0) {
      const response = h.response({
        error: true,
        message: 'invalid username or password',
      });
      response.code(400);
      return response;
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (passwordMatch) {
      const response = h.response({
        error: true,
        message: 'invalid username or password',
      });
      response.code(400);
      return response;
    }
    const token = jwt.sign({ userId: user.userId, username: user.username, noTelp: user.no_telp }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const response = h.response({
      error: false,
      message: 'success',
      loginResult: {
        userId: user.id_institusi,
        username: user.username,
        noTelp: user.no_telp,
        token: token,
      },
    });
    response.code(200);
    return response;
  } catch (e) {
    console.log(e);
    const response = h.response({ error: 'true', message: 'error login' });
    response.code(500);
    return response;
  }
};

const registerHandler = async (request, h) => {
  try {
    const { namaAdmin, username, password, noTelp, jk } = request.payload;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const duplicateQuery = 'SELECT COUNT(*) AS count FROM tb_admin WHERE username = ?';
    const [duplicateRows] = await (await connection).execute(duplicateQuery, [username]);
    if (duplicateRows[0].count > 0) {
      const response = h.response({
        error: true,
        message: 'Username already exists',
      });
      response.code(400);
      return response;
    }
    (await connection).query('INSERT INTO tb_admin (nm_admin,username,password,no_telp,jk) VALUES(?,?,?,?,?)', [namaAdmin, username, hashedPassword, noTelp, jk]);
    const response = h.response({
      error: false,
      message: 'User registered successfully',
    });
    response.code(200);
    return response;
  } catch (e) {
    console.error('error:', e.message);
    const response = h.response({
      error: true,
      message: 'error registering users',
    });
    response.code(400);
    return response;
  }
};

module.exports = [loginHanlder, registerHandler];
