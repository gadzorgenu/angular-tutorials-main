import { HeroComponent } from './hero.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow tests)',() => {
    let fixture: ComponentFixture<HeroComponent>; // a wrapper for a component

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        });
        //Creating the component
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have correct hero',() => {
        fixture.componentInstance.hero = {id: 1,name: 'Giii'};

        expect(fixture.componentInstance.hero.name).toEqual('Giii')
    })

    it('should render a hero name',() => {
        fixture.componentInstance.hero ={id: 1,name: 'Giii'};
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('a'))
        // expect(de.nativeElement.textContent).toContain('Giii')

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Giii')
    })
})