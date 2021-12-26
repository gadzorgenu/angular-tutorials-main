import { HeroService } from './../../services/hero.service';
import { Component, Input, OnInit } from '@angular/core';
import {Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../Hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  
  @Input() hero?: Hero;

  constructor(
    //holds information about the route to this instance of the HeroDetailComponent
    private route:ActivatedRoute,
    private heroService: HeroService,

    // an Angular service for interacting with the browser. 
    private location: Location

  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void{
    //extracting the hero id from the route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  save():void {
    if(this.hero){
      this.heroService.updateHero(this.hero).
      subscribe(()=> this.goBack())
    }
  }

}
