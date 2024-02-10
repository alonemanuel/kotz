module.exports = ({ env }) => ({
    // Other plugin configs...

    'users-permissions': {
        config: {
            jwtSecret: env('JWT_SECRET'),
        },
    },
});
