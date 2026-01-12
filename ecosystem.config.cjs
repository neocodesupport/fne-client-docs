// Config for PM2
module.exports = {
    apps: [
        {
            name: "fne-client-docs",
            script: ".output/server/index.mjs",
            cwd: "/var/www/fne-client-docs",
            exec_mode: "fork",
            instances: 1,
            env: {
                NODE_ENV: "production",
                PORT: 4000,
                HOST: "127.0.0.1"
            }
        }
    ]
}
