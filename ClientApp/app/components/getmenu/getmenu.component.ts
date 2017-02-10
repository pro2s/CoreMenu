import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DateService } from '../../services/date.service';

@Component({
    selector: 'getmenu',
    templateUrl: './getmenu.component.html',
    providers: [DateService]
})

export class GetMenuComponent {
    private http;
    public services: MenuService[];
    public startDays: SelectDays[] = [];
    public input: ParseInfo = <ParseInfo> {}
    public source: MenuService = <MenuService> {};

    constructor(http: Http, dateService: DateService) {
        this.http = http;
        this.getParsers();
        this.startDays.push (<SelectDays> {name: "NextMonday", date: dateService.getNextMonday()});
        this.startDays.push (<SelectDays> {name: "Monday", date: dateService.getMonday()});
        this.startDays.push(<SelectDays> { name: "Today", date: new Date() });
    }

    /**
     * doParse
     */
    public doParse() {
        
    }

    /**
     * setStart
     */
    public setStart(date) {
        this.input.start = date;
    }

    /**
     * setSource
     */
    public setSource(service) {
        this.source = service
    }

    /**
     * getParsers
     */
    public getParsers() {
        this.http.get('/api/parser/services').subscribe(result => {
            this.services = result.json() as MenuService[];
            if (this.services.length > 0) {
                this.setSource(this.services[0]);
            }
        });
    }
}

interface SelectDays {
    name: string;
    date: Date;
}

interface MenuService {
    id: string;
    name: string;
    icon: string;
    info: string;
}

interface ParseInfo {
    start: Date;
    count: Number;
    update: Boolean;
    next: Boolean;
}