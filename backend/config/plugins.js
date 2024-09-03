module.exports = ({ env }) => ({
    // Other plugin configs...

    'users-permissions': {
        config: {
            jwtSecret: env('JWT_SECRET'),
        },
    },
    'strapi-plugin-populate-deep': {
        config: {
            defaultDepth: 3, // Default is 5
        }
    },
    'strapi-plugin-import-export-entries': {
        config: {
            formLimit: "256mb", // modify form body
            jsonLimit: "256mb", // modify JSON body
            textLimit: "256mb" // modify text body
        }
    },
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_ACCESS_SECRET'),
                region: env('AWS_REGION'),
                params: {
                    ACL: env('AWS_ACL', 'public-read'),
                    signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
                    Bucket: env('AWS_BUCKET'),
                },
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        }
    }
});
