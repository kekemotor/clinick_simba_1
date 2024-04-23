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





async function RFS(object){
    const funcName = 'RFS';
    const client = await pool.connect();
    const data = {
        message:    'error',    statusCode: 400,
    };
    try {
        const password = object['passwordForSurgery']
        if (password == passwordForSurgery){
            data.statusCode = 200
            data.message = 'all good'
            // отправка
            const mailOptions = {
                from: 'kostaykazunin@gmail.com',
                to: object.userEmail,
                subject: 'Clinic_simba',
                text: 'your individual code verification => ' + random_code,
            }

            await transporter.sendMail(mailOptions,  async err => {
                console.log(err)})
        }
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
    RFS: RFS,

};