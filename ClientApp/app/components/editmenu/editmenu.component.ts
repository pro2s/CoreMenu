import { Component, OnInit } from '@angular/core';
import { Menu } from '../../model/menu';
import { Http } from '@angular/http';
import { Message } from '../../model/system';

@Component({
    selector: 'editmenu',
    templateUrl: './editmenu.component.html'
})
export class EditMenuComponent implements OnInit {
    public menus: Menu[];
    private message: Message;
    private http;
    constructor(http: Http,) { 
        this.http = http;
        this.message = { text: '', isError: false, detail:'', errors:[] };
        this.getMenu();
    }
    
    /**
     * update
     */
    public update() {
        this.getMenu();
    }

    public getMenu() {
        this.http.get('/api/menu/menus').subscribe(
            result => {
                this.menus = result.json() as Menu[];
            }, error => {
                this.message = error.json() 
            }
        );  
    }

    ngOnInit() { }
}