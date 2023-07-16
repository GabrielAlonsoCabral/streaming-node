import { randomUUID } from 'node:crypto'
import http, { IncomingMessage, ServerResponse } from 'node:http'
import { Readable } from 'node:stream'

//GENERATOR FUNCTION
function * run(){
    for(let index=0; index<=99;index++ ){
        const data = {
            id:randomUUID(),
            name:`Gabriel Alonso - ${index}`,
            at: Date.now()
        }

        yield data
    }
} 

async function handler (req:IncomingMessage,res:ServerResponse){
    //const readableStream = new Readable({
    //    read(){
    //        this.push("Hello")
    //        this.push("World")
    //        this.push(null)
    //    }
    //})

    const readableStream = new Readable({
        read(){
            for(const data of run()){
                console.log("Sending:", data)
                this.push(JSON.stringify(data).concat("\n"))
            }

            //FINISH STREAMING
            this.push(null)
        }
    })

    readableStream.pipe(res)
}
http.createServer(handler)
.listen(3000)
.on('listening',()=>console.log("Listening at port", 3000))