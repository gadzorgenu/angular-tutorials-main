import { HeroService } from '../../services/hero.service';
import { HeroesComponent } from './heroes.component';
import { Hero } from 'src/app/Hero';
import { HEROES } from 'src/app/mock-heroes';
import { of } from 'rxjs';


describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HeroService: HeroService;
    let heroes:Hero[]  = HEROES; // mock object
    let mockHeroService: any;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj('HeroService',['getHeroes', 'addHero','deleteHero'])

        component =  new HeroesComponent(mockHeroService);
    })

    describe('delete',() => {

        it('should remove a hero from from the heroes list' , ()=>{
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = heroes;

            component.deleteHero(heroes[2]);

            expect(component.heroes.length).toBe(14);
        })

        it('should call delete Hero',()=> {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = heroes;

            component.deleteHero(heroes[2]);
            expect(mockHeroService.deleteHero).toHaveBeenCalled();
            // expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
        })

        // it('should subscribe to the delete hero call', () => {
        //     mockHeroService.deleteHero.and.returnValue(of(true));
        //     component.heroes = heroes;

        //     component.deleteHero(heroes[2]);
        //     expect(mockHeroService.deleteHero.subscribe).toHaveBeenCalled()
        // })

    })
})