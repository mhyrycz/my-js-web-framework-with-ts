import { Model } from './Model';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { Collection } from './Collection';

const rootUrl = 'http://localhost:1235/users';

export interface UserProps {
	// optional props in interface
	id?: number;
	name?: string;
	age?: number;
}

// new instance of User with static method
export class User extends Model<UserProps> {
	static buildUser(attrs: UserProps): User {
		return new User(new Eventing(), new Sync(rootUrl), new Attributes(attrs));
	}

	static buildUserCollection(): Collection<User, UserProps> {
		return new Collection<User, UserProps>(rootUrl, User.buildUser);
	}

	setRandomAge(): void{
		const age = Math.round(Math.random()*100)
		this.set({age})
	}
}

// new instance of User - my test approach
// export class User extends Model<UserProps> {
//     constructor(
//         events: Eventing,
//         sync: Sync<UserProps>,
//         attributes: Attributes<UserProps>
//     ){
//         super(events, sync, attributes)
//     }
// }
