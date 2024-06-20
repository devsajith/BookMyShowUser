import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm =new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.email, this.noSpaceAllowed]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),

  })

  get username() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  


  constructor(private router: Router, private service:DataService) { }

  ngOnInit(): void {
  }


  login() {

    console.log("data",this.loginForm.value);

    

    this.service.login(this.loginForm).subscribe({
      next: (response: any) => {
        localStorage.setItem('accessToken', response.accessToken.value);
        sessionStorage.setItem('refreshToken', response.refreshToken.value);
        sessionStorage.setItem('name', response.name);
        localStorage.setItem('id',response.userId);
        console.log(response);
        console.log("response", response.refreshToken.value)
        console.log("Accesstoken", response.accessToken.value)
        // alert("Successfully Logged in")
        this.router.navigate(['movies'])
        
      },
      error: (error: any) => {
        console.log(error)


        if (error.error.status == 404) {

          if (error.error.message == "404 NOT_FOUND") {
            alert("Email Does Not Exist")
          }
          else {
            alert("Invalid Password")
          }
        }
        else {
          alert("Invalid  Password")
        }
      }
    });

  }





  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true }
    }
    return null;
  }


  passwordvalidation(control: FormControl) {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    let hasSpl = /[#?!@$%^&*-]/.test(control.value);
    const validl = hasLower;
    const validn = hasNumber;
    const validu = hasUpper;
    const valids = hasSpl;
    
    if(!validl){
      return{ strongl: true};
    }
    if (!validn) {
      // return what´s not valid
      return { strongn: true };
    }
    if(!validu){
      return{ strongu: true};
    }
    if(!valids){
      return { strongs: true};
    }
    
    return null;
  }

}
