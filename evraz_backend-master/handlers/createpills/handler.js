const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')


async function addInDB(object){
    const funcName = 'addInDB';
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

async function deletpills(object){
    const funcName = 'deletpills';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        await client.query(`DELETE FROM item_pills_bd where "name" = $1`,[object.name])
    }catch (err){
        console.log(err.message, err.stack);
    }
    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}




async function changeCount(object){
    const funcName = 'changeCount';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        await client.query('UPDATE item_pills_bd SET "quantity" = $1 where "name" = $2', [object.quantity, object.name])
    }catch (err){
        console.log(err.message, err.stack);
    }
    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}



async function backInfoAway(object){
    const funcName = 'changeCount';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const allInfo = await client.query(`SELECT * FROM item_pills_bd where "categories_id" = $1`, [object.categories_id])

        if (allInfo.rows.length == 0){
            data.message = 'our rows = 0'
        }
        data.message = allInfo.rows
        data.statusCode = 200
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
    deletpills: deletpills,
    changeCount: changeCount,
    backInfoAway: backInfoAway,

};
