const consumer = require("./consumer");
const { verify_email_success } = require("./queueTask");
const {io} = require("../../socket")



async function connectConsumer(){
    try {
        await consumer.receiveMessage(verify_email_success,(data)=>{
            if(data?.code === 200){
                io.emit(verify_email_success,{
                    success:true,
                    message:data.message,
                    data:data.data
                })
                
            }
        })
    } catch (error) {
        console.log("error: ", error)
    }
}

module.exports = connectConsumer;