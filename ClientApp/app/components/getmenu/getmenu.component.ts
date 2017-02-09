import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'getmenu',
    templateUrl: './getmenu.component.html'
})

export class GetMenuComponent {
    public services: MenuService[];
    constructor(http: Http) {
        http.get('/api/parser/services').subscribe(result => {
            this.services = result.json() as MenuService[];
        });
    }
}

interface MenuService {
    id: string;
    name: string;
    icon: string;
}
