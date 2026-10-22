import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchRepository } from 'src/app/model/Repository/batch.repository';

import { Batch } from 'src/app/model/batch';
import { Branch } from 'src/app/model/branch';
import { Course } from 'src/app/model/course';
import { RestDataSource } from 'src/app/model/restdatasource';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-batch',
  templateUrl: './update-batch.component.html',
  styleUrls: ['./update-batch.component.css']
})
export class UpdateBatchComponent implements OnInit {
  batch?: Batch;
  courses: Course[] = [];
  branches: Branch[] = [];

  constructor(
    private service: RestDataSource,
    private route: ActivatedRoute,
    private router: Router,

  ) {}

 ngOnInit(): void {
  let batch_id = this.route.snapshot.params['batch_id'];

  this.service.getBatchById(batch_id).subscribe(data => {
    this.batch = data;

     console.log('EDIT BATCH DATA:', data);
  console.log('BRANCH DATA:', data.branch);
    this.getCourses();
    this.getBranches();

    this.form.patchValue({
      batch_name: this.batch?.batch_name || ''
    });

    this.service.getBatches();
  });
}

  form = new FormGroup({
    batch_name: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    course: new FormControl('', [Validators.required])
  });

 initializeForm() {
  const batchData: any = this.batch;

  this.form.patchValue({
    batch_name: batchData?.batch_name || '',
    branch: batchData?.branches?.branch_id || '',
    course: batchData?.courses?.course_id || ''
  });
}

  getCourses() {
  this.service.getCourses().subscribe(
    (courses: Course[]) => {
      this.courses = courses;

      this.form.patchValue({
        course: this.batch?.courses?.course_id || ''
      });
    },
    (error: any) => {
      console.log(error);
    }
  );
}

  getBranches() {
  this.service.getBranches().subscribe(
    (branches: Branch[]) => {
      this.branches = branches;

      const batchData: any = this.batch;

      this.form.patchValue({
        branch: batchData?.branches?.branch_id || ''
      });
    },
    (error: any) => {
      console.log(error);
    }
  );
}
  submit() {
    if (this.form.valid && this.batch) {
      const batch_id = this.batch.batch_id as number;
      const data = this.form.value;
      console.log(data);
      this.service.updateBatch(batch_id, data).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/batchhome/batch']);
      });
    }
  }
goBack() {
  this.router.navigate(['/batchhome/batch']);
}

}
