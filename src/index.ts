import { User } from './models/User';

const user = new User({ id: 1, name: 'maciek', age: 28 });

user.on('check', () => {
	console.log('check event');
});

user.trigger('check');

user.get('id');
