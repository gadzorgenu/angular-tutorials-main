    import { HeroService } from '../../services/hero.service';
import { HeroesComponent } from './heroes.component';
import { Hero } from 'src/app/Hero';
import { HEROES } from 'src/app/mock-heroes';
import { of } from 'rxjs';


describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HeroService: HeroService;
    // let heroes:Hero[]  = HEROES; // mock object
    let heroes : any;
    let mockHeroService: any;

    beforeEach(() => {
        heroes = [
            {id: 1, name:'Gii'},
            {id: 2, name:'Gina'},
        ]

        mockHeroService = jasmine.createSpyObj(HeroService,['getHeroes', 'addHero','deleteHero'])

        component =  new HeroesComponent(mockHeroService);
        component.heroes = heroes;

    })

    describe('delete',() => {

        it('should remove a hero from the heroes list' , ()=>{
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.delete(heroes[1]);

            expect(component.heroes.length).toBe(1);
        })

        it('should call delete Hero',()=> {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = heroes;

            component.delete(heroes[1]);
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

    describe('get',() =>{
        // it('should get all heroes from the heroes list', () => {
        //     mockHeroService.getHeroes.and.returnValue(of(true));

        //     expect(component.heroes.length).toBe(16);
        // })

        // it('should call getHeroes method', () => {
        //     mockHeroService.getHeroes.and.returnValue(of(true));

        //     // expect(mockHeroService.getHeroes).toHaveBeenCalledTimes(1);
        // })
    })

    describe('add',() => {

        it('should add a hero to the heroes list',() => {
            mockHeroService.addHero.and.returnValue(of(true));

            component.add('Giiiinaa')
            expect(component.heroes.length).toEqual(3)
        })
    })
})