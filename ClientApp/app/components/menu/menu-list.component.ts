import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../model/menu';
import { Http } from '@angular/http';
import { Message } from '../../model/system';

@Component({
    selector: 'menu-list',
    templateUrl: 'menu-list.component.html'
})
export class MenuListComponent implements OnInit {
    @Input() editable: Boolean = false;
    @Input() columns: Number = 4;
        
    private message: Message;
    public menus: Menu[];
    private http: Http;

    constructor(http: Http) {
        this.http = http;
        this.getMenu();
    }

    public getColumns() {
        if (this.columns != 0) {
            return this.columns;
        }
        else 4;
    }

    public update() {
        this.menus = [] as Menu[];
        this.getMenu() ;
    }

    public deleteMenu(id) {
        console.log('Delete');
    }
    
    public editMenu(id) {
        console.log('Edit');
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