import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    template: `
    
    `,
    selector: 'app-root',
    styleUrls: ['./real-path']
})

class AppComponent {
    title = 'angular';
}
  

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }