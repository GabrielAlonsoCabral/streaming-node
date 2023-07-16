import axios from "axios";
import { Transform, Writable } from "stream";

async function consume(){
    const response = await axios({
        url:'http://localhost:3000',
        method:'get',
        responseType:'stream'
    })

    return response.data
}

const stream  = await consume()
stream
.pipe(
    new Transform({
        transform(chunk, enc, cb){
            const item = JSON.parse(chunk)
            console.log({item})
            cb(null, JSON.stringify(item))
        }
    })
)
.pipe(
    new Writable({
        write(chunk, enc, cb){
            console.log("Writable: ", chunk)
            cb()
        }
    })
)
