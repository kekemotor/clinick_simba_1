const { createUser, changeUserPassword, userLogin,createUser_2} = require('../../handlers/users/handler');
const { ReceivingUsers } = require('../../handlers/users/handler');
module.exports = function (fastify, opts, next) {
    
    fastify.route({
        url:    '/create',
        method: 'POST',
        async handler(request, reply) {
            const data = await createUser(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    fastify.route({
        url:    '/update',
        method: 'POST',
        async handler(request, reply) {
            const data = await changeUserPassword(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    fastify.route({
        url:    '/Login',
        method: 'POST',
        async handler(request, reply) {
            const data = await userLogin(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });


    fastify.route({
        url:    '/catch',
        method: 'POST',

        async handler(request, reply) {
            const data = await ReceivingUsers(request.body);
            reply.status(data.statusCode)
            reply.send(data)

        },
    });

    fastify.route({
        url:    '/addUser',
        method: 'POST',

        async handler(request, reply) {
            const data = await createUser_2(request.body);
            reply.status(data.statusCode)
            reply.send(data)

        },
    });
    
    next();
};


