import { location } from './../../../model/location';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/Services/location.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent implements OnInit {
  constructor(
    private location: LocationService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}
  Myform!: FormGroup;
  ngOnInit() {
    this.Myform = this.formbuilder.group({
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]*$/)]],
    });
  }
addLocation() {
  console.log('location method');

  if (this.Myform.valid) {
    const cityControl = this.Myform.get('city');

    if (cityControl && cityControl.value.match(/[0-9]/)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Fields',
        text: 'The field should contain only alphabets.',
      });
      return;
    }

    this.location.addLocation(this.Myform.value).subscribe((data) => {
      console.log('location added successfully', data);

      Swal.fire({
        icon: 'success',
        title: 'Location Added Successfully',
        text: 'Your location has been added successfully!',
        showConfirmButton: true
      }).then(() => {
        this.router.navigate(['/app-view-Branches']);
      });
    });
  }
}


  onCityInputChange(event: any) {
  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;

  const hasNumbers = /[0-9]/.test(inputValue);

  if (hasNumbers) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Fields',
      text: 'The field should contain only alphabets.',
    });
  }

  const formattedValue = inputValue.toUpperCase();

  inputElement.value = formattedValue;

  this.Myform.get('city')?.setValue(formattedValue, {
    emitEvent: false
  });
}
}
