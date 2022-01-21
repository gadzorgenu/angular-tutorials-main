import { MessageService } from './message.service';
describe('MessageService',() =>{
    let service: MessageService

    beforeEach(() => {
        // service = new MessageService()

    })

    it('should have no message to start', ()=> {
        service = new MessageService()

        expect(service.messages.length).toBe(0)
    })

    it('should add a message when add is called', ()=>{
        //arrange
        service = new MessageService()
        //act
        service.add('Message 1');
        //expect
        expect(service.messages.length).toBe(1)
    })


    it('should remove all message when clear is called', ()=>{
        service = new MessageService()
        service.add('Message 1');

        service.clear()
        expect(service.messages.length).toBe(0);
    })


})