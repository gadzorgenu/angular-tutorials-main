import { StrengthPipe } from './strength.pipe';

describe("Strength pipe", () => {
    it('should display weak if strength is 5', ()=> {
        let pipe = new StrengthPipe();

        // let val = pipe.transform(5)

        expect(pipe.transform(5)).toEqual('5 (weak)');
    })

    it('should display strong if strength is 10',() => {
        let pipe = new StrengthPipe();
        expect(pipe.transform(10)).toEqual('10 (strong)');
    })
})