import { View } from './View';
import { User, UserProps } from '../../models/User';
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';

export class UserEdit extends View<User, UserProps> {
	regionsMap(): { [key: string]: string } {
		return {
			userForm: '.user-form',
			userShow: '.user-show'
		};
	}

	onRender(): void {
		new UserShow(this.regions.userShow, this.model).render();
		new UserForm(this.regions.userForm, this.model).render();
	}

	template(): string {
		return `
            <div class='user-show'></div>
            <div class='user-form'></div>
        `;
	}
}
