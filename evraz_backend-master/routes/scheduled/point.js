const { ADDuser, PostInfo, PostInfoTime} = require('../../handlers/scheduled/handler');

module.exports = function (fastify, opts, next) {

    fastify.route({
        url:    '/ADDuser',
        method: 'POST',
        async handler(request, reply) {
            const data = await ADDuser(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    fastify.route({
        url:    '/PostInfoTime',
        method: 'POST',
        async handler(request, reply) {
            const data = await PostInfoTime(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    fastify.route({
        url:    '/PostInfo',
        method: 'POST',
        async handler(request, reply) {
            const data = await PostInfo(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    next();
};

