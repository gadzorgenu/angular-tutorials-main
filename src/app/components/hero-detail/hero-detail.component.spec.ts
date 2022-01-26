import { FormsModule } from '@angular/forms';
import { HeroService } from './../../services/hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from "@angular/core/testing"
import {Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {
    let fixture : ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService: any, mockLocation;

    beforeEach(() => {
        mockActivatedRoute ={
            snapshot: {paramMap: { get: () => {return '3';}}}
        }
        mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent ],
            imports:[FormsModule],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation}
            ]
        })
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id: 4, name:'Ginaa'}))
    })

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges()
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('GINAA');
    });

    it('should call updatedHero when save_ is called',fakeAsync( () =>{
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save_();
        flush();// checks to see waiting tasks and fast forwards the clock to execute them all

        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }))

    it('should call updatedHero when save is called',waitForAsync( () =>{
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        fixture.whenStable().then(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        });
    }))
})