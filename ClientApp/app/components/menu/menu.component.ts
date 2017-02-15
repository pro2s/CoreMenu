import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../model/menu';

@Component({
    selector: '[Menu]',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    @Input() menu: Menu;

    constructor() { }
    
    /**
     * showComments
     */
    public showComments() {
        
    }

    ngOnInit() { }
}