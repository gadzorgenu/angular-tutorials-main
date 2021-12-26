import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../Hero';
import {HEROES} from '../mock-heroes'
import { HttpClient, HttpHeaders } from '@angular/common/http';

//The @Injectable() decorator accepts a metadata object for the service
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'
  httpOptions ={
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  getHeroes(): Observable<Hero[]>{
    //GET heroes from the server
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }

  /**
   * GET hero by id. Will 404 if id not found 
   * @param id - id of hero to be fetched
   * @returns returns an Observable<Hero>
   */
  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero with id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    // const hero = HEROES.find( h => h.id === id)!;
    // this.log(`fetched hero id=${id}`);
    
    // //returning a mock hero as an observable
    // return of(hero);
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T){
    return(error: any) : Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }


  /**
   * Function to update hero object
   * @param hero : data to be updated
   * @returns an observable
   */
  updateHero(hero: Hero) : Observable<any>{
    return this.http.put(this.heroesUrl, hero,
      this.httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updated Hero'))
      );
  }

  /**
   * Add hero to the hero list
   * @param hero 
   * expects the server to generate an id for the new hero, which it returns in the Observable<Hero> to the caller. 
   */
  addHero(hero: Hero) : Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  } 

  /**
   * Function to delete hero from the server
   * @param id hero id
   */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap( _ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

}
