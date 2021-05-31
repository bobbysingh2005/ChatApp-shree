import Mongoose from 'mongoose';

// console.log(` databaseUrl: ${process.env.DATABASE_URL}`);
let host: any;
let url: any;
let db: any;

export const connect = async ()=>{

url =`mongodb://${process.env.DATABASE_HOST}:27017/${process.env.DATABASE_NAME}`;

if(db){ return; };
return db = await Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
console.log(`Database Connection is Ready`);
}).catch((err: any)=>{
    console.log(`Database Connection Fail: ${err}`);
})
};//endConnect;

export const disconnect = async ()=>{
if(!db){ return; };
console.log(`Database Disconnect`);
db.disconnect();
};//endDisconnect;

export default {
    connect,
    disconnect
}