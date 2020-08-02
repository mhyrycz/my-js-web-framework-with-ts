export class Attributes<T> {
	constructor(private data: T) {}

	//function contraint - keys of interface
	get<K extends keyof T>(key: K): T[K] {
		return this.data[key];
	}

	set(update: T): void {
		this.data = Object.assign(this.data, update);
	}
}

//Options for get("id" | "number")
// Type assertion `id = attrs.get("name") as id`
//or
// Type guard `if(id===numer){}`
// or
// Type may be string, all object keys are strings
// so
// keyof T -> attrs.get('name) -> type string
