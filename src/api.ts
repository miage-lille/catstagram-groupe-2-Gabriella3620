import { Loading, Success, Failure } from './types/api.type';
import { Picture } from './types/picture.type';

export const loading = (): Loading => ({ type: 'Loading' });
export const success = (pictures: Picture[]): Success => ({ type: 'Success', pictures });
export const failure = (error: string): Failure => ({ type: 'Failure', error });