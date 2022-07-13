import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  chosenList : any;
  private tasks = [];
  private list : any;
  constructor(private itemService : ItemService) {
    this.chosenList = 'all';
   }

   
   ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.itemService.getItem().subscribe((tasks : any) => {
      this.tasks = tasks;
    });
    this.list = [];
  }

  getList() {
    return this.list;
  }

  setChoosenList(list: any) {
    this.chosenList = list;
  }

  getItem() {
    this.tasks.forEach((item : any) => {
      if (!this.list.includes(item.list) && item.list) {
        this.list.push(item.list);
      };
    });
    return this.tasks.filter((char : any) => {
      if(this.chosenList === 'all'){
        return true;
      }
      return char.list === this.chosenList;
    });
  }

}
