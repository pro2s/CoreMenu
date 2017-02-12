import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { DateService } from '../../services/date.service';

@Component({
    selector: 'parse-menu',
    templateUrl: './parsemenu.component.html',
    providers: [DateService]
})

export class ParseMenuComponent {
    @Output() compleat:EventEmitter<string> = new EventEmitter();
    @ViewChild('parseMenuModal') public parseMenuModal:ModalDirective;
    private http;
    private readonly hideTimout = 2000;

    public message: Message;
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
        this.message = { text: '', isError: false, detail:'', errors:[] };
    }

    /**
     * hide
     */
    public hide() {
        this.parseMenuModal.hide();
    }

    /**
     * show
     */
    public show() {
        if (this.services) {
            this.parseMenuModal.show();
        }
    }

    /**
     * doParse
     */
    public doParse() {
        this.message.text = 'Parse...';
        this.message.isError = false;
        var id = this.source.id;
        if (id) {
            this.http.get('/api/parser/do', this.input).subscribe(
                result => {
                    this.message.text = 'Success parse';
                    this.compleat.emit('complete');
                    setTimeout(function() {
                        this.hide();
                    }, this.hideTimout);
                }, error => {
                    console.log('Error');
                    this.message = error.json() 
                }
            );  
        }
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
        this.source = service;
        this.input.id = service.id;
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
    name: String;
    date: Date;
}

interface MenuService {
    id: String;
    name: String;
    icon: String;
    info: String;
}

interface ParseInfo {
    id: String;
    start: Date;
    count: Number;
    update: Boolean;
    next: Boolean;
}

interface Message {
    text: String;
    isError: Boolean;
    detail: String;
    errors: String[];
}