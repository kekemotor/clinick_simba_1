const bcrypt = require('bcryptjs')
const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const md5 = require('md5');

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min
}
const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kostaykazunin@gmail.com',
        pass: 'suzeiputsxgounwu'
    }
})

async function addInBasket(object){
    const funcName = 'addInBasket';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        await client.query(`INSERT INTO basket_for_users ("userEmail", "quantity","idItems" ,"place")
                                  VALUES ($1, $2, $3, $4, $5)`,
            [
                object.userEmail,
                object.quantity,
                object.name,
                object.category,
                object.place
            ]);
        const checkAddInfo = await client.query(`SELECT * FROM basket_for_users WHERE "userEmail" = $1`, [object.userEmail])
        if (checkAddInfo.rows.length === 0 ){
            data.message = 'данные не были добавлены в табличку, попробуйте позже'
        }
        data.statusCode = 200
        data.message = 'иформация успешно добавлена в табличку'
    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}
async function backInfoInBasket(object){
    const funcName = 'backInfoInBasket';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400, allInfo: ''
    };
    try {
        const backUsers = await client.query(`SELECT * FROM basket_for_users where "userToken" = $1 `, [object.userToken])
        const checkToken = backUsers.rows[0]['userToken']

        if (backUsers ===0){
            data.message = 'не нашёл такой токен'

        }
        data.allInfo = backUsers.rows
        data.message = 'all good'
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
async function deleteTable(object){
    const funcName = 'deleteTable';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        await client.query(`DELETE FROM basket_for_users where "userToken" = $1`,[object.userToken])
        const checkDelete = await client.query(`SELECT * FROM basket_for_users where "userToken" = $1`,[object.userToken])


        if (checkDelete >0){
            data.message = 'не удалилось(((('
        }
        data.statusCode =200
        data.message = 'всё отлично'
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
    addInBasket:addInBasket,
    deleteTable:deleteTable,
    backInfoInBasket:backInfoInBasket

};