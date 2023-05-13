import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signupForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private _http:HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      fname:[''],
      lname:[''],
      email:[''],
      password:[''],
      date:[''],
      state:[''],
      gender:[''],

    })
  }
  signUp(){
    this._http.post<any>("http://localhost:3000/SignUp",this.signupForm.value).subscribe((res)=>
   {  Swal.fire("Successfully SignUp!", "You clicked the button!", "success");
   this.signupForm.reset();
    this.router.navigate(['login']);
  },
  (err)=>
  {
    Swal.fire("Server Down!", "You clicked the button!", "info");
  })

  }
}
