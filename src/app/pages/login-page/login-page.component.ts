import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  login(form : any){
    this.authService.validate(form.value.email, form.value.password)
    .then((response : any) => {
      this.authService.setUserInfo({'user' : response['user']});
      this.router.navigate(['home']);

    })
  }

}
