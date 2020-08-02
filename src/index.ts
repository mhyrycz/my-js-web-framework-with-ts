import { User } from './models/User';

const user = new User({ id: 1, name: 'maciek', age: 28 });

user.events.on('check', () => {
	console.log('check event');
});

user.events.trigger('check');

console.log(user.attributes.get('name'));
