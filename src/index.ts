import { UserProps, User } from './models/User';
import { Eventing } from './models/Eventing';
import { Collection } from './models/Collection';

// const maciek = User.buildUser({ name: 'maciek', age: 28 });

// maciek.save();

const dataCollection = new Collection<User, UserProps>(new Eventing(), 'http://localhost:1235/users', User.buildUser);

dataCollection.fetch();

console.log(dataCollection.getAll());

// new instance of User - my test approach
// const testUser = new User(
//    new Eventing(),
//     new Sync("http://localhost:1235/users"),
//     new Attributes<UserProps>({ name: "artur", age: 30})
// )
// testUser.save()
