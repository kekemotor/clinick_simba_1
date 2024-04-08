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

const jwt = require('jsonwebtoken')
JWT_ACCESS_SECRET = 'jwt-service-negr_1'
JWT_REFRESH_SECRET = 'jwt-service-pidr_22'
async function createUser(object) {
    const data = {
        message:    'error',    statusCode: 400,
    };
    const funcName = 'createUser';
    const client = await pool.connect();
    try {
        // проверка наналичие пользователя
        const checkUser = await client.query(`SELECT *
        FROM users
        WHERE "userPhone" = $1 `, [object.userPhone]);
        if (checkUser.rows.length>0){
            console.log(`${funcName}: Пользователь с такой почтой уже зарегистрирован`);

            data.message = 'Пользователь с такой почтой уже зарегистрирован'
            return data
        }



        let random_code = getRandom(10000,99999).toString()



            const hash_password = (md5(object['User_password']));
            const creatUser = await client.query(`INSERT INTO users ("userPhone", "userEmail", "userHashPassword", "createDate")
                                                  VALUES ($1, $2, $3, $4)`,
                [
                    object.userPhone,
                    object.userEmail,
                    object.userHashPassword,
                    object.createDate,
                ]);

        const mailOptions = {
            from: 'kostaykazunin@gmail.com',
            to: object.userEmail,
            subject: 'Component-city',
            text: 'your individual code verification => ' + random_code
        }
        await transporter.sendMail(mailOptions, err => {
            console.log(err)
        })
    }catch (err){
        console.log(err)
    }











    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }

    return data;
}



async function ReceivingUsers(){
    const funcName = 'ReceivingUsers';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const showUsers = await pool.query('SELECT * FROM users')
        data.message = showUsers.rows
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
    createUser: createUser,
    ReceivingUsers: ReceivingUsers,

};


