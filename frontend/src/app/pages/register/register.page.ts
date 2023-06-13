import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username!: string
  password!: string
  email!: string

  constructor(private router : Router, private sessionService: SessionService) { }

  ngOnInit() {
  }

  register(){


    const user: Object = {
      username: this.username,
      password: this.password,
      email: this.email,
      description: "No bio yet",
      is_admin: 0
    }    
    if (this.username == ""){
      return
    }
    if (this.password == ""){
      return
    }

    this.sessionService.register(user).subscribe(
      (result) => {
      },
      err => {
        console.error('Error: status = ', err.status, ' and statusText = ', err.statusText)
        alert('Error registering')
      },
      () => this.router.navigate(['/tabs/login']))

    this.username = ""
    this.password = ""
    this.username = ""
    this.password = ""
    this.email = ""
  }


}
