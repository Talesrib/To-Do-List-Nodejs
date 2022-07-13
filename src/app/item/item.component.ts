import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  status : any;
  constructor(private itemService : ItemService, private tab : TabsComponent) { 
  }
  
  ngOnInit(): void {
    this.status = this.item.status[0];
  }

  updateStatus() {
    if(this.status === "pending") {
      this.itemService.updateItem(this.item._id, {status : 'completed'}).subscribe(() => {
        this.status = 'completed';
      });
    }else {
      this.itemService.updateItem(this.item._id, {status : 'pending'}).subscribe(() => {
        this.status = 'pending';
      });
    }
  }

  delete() {
    this.itemService.deleteItem(this.item._id).subscribe(() => {
      this.tab.refresh();
    });
  }

}
