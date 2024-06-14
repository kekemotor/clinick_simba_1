const bcrypt = require('bcryptjs')
const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const md5 = require('md5');
const jwt = require("jsonwebtoken");

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min
}





async function buyPills(object){
    const funcName = 'buyPills';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        let random_code = getRandom(10000,99999).toString()
        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]
        const check_user = await client.query(`SELECT *
        FROM users where "userEmail" = $1`,[Email])

        if (check_user.rows.length == 0){
            data.message = 'Такого пользователя нет'
        }
        console.log(check_user.rows)
        console.log(check_user.rows.length)
        console.log(object.pillsName)

        // await client.query(`INSERT INTO sell_pills ("userEmail", "randomNumber", "pillsName", "pillsCategory")
        // VALUES ($1, $2, $3,$4)`
        //
        //
        //     [
        //         object.userEmail,
        //         random_code,
        //         object.pillsName,
        //         object.pillsCategory
        //     ]);
        await client.query(`INSERT INTO sell_pills ("userEmail", "randomNumber", "pillsName", "pillsCategory")
                                                  VALUES ($1, $2, $3, $4)`,
            [
                object.userEmail,
                random_code,
                object.pillsName,
                object.pillsCategory

            ]);
        data.message = random_code
        data.statusCode = 200

    }catch (err){
        console.log(err);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}

async function sellPills(object){
    const funcName = 'sellPills';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const code = object['sellCode']
        const checkCode = await  client.query(`SELECT * FROM sell_pills where "randomNumber" = $1`, [code])
        if (checkCode.rows.length == 0){
            data.message = 'вашего кода нет в нашей базе данных'
        }

        const email = checkCode.rows[0]['userEmail']

        data.message= `всё отлично, email пользователя:${email}`
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

    buyPills: buyPills,
    sellPills: sellPills,

};
