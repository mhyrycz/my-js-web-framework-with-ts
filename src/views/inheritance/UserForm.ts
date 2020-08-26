import { View } from './View';
import { User, UserProps } from '../../models/User';

export class UserForm extends View<User, UserProps> {
	eventsMap(): { [key: string]: () => void } {
		return {
			//'click:.set-age': this.onSetAgeClick.bind(this)
			'click:.set-age': this.onSetAgeClick,
			'click:.set-name': this.onSetNameClick,
			'click:.save-model': this.onSaveClick
		};
	}

	onSaveClick = (): void => {
		this.model.save();
	};

	// 'this' would be undefined if you invoke this function inside for loop,
	//that's why we use function declaration here instead of function expression
	onSetAgeClick = (): void => {
		this.model.setRandomAge();
	};

	onSetNameClick = (): void => {
		const input = this.parent.querySelector('input');
		//HTMLInputElement | null -> type guard
		if (input) {
			const name = input.value;
			this.model.set({ name });
		}
	};

	template(): string {
		return `
            <div>
                <h1> User Form</h1>
                <input placeholder="${this.model.get('name')}"/>
                <button class='set-name'>Change name</button>
                <button class='set-age'>Set random age</button>
                <button class='save-model'>Save</button> 
            </div>
        `;
	}
}
