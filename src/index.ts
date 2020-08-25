import { UserForm } from './views/UserForm';
import { User } from './models/User';

const newUser = User.buildUser({ name: 'maciek', age: 28 });

const root = document.getElementById('root');

// type guard
if (root) {
	const userForm = new UserForm(root, newUser);
	userForm.render();
}
