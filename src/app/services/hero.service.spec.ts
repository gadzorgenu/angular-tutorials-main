import { MessageService } from './message.service';
import { TestBed, inject } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('HeroService', () =>{
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let heroService: HeroService;


    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageService }
            ]
        })

        //A method that access the dependency injection registry
        httpTestingController = TestBed.inject(HttpTestingController);
        heroService = TestBed.inject(HeroService); //getting a handle to a service

        //Ways of getting a handle to a service
        // TestBed.inject or through the inject module

    })

    describe('getHero', () => {
        // it('should call get with the correct url', inject(
        //     [HeroService, HttpTestingController], 
        //     (service:HeroService, controller: HttpTestingController)=> {
        //     //call getHero()
        //     service.getHero(4); //different approach to getting a handle to a service

        //     //test that the url was correct
        //     // controller.
        // }))

        it('should call get with correct url',() => {
            heroService.getHero(3).subscribe( hero =>{
                expect(hero.id).toBe(3);
            });
        
            const req = httpTestingController.expectOne('api/heroes/3')
            req.flush({id: 3, name:'Sweetie'})
            expect(req.request.method).toBe('GET')
            httpTestingController.verify();

        })
   })

    describe('getHeroes', () => {

        it('should call get with correct url',() => {
            heroService.getHeroes().subscribe();
        
            const req = httpTestingController.expectOne('api/heroes')
            expect(req.request.method).toBe('GET')
            httpTestingController.verify();

        })
   })

   

})