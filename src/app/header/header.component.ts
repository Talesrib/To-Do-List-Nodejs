import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private page = 'root';
  constructor() { }

  getPage () {
    return this.page;
  }

  setPage (page : string) {
    this.page = page;
  }

  ngOnInit(): void {
  }

}
