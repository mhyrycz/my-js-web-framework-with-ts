interface CustomInterface {
	on(eventName: string, callback: () => void): void;
}

export abstract class View<T extends CustomInterface> {
	abstract eventsMap(): { [key: string]: () => void };
	abstract template(): string;

	constructor(public parent: Element, public model: T) {
		this.model.on('change', () => {
			this.render();
		});
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
