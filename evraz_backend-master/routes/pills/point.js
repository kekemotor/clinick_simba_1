const { buyPills, sellPills} = require('../../handlers/pills/handler');
const { ReceivingUsers } = require('../../handlers/users/handler');
module.exports = function (fastify, opts, next) {

    fastify.route({
        url:    '/buyPills',
        method: 'POST',
        async handler(request, reply) {
            const data = await buyPills(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });


    fastify.route({
        url:    '/sellPills',
        method: 'POST',

        async handler(request, reply) {
            const data = await sellPills(request.body);
            reply.status(data.statusCode)
            reply.send(data)

        },
    })

    next();
};
