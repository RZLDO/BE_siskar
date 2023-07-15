const connection = require('../connection');

const postpenyakit = async (request, h) => {
  const { id_penyakit, nama_penyakit, definisi, pengobatan } = request.payload;
  try {
    await (await connection).execute('INSERT INTO tb_penyakit (id_penyakit, nama_penyakit, definisi, pengobatan) VALUES (?,?,?,?)', [id_penyakit, nama_penyakit, definisi, pengobatan]);
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

const getpenyakit = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_penyakit';
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

const putpenyakit = async (request, h) => {
  const { id_penyakit, nama_penyakit, definisi, pengobatan } = request.payload;
  try {
    const [response] = await (await connection).execute('UPDATE tb_penyakit SET nama_penyakit = ?, definisi = ?, pengobatan = ? WHERE id_penyakit = ?', [nama_penyakit, definisi, pengobatan, id_penyakit]);
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

const deletepenyakit = async (request, h) => {
  try {
    const { id_penyakit } = request.params;
    const query = 'DELETE FROM tb_penyakit where id_penyakit = ?';
    const queryParams = [id_penyakit];
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

module.exports = [getpenyakit, putpenyakit, deletepenyakit, postpenyakit];
