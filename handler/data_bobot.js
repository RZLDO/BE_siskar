const connection = require('../connection');

const postbobot = async (request, h) => {
  const { id_bobot, nm_bobot, nilai_bobot } = request.payload;
  try {
    await (await connection).execute('INSERT INTO tb_bobot (id_bobot, nm_bobot, nilai_bobot) VALUES (?,?,?)', [id_bobot, nm_bobot, nilai_bobot]);
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

const getbobot = async (request, h) => {
  try {
    const query = 'SELECT * FROM tb_bobot';
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

const putbobot = async (request, h) => {
  const { nm_bobot, id_bobot, nilai_bobot } = request.payload;
  // Validasi nilai_bobot berada di rentang 0 hingga 1
  if (nilai_bobot < 0 || nilai_bobot > 1) {
    return h
      .response({
        error: true,
        message: 'nilai_bobot harus berada di antara 0 hingga 1.',
      })
      .code(400); // 400 Bad Request
  }
  try {
    const [response] = await (await connection).execute('UPDATE tb_bobot SET nm_bobot = ?, nilai_bobot = ? WHERE id_bobot = ?', [nm_bobot, nilai_bobot, id_bobot]);
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

const deletebobot = async (request, h) => {
  try {
    const { id_bobot } = request.params;
    const query = 'DELETE FROM tb_bobot where id_bobot = ?';
    const queryParams = [id_bobot];
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

module.exports = [getbobot, putbobot, deletebobot, postbobot];
