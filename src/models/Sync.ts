import axios, { AxiosPromise } from 'axios';

interface HasId {
	// weakness of Typescript - optional arguments
	id?: number;
}

export class Sync<T extends HasId> {
	constructor(public rootUrl: string) {}

	fetch(id: number): AxiosPromise {
		return axios.get(`${this.rootUrl}/${id}`);
	}

	//generic constraints
	save(data: T): AxiosPromise {
		const { id } = data;
		//tsconfig strict true (number | undefined)
		if (id) {
			return axios.put(`${this.rootUrl}/${id}`, data);
		} else {
			return axios.post(`${this.rootUrl}`, data);
		}
	}
}
