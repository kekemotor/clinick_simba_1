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



//РЕГИСТРАЦИЯ

async function createUser(object){
    const funcName = 'createUser';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {

        const checkUser = await client.query(`SELECT *
            FROM users
            WHERE "userEmail" = $1 `, [object.userEmail]);
        if (checkUser.rows.length>0){
            data.message = 'Пользователь с таким email уже зарегистрирован'
            return data
        }

            let random_code = getRandom(10000, 99999).toString()
            await client.query(`INSERT INTO code_verification ("userEmail", "userCodeVerification")
                                VALUES ($1, $2)`,
                [
                    object.userEmail,
                    random_code

                ]);

            data.statusCode = 200
            data.message = 'всё отлично'

            // отправка
        const mailOptions = {
            from: 'kostaykazunin@gmail.com',
            to: object.userEmail,
            subject: 'Clinic_simba',
            text: 'your individual code verification => ' + random_code,
        }

        await transporter.sendMail(mailOptions,  async err => {
            console.log(err)})


    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}



async function createUser_2(object){
    const funcName = 'createUser_2';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const codeVerification = object['userCodeVerification']
        const codeVer = await client.query(`SELECT * FROM code_verification where "userEmail" = $1`, [object.userEmail])

        if(codeVerification !== codeVer.rows[0]['userCodeVerification']){
            data.message = 'неправильный код варификации'
            await client.query(`DELETE FROM code_verification where "userEmail" = $1`,[object.userEmail])
        }
        const hash_password = (md5(object['userPassword']));
        await client.query(`INSERT INTO users ("userEmail", "userHashPassword")
                                  VALUES ($1, $2)`,
            [
                object.userEmail,
                hash_password,
            ]);
        data.statusCode = 200
        data.message = 'всё заебись'



    }catch (err){
        console.log(err.message, err.stack);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}






// async function (){
//     const funcName = '';
//     const client = await pool.connect();
//     const data = {
//         message:    'error',    statusCode: 400,
//     };
//     try {
//
//     }catch (err){
//         console.log(err.message, err.stack);
//     }
//
//     finally {
//         client.release();
//         console.log(`${ funcName }: client release()`);
//     }
//     return data;
//
//
// }










// async function createUser(object) {
//     const data = {
//         message:    'error',    statusCode: 400,
//     };
//     const funcName = 'createUser';
//     const client = await pool.connect();
//     try {
//
//         // проверка наналичие пользователя
//         const checkUser = await client.query(`SELECT *
//         FROM users
//         WHERE "userPhone" = $1 `, [object.userPhone]);
//         if (checkUser.rows.length>0){
//             console.log(`${funcName}: Пользователь с такой почтой уже зарегистрирован`);
//
//             data.message = 'Пользователь с такой почтой уже зарегистрирован'
//             return data
//         }
//
//
//
//         // let random_code = getRandom(10000,99999).toString()
//         let random_code = 444222
//
//
//
//
//         const mailOptions = {
//             from: 'kostaykazunin@gmail.com',
//             to: object.userEmail,
//             subject: 'Clinic_simba',
//             text: 'your individual code verification => ' + random_code,
//         }
//
//         await transporter.sendMail(mailOptions,  async err => {
//             console.log(err)
//             let individual_code = object['individual_code']
//             if (random_code !== individual_code){
//                 data.message = 'неправильно введён код авторизации'
//             }
//             else {
//
//                 data.statusCode = 200
//                 const hash_password = (md5(object['User_password']));
//                 console.log(object.userPhone, object.userEmail, hash_password)
//                 await client.query(`INSERT INTO users ("userPhone", "userEmail", "userHashPassword")
//                                                   VALUES ($1, $2, $3)`,
//                     [
//                         object.userPhone,
//                         object.userEmail,
//                         hash_password,
//
//                     ]);
//                 data.statusCode = 200
//             }
//         })
//     }catch (err){
//         console.log(err)
//     }
//     finally {
//         client.release();
//         console.log(`${ funcName }: client release()`);
//     }
//
//     return data;
// }



//СМЕНА ПАРОЛЯ
async function changeUserPassword(object){
    const funcName = 'changeUserPassword';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const old_password = (md5(object['Old_password']));
        const new_password = (md5(object['New_password']));
        const UserEmail = object['userEmail'];
        const checkUser = await client.query(`SELECT *
        FROM users
        WHERE "userEmail" = $1 and "userHashPassword" = $2`,
            [
                UserEmail,
                old_password
            ]);
        if (checkUser.rows.length>0){
            await client.query('UPDATE users SET "userHashPassword" = $1 where "userEmail" = $2', [new_password, UserEmail])
            data.statusCode = 200
        }
        else{
            data.message = 'такого пароля нет у нас в бд, сорян'
        }

    }catch (err){
        console.log(err);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}


// ВХОД ПОЛЬЗОВАТЕЛЯ НА ПЛАТФОРМУ


async function userLogin(object){
    const funcName = 'userLogin';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {

        const hash_password = (md5(object['User_password']));
        console.log(hash_password)
        const user_check =  await client.query(`SELECT *
        FROM users
        where "userEmail" = $1 and "userHashPassword" = $2`, [object['userEmail'],hash_password]
        );
        console.log(user_check)
        if (user_check.rows.length >0){
            data.statusCode = 200
            data.message = 'all good'
        }
        else {
            data.message = 'неверный пароль или почта'
        }
    }catch (err){
        console.log(err);
    }

    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;


}

//ФУНКЦИЯ ДЛЯ ЗАНЕСЕНИЯ ИНФОРМАЦИИ О ПОКУПКЕ В БД

// async function buyPills(object){
//     const funcName = 'buyPills';
//     const client = await pool.connect();
//     const data = {
//         message:    'error',    statusCode: 400,
//     };
//     try {
//         let random_code = getRandom(10000,99999).toString()
//         const check_user = await client.query(`SELECT *
//         FROM users where "userEmail" = $1`,[object['userEmail']])
//
//         if (check_user.rows.length == 0){
//             data.message = 'Такого пользователя нет'
//         }
//         console.log(check_user.rows)
//         console.log(check_user.rows.length)
//         console.log(object.pillsName)
//
//         // await client.query(`INSERT INTO sell_pills ("userEmail", "randomNumber", "pillsName", "pillsCategory")
//         // VALUES ($1, $2, $3,$4)`
//         //
//         //
//         //     [
//         //         object.userEmail,
//         //         random_code,
//         //         object.pillsName,
//         //         object.pillsCategory
//         //     ]);
//         await client.query(`INSERT INTO sell_pills ("userEmail", "randomNumber", "pillsName", "pillsCategory")
//                                                   VALUES ($1, $2, $3, $4)`,
//             [
//                 object.userEmail,
//                 random_code,
//                 object.pillsName,
//                 object.pillsCategory
//
//             ]);
//         data.message = random_code
//         data.statusCode = 200
//
//     }catch (err){
//         console.log(err);
//     }
//
//     finally {
//         client.release();
//         console.log(`${ funcName }: client release()`);
//     }
//     return data;
//
//
// }



// НЕНУЖНАЯ ФУНКЦИЯ, НО ПУСКАЙ ПОБУДЕТ

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

// ФУНКЦИЯ ДЛЯ ОТСЛЕЖЕВАНИЯ КОДА ПОЛЬЗОВАТЕЛЯ(ДЛЯ СОРТИРОВКИ ЗАКАЗОВ)
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
    createUser: createUser,
    ReceivingUsers: ReceivingUsers,
    changeUserPassword: changeUserPassword,
    userLogin: userLogin,
    createUser_2: createUser_2,

};

// for buyPills
//     "userEmail": "saskibingo2288@gmail.com",
//     "pillsCategory": "pil",
//     "pillsName": "sigma"



//for create
//      "userEmail": "go2288@gmail.com",
//     "individual_code": 444222,
//     "userPhone": 89095679898,
//     "User_password": 1234567890


