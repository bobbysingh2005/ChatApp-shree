import express from 'express';
import db from './db';
import Users, {IUser} from './user';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

let router: any;
router = express.Router();

router.get('/', async (req: any, res: any)=>{
console.log(`Get All Users`);
await Users.find({}, (err: any, doc: any)=>{
    if(err) throw err;

    if(doc.length===Number(0)) {
    console.log('result: ', doc.length);
return res.status(200).json({ success: false, error: "Sorry No record Found!!!", data: null});
    };//endif;
res.status(200).send({success: true, error: null, data: doc});
})
});//endGetAllUsers;

router.get('/:id', async (req: any, res: any)=>{
try{
const id = req.params.id;
console.log(`get user id: ${id}`);

return await Users.find({_id: id}).then((result: any)=>{ console.log(result); return res.status(200).json({ success: true, error: null, data: result}); }).catch((err: any)=>{ console.log(err); res.status(401).json({ success: false, error: err, data: null}); process.exit(1); });
}catch(err: any){
console.log(err);
res.status(401).json({ success: false, error: err, data: null});
process.exit(1);
}
});//endGetUserById;

router.post('/', async (req: any, res: any)=>{
    try {
let body = req.body;
const cdate = new Date(Date.now());
console.log('Add new User: ', body);
// console.log(body);
body.created = cdate;
if(body.password === body.saltPassword) {
    body.password = await bcrypt.hash(body.password, 10);
}else{
return res.status(401).json({ success: false, error: "confirm Password not match", data: null});
};//endif;
let nuser = new Users(body);
await nuser.save((err: any, result: any)=>{
if(err && err.code !== 11000) {
console.log(err);
console.log(`ErrorCode: ${err.code}`);
res.state(401).json({success: false, error: "Request Fail", data: null})
return;
};//endif;
if(err && err.code === 11000){
console.log(`User already exists: ${body.userName}`)
res.status(200).json({ success: false, error: "User is Exists try anathor userName", data: null})
return;
};//endif;

console.log(result)
res.status(200).json({ success: true, error: null, data: result});
});//endSave;
    }catch(err){
console.log(err);
res.status(401).json({success: false, error: err, data: null});
process.exit(1)
    }
});//endAddNewUser;

router.put('/:id', async (req: any, res: any, next: any)=>{
try{
const id = req.params.id;
if(!id){
console.log(`Error: User id is required`);
return res.status(401).json({success: false, error: "user id is required", data: null});
};//endif;

let isExists: any = await Users.findOne({_id: id});
if(!isExists){
console.log(`invalid user id`);
res.status(401).json({ success: false, error: "Invalid User Id", data: null});
return;
}else{
next();
};//endif;
 
}catch(err){
console.log(err);
res.status(401).json({success: false, error: err, data: null})
process.exit(1);
}
}, async (req: any, res: any)=>{
try {
const id = req.params.id;
let body: IUser = req.body;
console.log(`User Update id: ${id}`);
const cdate = new Date(Date.now());
body.updatedOn = cdate;

// await Users.findOneAndUpdate({_id: id}, {$set: body}, {upsert: true}, (err: any, result: IUser)=> {
await Users.updateOne({_id: id}, {$set: {...body}})
.then((result: any)=> {
console.log('updated user: ', result);
return res.status(200).json({ success: true, error: null, data: result});
}).catch((err: any) =>{
    console.log(err)
});//endUpdate;
}catch(err: any){
console.log(err);
res.status(401).json({ success: false, error: err, data: null});
process.exit(1);
}
});//endUpdate;

router.delete('/:id', async (req: any, res: any)=>{
try {
console.log(`delete user id: ${req.params.id}`);
const id = req.params.id;
return await Users.deleteOne({_id: id})
.then((result: any) => {
console.log(result);
return res.status(200).json({success: true, error: null, data: result});
}).catch((err: any)=>{
console.log(err);
});//endDeleteUserById;

return;}catch(err: any){
console.log(err);
res.status(401).json({ success: false, error: err, data: null});
process.exit(1);
}
});//endUserDelete;



export default router;