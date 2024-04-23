const { RFS: Point} = require('../../handlers/registrationForSurgery/handler');

module.exports = function (fastify, opts, next) {

    fastify.route({
        url:    '/RFS',
        method: 'POST',
        async handler(request, reply) {
            const data = await Point(request.body);
            reply.status(data.statusCode)
            reply.send(data)
        },
    });
    next();
};

