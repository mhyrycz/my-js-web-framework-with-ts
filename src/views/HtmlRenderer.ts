interface CustomInterface {
	eventsMap(): { [key: string]: () => void };
	template(): string;
	on(eventName: string, callback: () => void): void;
	parent: Element;
}

export class HtmlRenderer<K extends CustomInterface> {
	constructor(public customRenderer: K) {
		this.customRenderer.on('change', () => {
			this.render();
		});
	}

	bindEvents(templateElement: DocumentFragment): void {
		const eventsMap = this.customRenderer.eventsMap();
		// for (let eventKey of Object.keys(eventsMap)) is correct too
		for (let eventKey in eventsMap) {
			const [ eventName, selector ] = eventKey.split(':');
			templateElement.querySelectorAll(selector).forEach((element) => {
				element.addEventListener(eventName, eventsMap[eventKey]);
			});
		}
	}

	render(): void {
		this.customRenderer.parent.innerHTML = '';
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.customRenderer.template();
		this.bindEvents(templateElement.content);
		this.customRenderer.parent.append(templateElement.content);
	}
}
