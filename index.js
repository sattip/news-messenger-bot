const Bot = require("messenger-bot")
const http = require("http")
var config = require('config');


const NODE_ENV = process.env.NODE_ENV || "development"
const ENV = process.env

if (NODE_ENV == "development") {
    require("./config/keys")
}

var bot = new Bot({
    token: ENV["FACEBOOK_PAGE_TOKEN"],
    verify: ENV["FACEBOOK_WEBHOOK_VERIFICATION_KEY"],
    app_secret: ENV["FACEBOOK_APP_SECRET"]
})

const PORT = process.env.PORT || config.get('WebServer.port')
const HOST = process.env.HOST || config.get('WebServer.host')

require("./bot_modules/index")(bot)

http.createServer(bot.middleware())
    .listen(PORT, HOST,
    function (error) {
        if (!error) {
            console.log("Server is listening:")
            console.log(`PORT: ${PORT}`)
            console.log(`HOST: ${HOST}`)
        }
        else {
            console.error(error)
        }
    })
