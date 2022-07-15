import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private itemService : ItemService) { }
  
  errors : any
  ngOnInit(): void {
    this.errors = [];
  }

  getErrors() {
    return this.errors.length > 0 ;
  }

  register(form : any){
    var error = []

    if(!form.value.name || typeof form.value.name === undefined || form.value.name === null) {
        error.push({text: "Invalid Name"})
    }
    if(!form.value.email || typeof form.value.email === undefined || form.value.email === null) {
        error.push({text: "Invalid email"})
    }
    if(!form.value.password || typeof form.value.password === undefined || form.value.password === null) {
        error.push({text: "Invalid Password"})
    }

    if(form.value.password !== form.value.password2) {
      error.push({text: "Passwords don't match, try again"});
    }

    if(error.length > 0){
      this.errors = error;
    } else{
      this.itemService.addUser(form.value).subscribe((response : any) => {
        console.log(response);
      });
    }
    
  }

}
