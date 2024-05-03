const bcrypt = require('bcryptjs')
const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const md5 = require('md5');
const passwordForSurgery = "Ghsjasd12353476"
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


// // отправка
// const mailOptions = {
//     from: 'kostaykazunin@gmail.com',
//     to: object.userEmail,
//     subject: 'Clinic_simba',
//     text: 'your individual code verification => ' + random_code,
// }
// await transporter.sendMail(mailOptions,  async err => {
//     console.log(err)})

async function ADDuser(object){
    const funcName = 'ADDuser';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {



        await client.query(`INSERT INTO scheduled ("userId", "servicesId","userEmail","time")
                                  VALUES ($1, $2,$3)`,
            [
                object.userId,
                    object.servicesId,
                object.userEmail,
                object.time

            ])
        // отправка
        const mailOptions = {
            from: 'kostaykazunin@gmail.com',
            to: object.userEmail,
            subject: 'Clinic_simba',
            text: 'дата записи => ' + object.time,
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

async function PostInfo(object){
    const funcName = 'PostInfo';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {



        const check = await client.query(`SELECT "time" and "servicesDate"  FROM scheduled where userEmail = $1`, [object.userEmail])
        if (check.rows.length == 0){
            data.message = 'don`t found'
        }
        data.statusCode =200
        let now =  new Data()
        data.message = check.rows + now
    }catch (err){
        console.log(err.message, err.stack);
    }
    finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }
    return data;
}

async function PostInfoTime(object){
    const funcName = 'PostInfoTime';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {



        const check = await client.query(`SELECT "time"  FROM scheduled `)
        if (check.rows.length == 0){
            data.message = 'don`t found'
        }
        data.statusCode =200

        data.message = check.rows
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
    ADDuser: ADDuser,
    PostInfo: PostInfo,
    PostInfoTime: PostInfoTime

};