const { addInDB, changeCount, backCount, backInfoAway, deletpills } = require('../../handlers/createpills/handler');

module.exports = function (fastify, opts, next) {

    fastify.route({
        url:    '/addInDB',
        method: 'POST',
        async handler(request, reply) {
            const data = await addInDB(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    fastify.route({
        url:    '/changeCount',
        method: 'POST',
        async handler(request, reply) {
            const data = await changeCount(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    fastify.route({
        url:    '/backCount',
        method: 'POST',
        async handler(request, reply) {
            const data = await backCount(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    fastify.route({
        url:    '/backInfoAway',
        method: 'POST',
        async handler(request, reply) {
            const data = await backInfoAway(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    fastify.route({
        url:    '/deletpills',
        method: 'POST',
        async handler(request, reply) {
            const data = await deletpills(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    next();
};

