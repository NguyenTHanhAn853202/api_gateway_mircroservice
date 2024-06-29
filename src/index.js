require('dotenv').config()
const morgan = require("morgan")
const microservices = require('./microservice')
const connectConsumer = require('./messageQueue/consumer')
const {app,server} = require("./socket")

const port = process.env.PORT || 3000

app.use(morgan("dev"))


microservices(app)
// listen consumer rabbitMQ
connectConsumer()



server.listen(port,()=>{
    console.log("listening port: ",port)
})

