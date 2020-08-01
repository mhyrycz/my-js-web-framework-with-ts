import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

interface UserProps {
	// optional props in interface
	id?: number;
	name?: string;
	age?: number;
}

export class User {
	//option2
	events: Eventing = new Eventing();

	constructor(private data: UserProps) {}

	get(propName: string): string | number {
		return this.data[propName];
	}

	set(update: UserProps): void {
		this.data = Object.assign(this.data, update);
	}

	fetch(): void {
		axios.get(`http://localhost:3000/users/${this.get('id')}`).then((response: AxiosResponse): void => {
			this.set(response.data);
		});
	}

	save(): void {
		const id = this.get('id');
		if (id) {
			axios.put(`http://localhost:3000/users/${id}`, this.data);
		} else {
			axios.post(`http://localhost:3000/users`, this.data);
		}
	}
}

//Re-integrating eventing
// Option1
// Accept dependencies as second constructor argument
// new User({id: 1}, new Eventing())
// Option2
// create new Eventing instance withing User constructor or with var declaration
// Option3
// Add static method creating new instance of User with events var in constructor and setting user data with this.set()
