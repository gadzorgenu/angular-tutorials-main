import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { HeroService } from './../../services/hero.service';
import { Hero} from '../../Hero'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[] = [];
  // selectedHero?: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  getHeroes() : void{
    //The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    );
  }

}
