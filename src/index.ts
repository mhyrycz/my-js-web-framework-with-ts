import { UserForm } from './views/inheritance/UserForm';
import { User } from './models/User';

const newUser = User.buildUser({ name: 'maciek', age: 28 });

const root = document.getElementById('root');

// type guard
if (root) {
	const htmlRenderer = new UserForm(root, newUser);
	htmlRenderer.render();
}
