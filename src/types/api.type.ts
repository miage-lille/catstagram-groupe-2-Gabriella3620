import { Picture } from "./picture.type";

export type Loading = { type: 'Loading' };
export type Success = { type: 'Success', pictures: Picture[] };
export type Failure = { type: 'Failure', error: string };

export type ApiStatus = 
| Loading | Success | Failure;