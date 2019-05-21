import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { first } from 'rxjs/operators';


export class Logdata {

  username: string;
  password: string;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  


  model= new  Logdata();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) { }

  ngOnInit() {
    this.authenticationService.logout();

        // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  submitted = false;
  returnUrl: string;
  error = '';

  onLogin() { this.submitted = true;}

  login() {
    // console.log(this.model);
    this.authenticationService.login(this.model.username,this.model.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                });
  
  }



}
