import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm =new FormGroup({
    name:new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), this.noSpaceAllowed]),
    password: new FormControl('', [Validators.required, this.noSpaceAllowed,this.passwordvalidation])
  })

  constructor(private router: Router, private service:DataService) { }

  ngOnInit(): void {
  }


  registration() {

    console.log("data",this.registrationForm.value);

    

    this.service.registration(this.registrationForm);
  
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
