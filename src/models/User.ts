import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

export interface UserProps {
	// optional props in interface
	id?: number;
	name?: string;
	age?: number;
}

export class User {
	//option2
	events: Eventing = new Eventing();
	sync: Sync<UserProps> = new Sync<UserProps>('http://localhost:3000/users');
	attributes: Attributes<UserProps>;

	constructor(private data: UserProps) {
		this.attributes = new Attributes<UserProps>(this.data);
	}
	// accessors
	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	get get() {
		return this.attributes.get;
	}
}

//Re-integrating Eventing
// Option1
// Accept dependencies as second constructor argument
// new User({id: 1}, new Eventing())
// Option2
// create new Eventing instance withing User constructor or with var declaration
// Option3
// Add static method creating new instance of User with events var in constructor and setting user data with this.set()

//Re-integrating Sync
// Option1
// Sync methods get function arguments
// It will be related only to User class (bada approach)
// Option2
// Sync expects arguments that satisfy interfaces Serialize(save) and Deserialize(fetch)
// Option3
// Creating Sync as generic class
