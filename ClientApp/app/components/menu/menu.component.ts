import { Component, OnInit } from '@angular/core';
import { Menu } from '../../model/menu';

@Component({
    moduleId: module.id,
    selector: 'menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    public menu: Menu;

    constructor() { }
    
    /**
     * showComments
     */
    public showComments() {
        
    }

    ngOnInit() { }
}