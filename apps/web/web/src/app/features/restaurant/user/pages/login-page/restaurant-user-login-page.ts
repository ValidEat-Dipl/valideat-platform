import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantAuthService } from '../../../services/restaurant-auth.service';

@Component({
  selector: 'app-restaurant-user-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './restaurant-user-login-page.html',
  styleUrl: './restaurant-user-login-page.scss',
})
export class RestaurantUserLoginPage {
  isLoading = signal(false);
  loginError = signal(false);

  //form
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });


  constructor(
    private restaurantAuthService: RestaurantAuthService,
    private currentUserService: CurrentUserService,
    private router: Router,
  ) {}


login(): void {

  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched()
    return
  }

  this.isLoading.set(true)
  this.loginError.set(false)


  let email = this.loginForm.value.email
  let password = this.loginForm.value.password


  if(email && password){

    this.restaurantAuthService.login(email, password).subscribe({

      next: (response) => {

        this.isLoading.set(false)

        if(response){

          let id = response.id
          let firstname = response.firstName
          let lastname = response.lastName
          let mail = response.email
          let role = response.role
          let token = response.token

          let user = {
            id: id,
            firstName: firstname,
            lastName: lastname,
            email: mail,
            role: role,
            token: token
          }

          this.currentUserService.setUser(user)

          this.router.navigate(['/restaurant/user/select'])

        } else {
          this.loginError.set(true)
        }
      },

      error: (error) => {
        this.isLoading.set(false)
        this.loginError.set(true)
      }

    })

  } else {
    this.isLoading.set(false)
    this.loginError.set(true)
  }
}
}
