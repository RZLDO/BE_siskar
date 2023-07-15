const connection = require('../connection');

const getadmin = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_admin';
    const [data] = await (await connection).execute(query);
    const response = h.response({
      error: false,
      message: 'Success get data',
      data,
    });
    response.code(200);
    return response;
  } catch (e) {
    console.log(e);
    const response = h.response({ error: 'true', message: 'error data get' });
    response.code(200);
    return response;
  }
};

const putadmin = async (request, h) => {
  const { id_admin, nm_admin, username, password, no_telp, jk } = request.payload;
  try {
    const [response] = await (await connection).execute('UPDATE tb_admin SET nm_admin = ?, username = ?, password = ?, no_telp = ?, jk = ? WHERE id_admin = ?', [nm_admin, username, password, no_telp, jk, id_admin]);
    return h.response({
      error: false,
      message: 'Success updating data',
    });
  } catch (error) {
    console.error(error);
    return h
      .response({
        error: true,
        message: 'Error updating data in the database.',
      })
      .code(500);
  }
};

const deleteadmin = async (request, h) => {
  try {
    const { id_admin } = request.params;
    const query = 'DELETE FROM tb_admin where id_admin = ?';
    const queryParams = [id_admin];
    await (await connection).execute(query, queryParams);
    const response = h.response({
      message: 'Data Deleted Successfuly',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      message: 'Error delete data in the database.',
    });
    response.code(500);
    return response;
  }
};

module.exports = [getadmin, putadmin, deleteadmin];
