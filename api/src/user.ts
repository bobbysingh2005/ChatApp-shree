import {Schema, model, Model, Document, Types} from 'mongoose';

export interface IUser extends Document {
userName: string;
password: string;
saltPassword: string;
role?: string;
email?: string;
contact?: string;
firstName?: string;
lastName?: string;
dateOfBirth: Date;
address?: string;
city?: string;
state?: string;
country?: string;
created: Date;
lastAccess: Date;
updatedOn: Date;
};//endInterface;

const UserSchema: Schema = new Schema({
userName: { type: String, unique: true, required: true, lowercase: true},
password: { type: String, require: true },
saltPassword: { type: String, required: true },
role: String,
email: String,
contact: String,
firstName: String,
dateOfBirth: { type: Date, default: new Date()},
lastName: String,
address: String,
city: String,
state: String,
country: String,
created: { type: Date, default: new Date()},
lastAccess: { type: Date, default: new Date()},
updatedOn: { type: Date, default: new Date()}
}, { versionKey: false});

const Users: Model<IUser> = model('users', UserSchema);

export default Users;