import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'editmenu',
    templateUrl: './editmenu.component.html'
})
export class EditMenuComponent implements OnInit {
    public text: String;
    constructor() { 
        this.text = 'old menu';
    }
    
    /**
     * update
     */
    public update() {
        this.text = 'new menu';
    }

    ngOnInit() { }
}