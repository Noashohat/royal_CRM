import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  success = true;
  night = true;
  items = ['orange', 'Apple', 'bannana'];

  isItNight() {
    return this.night;
  }

  addAnotherItem() {
    this.items.push('papaya');
  }
}
