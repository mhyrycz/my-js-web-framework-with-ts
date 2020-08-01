import { User } from './models/User';

const user = new User({ name: 'maciek', age: 28 });

console.log(user.get('age'));

user.set({ age: 29 });

console.log(user.get('age'));

console.log(user.get('name'));

user.on('change', () => {
	console.log('Change #1');
});

user.on('change', () => {
	console.log('Change #2');
});

user.trigger('change');