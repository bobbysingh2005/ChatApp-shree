import server from './server';
import logger from 'morgan';

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || 'localhost';
server.listen(port, ()=>{
    console.log(`
    ChatApp shree server start on http://${host}:${port}
    press ctrl + c to exit`);
    })