export class UserForm {
	constructor(public parent: Element) {}

	eventsMap(): { [key: string]: () => void } {
		return {
			'click:button': this.onButtonClick,
			'mouseenter:h1': function() {
				console.log('enter');
			}
		};
	}

	onButtonClick(): void {
		console.log('button click text');
	}

	template(): string {
		return `
            <div>
                <h1> User Form</h1>
                <button>Click me</button>
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
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement.content);
		this.parent.append(templateElement.content);
	}
}
