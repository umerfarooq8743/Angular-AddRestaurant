import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private _http:HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      fname:[''],
      lname:[''],
      email:[''],
      password:[''],
    })
  }
  login(){
    this._http.get<any>("http://localhost:3000/SignUp").subscribe((res)=>
    {
      const user=res.find((a:any)=>{
        return a.email===this.loginForm.value.email && a.password ===this.loginForm.value.password
      })
      if(user){
        Swal.fire("Successfully Login!", "You clicked the button!", "success");
        this.loginForm.reset();
        this.router.navigate(['restaurant']);
      }
      else{
        Swal.fire("Unavailable User!", "You clicked the button!", "error");
      }
    },
      (err)=>{
        Swal.fire("Server Down!", "You clicked the button!", "info");
      })
  }
}
