import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const handleError = <T>(operation = 'operation', result?: T)
  : (error: any) => Observable<T> => {
  return (error: any): Observable<T> => {
    console.log(error);
    return of(result as T);
  };
};

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// const url = 'https://api.myjson.com/bins/ck44c';
const API_URL = 'http://localhost:9428/api/';
// const API_URL = 'https://api.otakedev.com/api/';

export {
  // consts
  HTTP_OPTIONS,
  API_URL,
  // functions
  handleError
};
