import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Subjects } from 'src/app/model/subject';
import { Trainer } from 'src/app/model/trainer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-form',
  templateUrl: './trainer-form.component.html',
  styleUrls: ['./trainer-form.component.css'],
})
export class TrainerFormComponent implements OnInit {
// closeDialog() {
// throw new Error('Method not implemented.');
// }
  trainerForm!: FormGroup;
  public submitType: string = 'save';

  constructor(
    private dialogRef: MatDialogRef<TrainerFormComponent>,
    private formBuilder: FormBuilder,
    private restdatasource: RestDataSource,
    private courseRepo: CourseRepository,
    @Inject(MAT_DIALOG_DATA) public trainerData: any
  ) {}
  public subjects: Subjects[] = [];

  ngOnInit() {
    this.trainerForm = this.formBuilder.group({
      // trainer_id: ['', Validators.required],
      trainer_name: ['',[ Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-Z ]+$/)]],
      trainer_age: ['',[ Validators.required,Validators.min(18),Validators.max(100)]],
      trainer_gender: ['', [Validators.required]],
      trainer_phonenumber: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      trainer_email: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      address: this.formBuilder.group({
        // address_id: ['', Validators.required],
        door_no: ['', [Validators.required]],
        street: ['', [Validators.required]],
        locality: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        pincode: ['', [Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
      }),
      subjects: [[],[ Validators.required]],
      created_by: ['sharath'], // Set default value for created_by
      updated_by: ['sharath'],
    });
    if (this.trainerData) {
      this.submitType = 'update';
      console.log('========== EDIT TRAINER DATA ==========');
  console.log(this.trainerData);
  console.log('Name:', this.trainerData.trainer_name);
  console.log('Age:', this.trainerData.trainer_age);
  console.log('Gender:', this.trainerData.trainer_gender);
  console.log('Phone:', this.trainerData.trainer_phonenumber);
  console.log('Email:', this.trainerData.trainer_email);
  console.log('Address:', this.trainerData.address);
  console.log('Subjects:', this.trainerData.subject);
  console.log('========================================');
      console.log(this.trainerData);

      {
        this.trainerForm.patchValue({
          // trainer_id: this.trainerData.trainer_id,
          trainer_name: this.trainerData.trainer_name,
          trainer_age: this.trainerData.trainer_age,
          trainer_gender: this.trainerData.trainer_gender,
          trainer_phonenumber: this.trainerData.trainer_phonenumber,
          trainer_email: this.trainerData.trainer_email,
          address: {

            door_no: this.trainerData.address?.door_no,
            street: this.trainerData.address?.street,
            city: this.trainerData.address?.city,
            pincode: this.trainerData.address?.pincode,
            locality: this.trainerData.address?.locality,
            state: this.trainerData.address?.state,
          },
          subjects: this.getSubjectId(),
        });
      }
    }
    this.getSubject();
  }
  getSubjectId() {
  if (!this.trainerData?.subject) {
    return [];
  }

  return this.trainerData.subject.map((sub: any) => {
    return sub.subject_id;
  });
}


  submitTrainer(): void {

  // Check whether the form is invalid
  if (this.trainerForm.invalid) {

    // Show all field-level validation messages
    this.trainerForm.markAllAsTouched();

    const invalidFields: string[] = [];

    // Trainer details
    if (this.trainerForm.get('trainer_name')?.invalid) {
      invalidFields.push('Trainer Name');
    }

    if (this.trainerForm.get('trainer_age')?.invalid) {
      invalidFields.push('Age');
    }

    if (this.trainerForm.get('trainer_gender')?.invalid) {
      invalidFields.push('Gender');
    }

    if (this.trainerForm.get('trainer_phonenumber')?.invalid) {
      invalidFields.push('Mobile Number');
    }

    if (this.trainerForm.get('trainer_email')?.invalid) {
      invalidFields.push('Email');
    }

    // Address details
    if (this.trainerForm.get('address.door_no')?.invalid) {
      invalidFields.push('Door Number');
    }

    if (this.trainerForm.get('address.street')?.invalid) {
      invalidFields.push('Street');
    }

    if (this.trainerForm.get('address.city')?.invalid) {
      invalidFields.push('City');
    }

    if (this.trainerForm.get('address.state')?.invalid) {
      invalidFields.push('State');
    }

    if (this.trainerForm.get('address.pincode')?.invalid) {
      invalidFields.push('Pincode');
    }

    if (this.trainerForm.get('address.locality')?.invalid) {
      invalidFields.push('Locality');
    }

    // Subject
    if (this.trainerForm.get('subjects')?.invalid) {
      invalidFields.push('Subject');
    }

    // SweetAlert
    Swal.fire({
      icon: 'warning',
      title: 'Please check the following fields',
      html: `
        <div style="text-align: left;">
          ${invalidFields
            .map(field => `<div>• ${field}</div>`)
            .join('')}
        </div>
      `,
      confirmButtonText: 'OK'
    });

    return;
  }

  // --------------------------------------------------
  // FORM IS VALID - YOUR EXISTING CODE STARTS HERE
  // --------------------------------------------------

  const formData = this.trainerForm.value;

  if (this.trainerData) {

    console.log('UPDATE DATA:', formData);

    this.restdatasource
      .updateTrainer(this.trainerData.trainer_Id, formData)
      .subscribe({
        next: (data) => {

          console.log('Updated successfully:', data);

          Swal.fire({
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {

            this.dialogRef.close();
            this.resetForm();
            this.restdatasource.emitTrainerDataUpdated();

          });
        },

        error: (error) => {

          console.error('Error updating trainer:', error);

          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'An error occurred while updating the trainer.'
          });

        }
      });

  } else {

    this.restdatasource.saveTrainer(formData).subscribe({
      next: (data) => {

        console.log('Saved successfully:', data);

        Swal.fire({
          icon: 'success',
          title: 'Saved Successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {

          this.dialogRef.close();
          this.resetForm();
          this.restdatasource.emitTrainerDataUpdated();

        });
      },

      error: (error) => {

        console.error('Error saving trainer:', error);

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: 'An error occurred while saving the trainer.'
        });

      }
    });

  }
}



getValidationMessages(): string[] {

  const messages: string[] = [];

  const name = this.trainerForm.get('trainer_name');
  const age = this.trainerForm.get('trainer_age');
  const gender = this.trainerForm.get('trainer_gender');
  const phone = this.trainerForm.get('trainer_phonenumber');
  const email = this.trainerForm.get('trainer_email');
  const subjects = this.trainerForm.get('subjects');

  const doorNo = this.trainerForm.get('address.door_no');
  const street = this.trainerForm.get('address.street');
  const locality = this.trainerForm.get('address.locality');
  const city = this.trainerForm.get('address.city');
  const state = this.trainerForm.get('address.state');
  const pincode = this.trainerForm.get('address.pincode');


  // NAME
  if (name?.hasError('required')) {
    messages.push('Please enter trainer name');
  } else if (name?.hasError('minlength')) {
    messages.push('Trainer name must contain at least 2 characters');
  } else if (name?.hasError('pattern')) {
    messages.push('Trainer name can contain only letters and spaces');
  }


  // AGE
  if (age?.hasError('required')) {
    messages.push('Please enter trainer age');
  } else if (age?.hasError('min')) {
    messages.push('Age must be at least 18');
  } else if (age?.hasError('max')) {
    messages.push('Age cannot be more than 100');
  }


  // GENDER
  if (gender?.hasError('required')) {
    messages.push('Please select gender');
  }


  // PHONE
  if (phone?.hasError('required')) {
    messages.push('Please enter phone number');
  } else if (phone?.hasError('pattern')) {
    messages.push('Phone number must contain exactly 10 digits');
  }


  // EMAIL
  if (email?.hasError('required')) {
    messages.push('Please enter email address');
  } else if (email?.hasError('email')) {
    messages.push('Please enter a valid email address');
  }


  // ADDRESS
  if (doorNo?.hasError('required')) {
    messages.push('Please enter door number');
  }

  if (street?.hasError('required')) {
    messages.push('Please enter street name');
  }

  if (locality?.hasError('required')) {
    messages.push('Please enter locality');
  }

  if (city?.hasError('required')) {
    messages.push('Please enter city');
  }

  if (state?.hasError('required')) {
    messages.push('Please enter state');
  }


  // PINCODE
  if (pincode?.hasError('required')) {
    messages.push('Please enter pincode');
  } else if (pincode?.hasError('pattern')) {
    messages.push('Pincode must contain exactly 6 digits');
  }


  // SUBJECT
  if (subjects?.hasError('required')) {
    messages.push('Please select at least one subject');
  }

  return messages;
}

  resetForm() {
    this.trainerForm.reset(); // Reset the form
    this.trainerForm.patchValue({
      created_by: 'sharath', // Set default value for created_by after reset
      updated_by: 'sharath', // Set default value for updated_by after reset
    });
  }


  getSubject() {
    this.restdatasource.getSubjects().subscribe((data) => {
      this.subjects = data;
      console.log(this.subjects);
    });
  }

  closeDialog(): void {
  this.dialogRef.close();
}
}
