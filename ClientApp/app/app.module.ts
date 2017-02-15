import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { ModalModule } from 'ng2-bootstrap/modal';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ParseMenuComponent } from './components/parsemenu/parsemenu.component';
import { EditMenuComponent } from './components/editmenu/editmenu.component';
import { MenuComponent } from './components/menu/menu.component';
import { StarRatingComponent } from './components/general/star-rating.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ParseMenuComponent,
        EditMenuComponent,
        MenuComponent,
        StarRatingComponent
    ],
    imports: [
        // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        UniversalModule, 
        FormsModule,
        MomentModule,
        ModalModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'edit-menu', component: EditMenuComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
