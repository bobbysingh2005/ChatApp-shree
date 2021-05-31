// import {Schema, model, models, Model, Document} from 'mongoose';

// export interface IUser extended Document {
// user: string;
// password: string;
// saltPassword: string;
// role: string;
// email: string;
// contact: string;
// firstName: string;
// lastName: string;
// altEmail: string;
// altContact: number;
// dateOfBirth: Date;
// address: string;
// city: string;
// state: string;
// country: string;
// createdOn: Date;
// modifyedOn: Date;
// lastAccess: Date;
// };//endInterface;

// const UserSchema: Schema = new Schema({
// user: { type: String, required: true},
// password: { type: String, required: true},
// saltPassword: {type: String, required: true},
// role: { type: String, required: true},
// email: { type: String, required: true},
// contact: {type: Number},
// firstName: String,
// lastName: String,
// altEmail: String,
// altContact: Number,
// dateOfBirth: { type: Date, default: Date(Date.now)},
// address: String,
// city: String,
// state: String,
// country: String,
// createdOn: { type: Date, default: Date(Date.now)},
// modifyedOn: { type: Date, default: Date(Date.now)},
// lastAccess: { type: Date, default: Date(Date.now)}
// });


// export const Users = model('users', UserSchema);


// export default {
//     Users
// }