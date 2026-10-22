import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Trainee } from 'src/app/model/trainee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainee-form',
  templateUrl: './trainee-form.component.html',
  styleUrls: ['./trainee-form.component.css'],
})
export class TraineeFormComponent implements OnInit {
  traineeForm!: FormGroup;
  public submitType: string = 'save';

  constructor(
    private dialogRef: MatDialogRef<TraineeFormComponent>,
    private formBuilder: FormBuilder,
    private courseRepo: CourseRepository,
    private route: Router,
    private restdatasource: RestDataSource,
    @Inject(MAT_DIALOG_DATA) private traineeData: any
  ) {

  }

  ngOnInit() {
    this.getBatches();
    this.traineeForm = this.formBuilder.group({
      // trainee_id: ['', Validators.required],
      trainee_name: ['',[ Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]],
      trainee_age: ['', [Validators.required,Validators.pattern(/^[0-9]+$/), Validators.min(18),Validators.max(60)]],
      trainee_gender: ['', Validators.required],
      trainee_phonenumber: ['',[ Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      trainee_email: ['', [Validators.required, Validators.email]],
      address_id: this.formBuilder.group({
        address_id: [''],
        door_no: ['', Validators.required],
        street: ['', Validators.required],
        locality: ['', Validators.required],
        city: ['', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]],
        state: ['', Validators.required],
        pincode: ['', [Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
      }),
      batch_id: ['', Validators.required],
    });
    if (this.traineeData) {
      this.submitType = 'update';
      console.log(this.traineeData);

      {
        this.traineeForm.patchValue({
          trainee_id: this.traineeData.trainee_id,
          trainee_name: this.traineeData.trainee_name,
          trainee_age: this.traineeData.trainee_age,
          trainee_gender: this.traineeData.trainee_gender,
          trainee_phonenumber: this.traineeData.trainee_phonenumber,
          trainee_email: this.traineeData.trainee_email,
          address_id: {
            address_id: this.traineeData.address_id?.address_id,
            door_no: this.traineeData.address_id?.door_no,
            street: this.traineeData.address_id?.street,
            city: this.traineeData.address_id?.city,
            pincode: this.traineeData.address_id?.pincode,
            locality: this.traineeData.address_id?.locality,
            state: this.traineeData.address_id?.state,
          },
          batch_id: this.traineeData.batches?.batch_id,
        });
      }
    }
  }



  getBatches() {
    return this.courseRepo.getBatches();
  }

  submitTrainee(): void {

  console.log('SUBMIT BUTTON CLICKED');
  console.log('FORM VALUE:', this.traineeForm.value);
  console.log('FORM VALID:', this.traineeForm.valid);

  if (this.traineeForm.invalid) {
    console.log('FORM IS INVALID');
    this.traineeForm.markAllAsTouched();
    return;
  }

  console.log('FORM IS VALID');

  if (this.traineeData) {

    console.log('UPDATE TRAINEE');

    this.courseRepo
      .updateTraineeById(
        this.traineeData.trainee_id,
        this.traineeForm.value
      )
      .subscribe({
        next: (data) => {

          console.log('UPDATE SUCCESS:', data);

          Swal.fire({
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          });

          this.dialogRef.close();
          this.traineeForm.reset();
          this.route.navigateByUrl('/trainees');
        },

        error: (error) => {

          console.error('UPDATE ERROR:', error);

          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Unable to update trainee.'
          });

        }
      });

  } else {

    console.log('SAVE TRAINEE');

    this.courseRepo
      .saveTrainee(this.traineeForm.value)
      .subscribe({
        next: (data) => {

          console.log('SAVE SUCCESS:', data);

          Swal.fire({
            icon: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 1500
          });

          this.dialogRef.close();
          this.traineeForm.reset();
          this.route.navigateByUrl('/trainees');
        },

        error: (error) => {

          console.error('SAVE ERROR:', error);

          Swal.fire({
            icon: 'error',
            title: 'Save Failed',
            text: 'Unable to save trainee.'
          });

        }
      });
  }
}

  resetForm() {
    this.traineeForm.reset();
  }

  // The below method was added newly    -02.10.2026

  getFormValidationErrors() {
  const errors: any[] = [];

  Object.keys(this.traineeForm.controls).forEach(key => {
    const control = this.traineeForm.get(key);

    if (control && control.errors) {
      errors.push({
        field: key,
        errors: control.errors
      });
    }

    // Check address_id nested form
    if (key === 'address_id' && control instanceof FormGroup) {
      Object.keys(control.controls).forEach(addressKey => {
        const addressControl = control.get(addressKey);

        if (addressControl && addressControl.errors) {
          errors.push({
            field: `address_id.${addressKey}`,
            errors: addressControl.errors
          });
        }
      });
    }
  });

  return errors;
}

}
