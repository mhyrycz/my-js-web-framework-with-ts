import { UserEdit } from './views/inheritance/UserEdit';
import { User } from './models/User';

const newUser = User.buildUser({ name: 'maciek', age: 28 });

const root = document.getElementById('root');

// type guard
if (root) {
	const htmlRenderer = new UserEdit(root, newUser);
	htmlRenderer.render();
}
