import { HttpClient, HttpErrorResponse }      from '@angular/common/http';
import { Injectable }                         from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { INaturalPerson }                     from '../models/INaturalPerson';

@Injectable({
  providedIn: 'root'
})
export class NaturalPersonService {

  private serverURL:string = `http://localhost:9000`; // json-server (URL).

  constructor(private httpClient: HttpClient) { }

  // [GET]
  public getNaturalPersonsAll():Observable<INaturalPerson[]> {
    let dataURL:string = `${this.serverURL}/natural-person`;
    return this.httpClient.get<INaturalPerson[]>(dataURL).pipe(catchError(this.handleError));
  }

  // [GET]
  public getNaturalPerson(reference:string):Observable<INaturalPerson> {
    let dataURL:string = `${this.serverURL}/natural-person/${reference}`;
    return this.httpClient.get<INaturalPerson>(dataURL).pipe(catchError(this.handleError));
  }

  // [POST]
  public create(naturalPerson:INaturalPerson):Observable<INaturalPerson> {
    let dataURL:string = `${this.serverURL}/natural-person`;
    return this.httpClient.post<INaturalPerson>(dataURL, naturalPerson).pipe(catchError(this.handleError));
  }

  // [PUT]
  public update(naturalPerson:INaturalPerson, reference:string):Observable<INaturalPerson> {
    let dataURL:string = `${this.serverURL}/natural-person/${reference}`;
    return this.httpClient.put<INaturalPerson>(dataURL, naturalPerson).pipe(catchError(this.handleError));
  }

  // [DELETE]
  public delete(reference:string):Observable<{}> {
    let dataURL:string = `${this.serverURL}/natural-person/${reference}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

  // [Handle: Error]
  public handleError(error:HttpErrorResponse) {
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent) {
      // Client Error.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server Error.
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
