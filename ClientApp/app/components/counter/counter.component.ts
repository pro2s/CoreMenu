import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 10;

    public incrementCounter() {
        this.currentCount += 5;
    }
}
