import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[star-rating]',
    templateUrl: 'star-rating.component.html',
    styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
    public readonly: Boolean = false;
    public max: Number = 5;
    public value: Number = 0;
    public average: Number = 0;

    private stars: Star[];

    constructor() {
        this.updateStars();
    }

    public updateStars() {
        this.stars = [];
        for (var i = 0; i < this.max; i++) {
            if (this.value == undefined) {
                this.addStar(false, i < this.average);
            } else {
                let filled, average;
                if (this.average > this.value) {
                    filled = i < this.value && i < this.average;
                    average = i < this.average != i < this.value;
                } else {
                    filled = i < this.value != i < this.average;
                    average = i < this.average && i < this.value;
                }
                this.addStar(filled, average);
            }
        }
    }

    private addStar(filled, averrage) {
        this.stars.push(<Star>{
            filled: filled,
            average: averrage,
        });
    }    
    
    /**
     * togle
     */
    public toggle(index) {
        console.log(index);
        this.value = index + 1;
        this.updateStars();
    }

    ngOnInit() { }
}

interface Star {
    filled: Boolean,
    average: Boolean,
}