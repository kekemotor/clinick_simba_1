const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')


async function addInDB(object){
    const funcName = '';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        await client.query(`INSERT INTO item_pills_bd ("description", "img", "name", "quantity", "category")
                                  VALUES ($1, $2,$3,$4,$5)`,
            [
                object.description,
                object.img,
                object.name,
                object.quantity,
                object.category
            ]);
    }catch (err){
        console.log(err.message, err.stack);
    }
    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}





module.exports = {
    addInDB: addInDB,


};
