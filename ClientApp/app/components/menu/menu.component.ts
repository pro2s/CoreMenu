import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../../model/menu';

@Component({
    selector: '[Menu]',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    @Input() menu: Menu;
    @Input() editable: Boolean = false;
    @Input() showRating: Boolean = true;
    @Input() showComment: Boolean = true;
    @Output() delete:EventEmitter<Number> = new EventEmitter();
    @Output() edit:EventEmitter<Number> = new EventEmitter();
    
    constructor() { 
    }
    
    /**
     * showComments
     */
    public showComments() {
        
    }

    ngOnInit() { 
    }
}