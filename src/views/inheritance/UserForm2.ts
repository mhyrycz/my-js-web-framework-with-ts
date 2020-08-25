import { View } from './View';
import { User } from '../../models/User';

export class UserForm2 extends View<User> {
	eventsMap(): { [key: string]: () => void } {
		return {
			//'click:.set-age': this.onSetAgeClick.bind(this)
			'click:.set-age': this.onSetAgeClick,
			'click:.set-name': this.onSetNameClick
		};
	}

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
                <div>${this.model.get('name')}</div>
                <div>${this.model.get('age')}</div>
                <input />
                <button class='set-name'>Change name</button>
                <button class='set-age'>set random age</button>
            </div>
        `;
	}

	bindEvents(templateElement: DocumentFragment): void {
		const eventsMap = this.eventsMap();
		// for (let eventKey of Object.keys(eventsMap)) is correct too
		for (let eventKey in eventsMap) {
			const [ eventName, selector ] = eventKey.split(':');
			templateElement.querySelectorAll(selector).forEach((element) => {
				element.addEventListener(eventName, eventsMap[eventKey]);
			});
		}
	}

	render(): void {
		this.parent.innerHTML = '';
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement.content);
		this.parent.append(templateElement.content);
	}
}
