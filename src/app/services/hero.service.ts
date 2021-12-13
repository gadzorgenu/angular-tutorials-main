import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../Hero';
import {HEROES} from '../mock-heroes'

//The @Injectable() decorator accepts a metadata object for the service
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    const heroes = of(HEROES);
    this.messageService.add("HeroService:  fetched heroes")
    return heroes;
  }
}
