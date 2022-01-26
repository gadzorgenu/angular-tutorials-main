import { Hero } from './../../Hero';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs";
import { HeroService } from "src/app/services/hero.service";
import { HeroesComponent } from "./heroes.component"

//testing a component that has both an injected service and a child component
describe('Heroes component(shallow test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService: any;
    let HEROES:Hero[] = [];

    beforeEach(() => {
        HEROES = [
            {id: 1, name:'Gii'},
            {id: 2, name:'Gina'}
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        
        TestBed.configureTestingModule({
            declarations:[HeroesComponent],
            // schemas:[NO_ERRORS_SCHEMA], //ignoring the child component
            providers: [
              {provide:HeroService, useValue: mockHeroService }  
            ]
        })

        fixture = TestBed.createComponent(HeroesComponent);
    });
    it('should set heroes correctly from the service',() => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(2)
    })

})