import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import{RestaurantData} from './restaurant.module';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  formValue!:FormGroup
  restaurantModelObj:RestaurantData=new RestaurantData;
  allRestaurantData:any;
data: any;
showAdd!:boolean
showBtn!:boolean
constructor(private FormBuilder:FormBuilder, private api:ApiService){}
  ngOnInit():void{
    this.formValue=this.FormBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      service:[''],
    })
    this.getAllData();
  }
clickAddRes(){
  this,this.formValue.reset();
  this.showAdd=true;
  this.showBtn=false;
}
  addResturant(){
    this.restaurantModelObj.name=this.formValue.value.name;
    this.restaurantModelObj.email=this.formValue.value.email;
    this.restaurantModelObj.mobile=this.formValue.value.mobile;
    this.restaurantModelObj.address=this.formValue.value.address;
    this.restaurantModelObj.service=this.formValue.value.service;
    this.api.postRestaurant(this.restaurantModelObj).subscribe((res)=>{
      console.log(res);
      Swal.fire("Successfully Added!", "You clicked the button!", "success");
      this.formValue.reset();
      this.getAllData();
    },
    (err)=>{
      alert("error");
    })
  }
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData=res;
    })
  }
  deleteRes(data:any){
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success');
        this.api.deleteRestaurant(data).subscribe((res)=>{
          this.getAllData();

        })}
        else {
        Swal.fire(
          'Your imaginary file is safe!!',
          'Your Data has been safed.',
          'success')}})
  }
  onEditRes(data:any){
    this.showAdd=false;
    this.showBtn=true;
    this.restaurantModelObj.id=data.id;
    console.log(data.id);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }
  UpdateRes(){
    this.restaurantModelObj.name=this.formValue.value.name;
    this.restaurantModelObj.email=this.formValue.value.email;
    this.restaurantModelObj.mobile=this.formValue.value.mobile;
    this.restaurantModelObj.address=this.formValue.value.address;
    this.restaurantModelObj.service=this.formValue.value.service;
    this.api.updatesRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe((res)=>
    {
      console.log(res);
      Swal.fire("Successfully Updated!", "You clicked the button!", "success");
      this.formValue.reset();
      this.getAllData();
    },
    (err)=>{
      alert("error");
    })
  }
  logout(){
    Swal.fire("Successfully LogOut!", "You clicked the button!", "success");
  }
}
