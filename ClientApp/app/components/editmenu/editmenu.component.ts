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
    }


    ngOnInit() { }
}