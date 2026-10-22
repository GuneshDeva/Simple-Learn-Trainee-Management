import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RestDataSource } from 'src/app/model/restdatasource';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseRepository } from 'src/app/model/Repository/course.repository';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  course?: Course;
  public id!:number;


  constructor(
    private service: RestDataSource,
    private route: ActivatedRoute,
    private router: Router,
    public courses:CourseRepository
  ) {}

  form = new FormGroup({
    course_name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z0-9 .&-]*$/)]),
    course_fee: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]),
    course_duration: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]+(\.[0-9]+)?\s*(Days?|Weeks?|Months?|Years?)$/i)])
  });

  ngOnInit(): void {
    let course_id = this.route.snapshot.params['course_id'];
    this.id=course_id
    console.log(this.id)
    this.service.getCourseById(course_id).subscribe(data => {
      this.course = data;
      // this.courses.push(data);
     // this.courses.splice(this.courses.findIndex(c=>c.course_id==course_id),1,data);

      this.initializeForm();

    });
  }

  initializeForm() {
    if (this.course) {
      this.form.patchValue({
        course_name: this.course.course_name || '',
        course_fee: this.course.course_fee || '',
        course_duration: this.course.course_duration || ''
      });
    }
  }

  submit() {
    if (this.form.valid && this.course) {
      const course_id = this.course.course_id as number;
      const updatedCourse = this.form.value;
      this.service.updateCourse(course_id, updatedCourse).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully',
          showConfirmButton: true,
          timer: 1500
        }).then(() => {
          // Update the course in CourseRepository
          this.courses.updateCourse(course_id, updatedCourse);
        });
        this.router.navigate(['/batchhome/course']);
      });
    }
  }

  goBack() {
  this.router.navigate(['/batchhome/course']);
}

}
