import { User } from '../models/User';

export class UserForm {
	constructor(public parent: Element, public model: User) {}

	get on() {
		return this.model.on;
	}

	eventsMap(): { [key: string]: () => void } {
		return {
			//'click:.set-age': this.onSetAgeClick.bind(this)
			'click:.set-age': this.onSetAgeClick,
			'click:.set-name': this.onSetNameClick
		};
	}

	onSetNameClick = (): void => {
		const input = this.parent.querySelector('input');
		//HTMLInputElement | null -> type guard
		if (input) {
			const name = input.value;
			this.model.set({ name });
		}
	};

	// 'this' would be undefined if you invoke this function inside for loop,
	//that's why we use function declaration here instead of function expression
	onSetAgeClick = (): void => {
		this.model.setRandomAge();
	};

	template(): string {
		return `
            <div>
                <h1> User Form</h1>
                <div>${this.model.get('name')}</div>
                <div>${this.model.get('age')}</div>
                <input />
                <button class='set-name'>Change name</button>
                <button class='set-age'>set random age</button>
            </div>
        `;
	}
}
