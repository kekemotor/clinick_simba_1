const { addInDB, changeCount, backCount, backInfoAway, deletpills } = require('../../handlers/createpills/handler');
const jwt = require("jsonwebtoken");

module.exports = function (fastify, opts, next) {

    fastify.addHook('preHandler', async (request, reply) => {
        try {
            const data = jwt.verify(request.headers.access, process.env.JWT_ACCESS_SECRET)
            request.info = data.userEmail
        }
        catch (e) {
            reply.code(403);
            reply.send({ 'message': 'Access denied', 'statusCode': 403 });
            return;
        }
    });



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

