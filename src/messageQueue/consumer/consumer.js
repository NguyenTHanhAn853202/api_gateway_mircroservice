const amqplib = require('amqplib');

const URL = process.env.url_rabbitMQ


class Consumer{
    constructor(){
        this.channel = null;
        this.connection = null
    }

    async createChannel(){
        try {
            this.connection = await amqplib.connect(URL)
            this.channel = await this.connection.createChannel()
        } catch (error) {
            console.log(error);
        }
    }
    async receiveMessage(queueTask,callback){
        try {
            if(!this.channel){
                await this.createChannel(queueTask)
            }
            await this.channel.assertQueue(queueTask,{
                durable:true
            })   
            await this.channel.consume(queueTask,(msg)=>{
               const data = JSON.parse(msg.content.toString())
               callback(data)
            },{noAck:true})

            console.log("listening queue: ",queueTask)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Consumer();