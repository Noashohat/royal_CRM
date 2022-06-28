import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  label = 'click mev now';
  constructor() {}

  ngOnInit(): void {}

  buttonClick() {
    console.log('this button was clicked');
  }
}
