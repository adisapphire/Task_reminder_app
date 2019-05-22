import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model = new User();
  user: User;
  submitted = false;
  error = '';
  constructor(private userService: UserService ,private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSignup() { this.submitted = true;}

  signup(){
    this.add(this.model);
  }

  add(user: User): void {
    if (!user) { return; }
    this.userService.addUser(user)
      .subscribe(user => {
        // console.log("dvnuiefdv",user);
        this.authenticationService.login(this.model.username,this.model.password)
            .pipe(first())
            .subscribe(
              data => {
                this.router.navigate(['/dashboard']);
            },
                error => {
                    this.error = error;
                });
        
      });
  }

}
