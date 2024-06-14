const bcrypt = require('bcryptjs')
const { pool } = require('../../dependencies');
const nodemailer = require('nodemailer')
const md5 = require('md5');
const {decode} = require("jsonwebtoken");
const passwordForSurgery = "Ghsjasd12353476"
const jwt = require('jsonwebtoken')
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
    let fal = 'false'

    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {



        await client.query(`INSERT INTO scheduled ("userId", "servicesId","userEmail","time", "status")
                                  VALUES ($1, $2,$3,$4,$5)`,
            [
                object.userId,
                    object.servicesId,
                object.userEmail,
                object.time,
                fal


            ])
        // отправка


        const mailOptions = {
            from: 'kostaykazunin@gmail.com',
            to: object.userEmail,
            subject: 'Clinic_simba',
            text: 'дата записи => ' + object.time + 'также за сутки до вашего визита вам необходимо подтвердить ваш визит за сутки',
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

async function PostInfo(object) {
    const funcName = 'PostInfo';
    const client = await pool.connect();
    const data = {
        message: 'error', statusCode: 400, dateWait: [], statusInfo: false, newAccessToken: 'none', newRefreshToken: 'none'
    };
    try {
        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]
        const check = await client.query(`SELECT "time"
                                          FROM scheduled
                                          where userEmail = $1`, [Email])
        if (check.rows.length === 0) {
            data.message = 'don`t found'
        }
        const checkStatus =  await  client.query(`SELECT * FROM scheduled where "userEmail = $1"`, [
            Email
        ])
        let dataScheduled = check.rows[0]['time']
        let now = new Data()
        let mass = [{
            year: "",
            month: "",
            date: "",
            hour: "",
            minutes: ""
        }]
        mass[0]['year'] = dataScheduled.getFullYear() - now.getFullYear()
        mass[0]['month'] = dataScheduled.getMonth() - now.getMonth()
        mass[0]['date'] = dataScheduled.getDate() - now.getDate()
        mass[0]['hour'] = dataScheduled.getHours() - now.getHours()
        mass[0]['minutes'] = dataScheduled.getMinutes() - now.getMinutes()
        data.dateWait = mass
        data.statusCode = 200
        data.message = check.rows + now
        data.statusInfo = checkStatus[0]['status']
    } catch (err) {
        console.log(err.message, err.stack);

        const token = ['refreshToken']
        let refresh = jwt.decode(token)
        refresh = refresh['userEmail'][0]

        await client.query(`SELECT * FROM scheduled where "userEmail" = $1`, [refresh])
        if (refresh.rows.length == 0) {
            data.statusCode = 403
            data.message = 'tokenDEAD'
        }
        payload = {
            userEmail: refresh
        }
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        data.newAccessToken = accessToken
        data.newRefreshToken = refreshToken
    }
finally
{
    client.release();
    console.log(`${funcName}: client release()`);
}
return data;}


async function messageInfo(object) {
    const funcName = 'PostInfo';
    const client = await pool.connect();
    let mass = [{
        year: "",
        month: "",
        date: "",
        hour: "",
        minutes: ""
    }]
    const data = {
        message: 'error', statusCode: 400, dateWait: []
    };
    try {

        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]

        const check = await client.query(`SELECT "time"
                                          FROM scheduled
                                          where userEmail = $1`, [Email])
        let dataScheduled = check.rows[0]['time']
        let now = new Data()
        if (check.rows.length === 0) {
            data.message = 'don`t found'
        }

        if (dataScheduled.getDate() - now.getDate() <= 1 &&
            dataScheduled.getMonth() - now.getMonth() === 0 &&
            dataScheduled.getFullYear() - now.getFullYear() === 0 &&
            dataScheduled.getHours() - now.getHours() <=24){


            //
            // dataScheduled.getFullYear() - now.getFullYear() === 0 &&
            // dataScheduled.getMonth() - now.getMonth() === 0 &&
            // dataScheduled.getDate() - now.getDate() === 1 &&
            // dataScheduled.getHours() - now.getHours() === 0 &&
            // dataScheduled.getMinutes() - now.getMinutes() === 0

            const mailOptions = {
                from: 'kostaykazunin@gmail.com',
                to: object.userEmail,
                subject: 'Clinic_simba',
                text: 'вам необходимо подтвердить ваш визит к нам в личном кабинете за 48 часов до начала приёма',
            }
            await transporter.sendMail(mailOptions,  async err => {
                console.log(err)})


            data.message = 200

            mass[0]['date'] = dataScheduled.getDate() - now.getDate()
            mass[0]['hour'] = dataScheduled.getHours() - now.getHours()
            data.dateWait = mass

        }

        data.statusCode = 400
        data.message = check.rows  +   '            '   + now
    } catch (err) {
        console.log(err.message, err.stack);
    }


finally
    {
        client.release();
        console.log(`${funcName}: client release()`);
    }
    return data;

}
//подтверждние записи
async function ConfirmationTrue(object) {
    const funcName = 'ConfirmationTrue';
    const client = await pool.connect();
    const data = {
        message: 'error', statusCode: 400, dateWait: []
    };
    try {
        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]
        const checkConfirmation = object['Confirmation']
        if (checkConfirmation === 'True'){
            await client.query('UPDATE scheduled SET "status" = $1 where "userEmail" = $2', ['True',

                Email

            ])
        }



    } catch (err) {
        console.log(err.message, err.stack);
    }


    finally
    {
        client.release();
        console.log(`${funcName}: client release()`);
    }
    return data;}
// пользователь не подтчердил запись
async function ConfirmationFalse(object) {
    const funcName = 'ConfirmationFalse';
    const client = await pool.connect();
    const data = {
        message: 'error', statusCode: 400, dateWait: []
    };
    try {
        const Token = object["userToken"]
        let decodeToken =jwt.decode(Token)
        let Email =decodeToken['userEmail'][0]
        const checkConfirmation = object['Confirmation']

        if (checkConfirmation === 'False'){
            await client.query(`DELETE * FROM scheduled where "userEmail" = $1`, [
                Email
            ])
        }

    } catch (err) {
        console.log(err.message, err.stack);
    }


    finally
    {
        client.release();
        console.log(`${funcName}: client release()`);
    }
    return data;}
module.exports = {
    ADDuser: ADDuser,
    PostInfo: PostInfo,
    messageInfo: messageInfo,
    ConfirmationTrue:ConfirmationTrue,
    ConfirmationFalse:ConfirmationFalse

};