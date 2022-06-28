import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  brandName = 'Royal Crm';
  userName = 'john';
  today = new Date();
  constructor() {}

  ngOnInit(): void {}
}
