import { UserForm } from './views/UserForm';
import { User } from './models/User';

const newUser = User.buildUser({ name: 'maciek', age: 28 });

const userForm = new UserForm(document.getElementById('root'), newUser);

userForm.render();
