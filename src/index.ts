import { UserForm2 } from './views/inheritance/UserForm2';
import { User } from './models/User';

const newUser = User.buildUser({ name: 'maciek', age: 28 });

const root = document.getElementById('root');

// type guard
if (root) {
	const htmlRenderer = new UserForm2(root, newUser);
	htmlRenderer.render();
}
