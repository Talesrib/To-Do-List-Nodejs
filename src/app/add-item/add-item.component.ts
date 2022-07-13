import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  constructor(private router: Router, private itemService : ItemService) {
    
  }

  ngOnInit(): void {
  }

  onSubmit(formObject: any) {
    if(formObject.invalid) {
      return;
    }
    this.itemService.addItem(formObject.value).subscribe((response : any) => {
      console.log(response);
    });
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    
  };

}
