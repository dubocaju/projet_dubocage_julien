import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../shared/services/login.service";
import { catchError } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jwtError: boolean | undefined;
  loginErrorMessage: string | undefined;
  loggedIn: boolean = false;

  loginForm = this.fb.group({
    login: ['', Validators.required], password: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.hide();
    this.route.queryParams.subscribe(params => {
      this.jwtError = params['jwtError'];
    });
  }

  onSubmit() {
    this.spinner.show();
    if (this.loginForm.value.login != null && this.loginForm.value.password != null) {
      this.loginService.login(this.loginForm.value.login, this.loginForm.value.password)
        .pipe(
          catchError(e => {
            this.loginErrorMessage = e.error.message;
            this.spinner.hide();
            return e;
          })
        )
        .subscribe(
          () => {
            this.loggedIn = true;
            this.spinner.hide();
          }
        )
    }
  }

}
