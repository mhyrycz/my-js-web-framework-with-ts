import { User } from './models/User';

const user = new User({ id: 1, name: 'maciek', age: 28 });

user.on('change', () => {
	console.log(user);
});

// user.set({name: "maciek piotr"});

user.save();

user.fetch();
