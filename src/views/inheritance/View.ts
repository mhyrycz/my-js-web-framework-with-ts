import { Model } from '../../models/Model';

export abstract class View<T extends Model<K>, K> {
	public regions: { [key: string]: Element } = {};

	constructor(public parent: Element, public model: T) {
		this.model.on('change', () => {
			this.render();
		});
	}

	abstract template(): string;

	eventsMap(): { [key: string]: () => void } {
		return {};
	}

	regionsMap(): { [key: string]: string } {
		return {};
	}

	onRender(): void {}

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

	bindRegions(fragment: DocumentFragment) {
		const regionsMap = this.regionsMap();
		for (let key in regionsMap) {
			const selector = regionsMap[key];
			const element = fragment.querySelector(selector);
			if (element) {
				this.regions[key] = element;
			}
		}
	}

	render(): void {
		this.parent.innerHTML = '';
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement.content);
		this.bindRegions(templateElement.content);
		this.onRender();
		this.parent.append(templateElement.content);
	}
}
