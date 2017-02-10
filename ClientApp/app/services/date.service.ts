import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
    public monday: Date;
    constructor() {
        this.monday = this.getMonday();
    }

    /**
     * getMonday
     */
    public getMonday(): Date {
        var d = new Date();
        var day = d.getDay();
        var diff = d.getDate() - day + (day == 0 ? -6:1); 
        return new Date(d.setDate(diff));
    }

    /**
     * getNextMonday
     */
    public getNextMonday(): Date {
        var nextmonday = this.getMonday();
        nextmonday.setDate(nextmonday.getDate() + 7);
        return new Date(nextmonday);
    }

}