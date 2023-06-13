import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  token!: string

  constructor(private router : Router, private userService:UserService , private sessionService: SessionService) { }

  ngOnInit() {
  }

  login(){
    const user: Object = {
      username: this.username,
      password: this.password,
    }
    
    if (this.username == ""){
      return
    }
    if (this.password == ""){
      return
    }

    this.sessionService.login(user).subscribe(
      (result) => {
        if (result.token) {
          this.token = result.token
          localStorage.setItem('token', this.token)
          localStorage.setItem('username', this.username)
        }

        this.userService.getUserId().subscribe((id: Object) => {
          // @ts-ignore
          let userId = id["user_id"]
          localStorage.setItem('user_id', userId)
          }, (error: any) => {
            console.log(error);
          })
      },
      err => {
        console.error('Error: status = ', err.status, ' and statusText = ', err.statusText)
        alert('Username or password are wrong, please try again!')
      },
      () => this.router.navigate(['/tabs/home']))

    this.username = ""
    this.password = ""
  }

}
