import { Hero } from './../../Hero';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() hero!: Hero;
  @Output() delete = new EventEmitter();
   
  onDeleteClick($event: any) : void{
    $event.stopPropagation();
    this.delete.next;
  }

}
