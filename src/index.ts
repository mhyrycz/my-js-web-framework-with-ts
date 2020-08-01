import { User } from './models/User';

const user = new User({ id: 1, name: 'maciek', age: 28 });

user.events.on("check", ()=>{console.log("dupa")}) 

user.events.trigger("check")


