import { writable } from 'svelte/store';

interface FormStore {
	[key: string]: {
		fieldId: string;
		fieldName: string;
	};
}

export const formStore = writable<FormStore>({});
