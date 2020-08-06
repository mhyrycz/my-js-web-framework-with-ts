import { AxiosResponse, AxiosPromise } from 'axios';

export interface ModelAttributes<T> {
	set(update: T): void;
	get<K extends keyof T>(key: K): T[K];
	getAll(): T;
}

interface SyncAttributes<T> {
	fetch(id: number): AxiosPromise;
	save(data: T): AxiosPromise;
}

interface EventingAttributes {
	on(eventName: string, callback: () => void): void;
	trigger(eventName: string): void;
}

interface HasId {
	// weakness of Typescript - optional arguments
	id?: number;
}

export class Model<T extends HasId> {
	constructor(
		//option2
		private events: EventingAttributes,
		private sync: SyncAttributes<T>,
		private attributes: ModelAttributes<T>
	) {}

	// accessors
	get on() {
		return this.events.on;
	}

	// Shortened Passthrough Methods - 
	//it will works only if property is assigned and created from constructor property.
	trigger = this.events.trigger;

	get get() {
		return this.attributes.get;
	}

	set(update: T): void {
		this.attributes.set(update);
		this.events.trigger('change');
	}

	fetch(): void {
		const id = this.attributes.get('id');

		if (typeof id !== 'number') {
			throw new Error('Cannot fetch without id.');
		}

		this.sync.fetch(id).then((response: AxiosResponse): void => {
			this.attributes.set(response.data);
		});
	}

	save(): void {
		this.sync
			.save(this.attributes.getAll())
			.then((response: AxiosResponse) => {
				this.trigger('change');
			})
			.catch(() => {
				this.trigger('error');
			});
	}
}

//Re-integrating Eventing
// Option1
// Accept dependencies as second constructor argument
// new Model({id: 1}, new Eventing())
// Option2
// create new Eventing instance withing Model constructor or with var declaration
// Option3
// Add static method creating new instance of Model with events var in constructor and setting Model data with this.set()

//Re-integrating Sync
// Option1
// Sync methods get function arguments
// It will be related only to Model class (bada approach)
// Option2
// Sync expects arguments that satisfy interfaces Serialize(save) and Deserialize(fetch)
// Option3
// Creating Sync as generic class
