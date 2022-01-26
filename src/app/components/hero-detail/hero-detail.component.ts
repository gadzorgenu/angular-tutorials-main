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
  
  @Input() hero?: Hero | undefined;

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
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    //the + sign is used to cast a string to a number
    // const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  save_():void {
    this.debounce(() => {
      if(this.hero){
          this.heroService.updateHero(this.hero).
          subscribe(()=> this.goBack())
        }
      }, 250, false)();
  }

  save():void {
    this.somethirdPartyPromise().then(() => {
      if(this.hero){
          this.heroService.updateHero(this.hero).
          subscribe(()=> this.goBack())
        }
      });
  }

  somethirdPartyPromise(){
    return new Promise((resolve) => {
      resolve(null)
    })
  }


  debounce(func: any, wait:any, immediate: any){
    var timeout:any;

    return  () => {
      var context = this, args = arguments;
      var later = function () {
        timeout = null ;
        if (!timeout) func.apply(context,args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if( callNow) func.apply(context,args)
      
    }
    
  }

}
