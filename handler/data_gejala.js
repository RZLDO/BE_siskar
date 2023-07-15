const connection = require('../connection');

const postgejala = async (request, h) => {
  const { id_gejala, nm_gejala } = request.payload;
  try {
    await (await connection).execute('INSERT INTO tb_gejala (id_gejala, nm_gejala) VALUES (?,?)', [id_gejala, nm_gejala]);
    return h.response({
      error: false,
      message: 'success adding data',
    });
  } catch (error) {
    console.error(error);
    return h
      .response({
        error: true,
        message: 'Error inserting data into the database.',
      })
      .code(500);
  }
};

const getgejala = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_gejala';
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

const putgejala = async (request, h) => {
  const { nm_gejala, id_gejala } = request.payload;
  try {
    const [response] = await (await connection).execute('UPDATE tb_gejala SET nm_gejala = ? WHERE id_gejala = ?', [nm_gejala, id_gejala]);
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

const deletegejala = async (request, h) => {
  try {
    const { id_gejala } = request.params;
    const query = 'DELETE FROM tb_gejala where id_gejala = ?';
    const queryParams = [id_gejala];
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

module.exports = [getgejala, putgejala, deletegejala, postgejala];
