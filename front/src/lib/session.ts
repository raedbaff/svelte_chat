import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
export interface User {
  _id?:string;
  name: string;
  LastName: string;
  email: string;
  // Add other user-related fields
}

export interface SessionStore {
  user: User | null;
}

export const session: Writable<SessionStore> = writable({
  user: null,
  // Add other initial properties if needed
});