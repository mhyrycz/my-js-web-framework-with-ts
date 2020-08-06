import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<K, T> {
	private collection: K[] = [];
	private events: Eventing = new Eventing();

	constructor(private rootUrl: string, private builder: (x: T) => K) {}

	get trigger() {
		return this.events.trigger;
	}

	get on() {
		return this.events.on;
	}

	getAll(): K[] {
		return this.collection;
	}

	fetch(): void {
		axios.get(`${this.rootUrl}`).then((response: AxiosResponse) => {
			response.data.forEach((element: T) => {
				const newElement = this.builder(element);
				this.collection.push(newElement);
			});
			this.trigger('collection fetched');
		});
	}
}
