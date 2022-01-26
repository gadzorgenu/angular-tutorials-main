import { HeroComponent } from './../hero/hero.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs"
import { Hero } from "src/app/Hero";
import { HeroService } from "src/app/services/hero.service";
import { HeroesComponent } from "./heroes.component";
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    // listen to the click event on the parent DOM node and when fired, called the onClick method
    host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HeroesComponent (deep integration)', () => {
    let mockHeroService: any;
    let fixture: ComponentFixture<HeroesComponent>
    let heroes: Hero[] =[];

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        heroes = [
            {id: 1, name:'Gii'},
            {id: 2, name:'Gina'}
        ]

        TestBed.configureTestingModule({
            declarations:[HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            schemas:[NO_ERRORS_SCHEMA], //ignoring the child component
            providers: [
              {provide:HeroService, useValue: mockHeroService }  
            ]
        })

        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(heroes))
        fixture.detectChanges();
    })

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(heroes));

        //run ngOnInit
        fixture.detectChanges();

        //heroComponentDEs = heroComponent debug elements
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(2);
        for(let i = 0; i < heroComponentDEs.length; i++){
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(heroes[i]);
        }
    })

    
    it(`should call heroService.deleteHero when 
        the Hero Component's delete button is clicked`, () => {
            //watching to see if the delete method is invoked
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(heroes))

            fixture.detectChanges();

            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            
            //Adding the return type
            // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined)

            //trigering the delete event
            heroComponents[0].triggerEventHandler('delete', null)
            
            // heroComponents[0].query(By.css('button'))
            //     .triggerEventHandler('button', {stopPropagation: () => {}});

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0])
        })

    it('should add a  new hero to the list when the add button is clicked', ()=>{
        mockHeroService.getHeroes.and.returnValue(of(heroes));

        fixture.detectChanges();

        mockHeroService.addHero.and.returnValue(of({id: 3, name: 'Georgina'}))

        const inputElem = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElem.value  = "Georgina";
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        //verifying that the hero name is part of the resulting html
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain('Georgina')

    })

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(heroes));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub)

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
        expect(routerLink.navigatedTo).toBe('/detail/1')
    })
})