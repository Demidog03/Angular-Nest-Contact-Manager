import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ApiService} from "../shared/api.service";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

export interface LoginForm {
  username: string
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      void this.router.navigate(['contacts'])
    }
  }
  onSubmit(form: NgForm) {
    this.loading = true
    const formValues: LoginForm = {
      username: '',
      password: ''
    }

    if(form.valid) {
      formValues.username = form.value.username
      formValues.password = form.value.password
    }

    if(!formValues.password || !formValues.username) {
      return alert('Username and password are required')
    }

    this.apiService.post('auth/login', formValues)
      .subscribe((data) => {
        if(data.token) {
          this.authService.setToken(data.token)
          void this.router.navigate(['/'])
        }
      }, () => { this.loading = false },
        () => { this.loading = false }
      )
  }
}
