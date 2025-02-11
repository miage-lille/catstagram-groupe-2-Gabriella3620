// commands.ts
import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { Picture } from './types/picture.type';
import { FetchCatsRequest } from './types/actions.type';

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => {
      return fetch(action.path, {
        method: action.method,
      })
        .then(checkStatus)
        .then(parseResponse);
    },
    {
      successActionCreator: fetchCatsCommit, // (equals to (payload) => fetchCatsCommit(payload))
      failActionCreator: fetchCatsRollback, // (equals to (error) => fetchCatsCommit(error))
    },
  );

const checkStatus = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};

const parseResponse = (response: Response): Promise<Picture[]> => {
  return response.json().then(data => {
    return data.hits.map((hit: any) => ({
      previewFormat: hit.previewURL,
      webformatFormat: hit.webformatURL,
      author: hit.user,
      largeFormat: hit.largeImageURL,
    }));
  });
};