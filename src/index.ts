import { UserProps, User } from './models/User';
import { Collection } from './models/Collection';

// const maciek = User.buildUser({ name: 'maciek', age: 28 });

// maciek.save();

const dataCollection = User.buildUserCollection()

dataCollection.on('collection fetched', () => {
	console.log(dataCollection.getAll());
});

dataCollection.fetch();

// new instance of User - my test approach
// const testUser = new User(
//    new Eventing(),
//     new Sync("http://localhost:1235/users"),
//     new Attributes<UserProps>({ name: "artur", age: 30})
// )
// testUser.save()
