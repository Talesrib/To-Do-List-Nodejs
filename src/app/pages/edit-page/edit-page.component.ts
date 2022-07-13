import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  id!: string;
  private routeSub: Subscription = new Subscription;
  constructor(private router: Router ,private activatedRoute: ActivatedRoute, private itemService : ItemService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {    
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  update(formObject: any) {
    let object = {};
    formObject._directives.forEach((element: any) => {
      if (element.name === 'name' && !element.invalid) {
        object = {...object , 'name' : element.value};
      } else if (element.name === 'list' && !element.invalid) {
        object = {...object , 'list' : element.value};
      }
    });
    console.log(object);
    this.itemService.updateItem(this.id, object).subscribe((response : any) => {
      console.log(response);
    });
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
