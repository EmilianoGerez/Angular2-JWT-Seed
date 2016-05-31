export class User {
  _id:string;
  firstName:string;
  lastName:string;
  email:string;
  oldPassword:string;
  password:string;
  active:boolean;
  sessions:Array<string>;
  role:string;
}
