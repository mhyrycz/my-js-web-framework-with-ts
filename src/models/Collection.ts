import axios, { AxiosResponse } from 'axios';

interface EventingAttributes {
	on(eventName: string, callback: () => void): void;
	trigger(eventName: string): void;
}

export class Collection<K, T> {
	private collection: K[] = [];

	constructor(private events: EventingAttributes, private rootUrl: string, private builder: (x: T) => K) {}

	getAll(): K[] {
		return this.collection;
	}

	fetch(): void {
		axios.get(`${this.rootUrl}`).then((response: AxiosResponse) => {
			response.data.forEach((element: T) => {
				const newElement = this.builder(element);
				this.collection.push(newElement);
			});
			console.log(this.collection);
		});
	}
}
