import { User } from './models/User';

const maciek = User.buildUser({ name: 'maciek', age: 28 });

maciek.save();

// new instance of User - my test approach
// const testUser = new User(
//    new Eventing(),
//     new Sync("http://localhost:1235/users"),
//     new Attributes<UserProps>({ name: "artur", age: 30})
// )
// testUser.save()
