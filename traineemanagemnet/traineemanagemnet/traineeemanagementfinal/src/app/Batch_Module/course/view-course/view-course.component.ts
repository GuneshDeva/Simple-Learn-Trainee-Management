import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { Branch } from 'src/app/model/branch';
import { Course } from 'src/app/model/course';
import { Subjects } from 'src/app/model/subject';
import { RestDataSource } from 'src/app/model/restdatasource';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  public course: Course = new Course();
  public branch: Branch = new Branch();

  public subjects: Subjects[] = [];
  public selectedSubjects: { [courseId: number]: number[] } = {};
  public selectedCourse: Course | null = null;
public showSubjectModal: boolean = false;

  constructor(
    private courseRepository: CourseRepository,
    private router: Router,
    private restDataSource: RestDataSource
  ) {}

  ngOnInit(): void {
    this.restDataSource.getSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }

  saveCourse() {
    location.reload();
    return this.courseRepository.saveCourse();
  }

  getCourses() {
    return this.courseRepository.getCourses();
  }

  goBack() {
    this.router.navigate(['/batchhome/course']);
  }

  isSubjectSelected(course: Course | null, subjectId: number): boolean {

  if (!course) {
    return false;
  }

  const selected = this.selectedSubjects[course.course_id as number];

  if (selected) {
    return selected.includes(subjectId);
  }

  return course.subjects?.some(
    (subject: any) => subject.id === subjectId
  ) ?? false;
}

 toggleSubject(
  course: Course | null,
  subjectId: number,
  event: any
): void {

  if (!course) {
    return;
  }

  const courseId = course.course_id as number;

  if (!this.selectedSubjects[courseId]) {
    this.selectedSubjects[courseId] =
      course.subjects?.map((subject: any) => subject.id) ?? [];
  }

  if (event.target.checked) {

    if (!this.selectedSubjects[courseId].includes(subjectId)) {
      this.selectedSubjects[courseId].push(subjectId);
    }

  } else {

    this.selectedSubjects[courseId] =
      this.selectedSubjects[courseId].filter(
        id => id !== subjectId
      );

  }
}

  saveSubjects(course: Course): void {
    const courseId = course.course_id as number;

    const subjectIds =
      this.selectedSubjects[courseId] ??
      course.subjects?.map((subject: any) => subject.id) ??
      [];

    const data: any = {
      course_name: course.course_name,
      course_fee: course.course_fee,
      course_duration: course.course_duration,
      subjects: subjectIds
    };

    this.restDataSource.updateCourse(courseId, data).subscribe({
      next: (response) => {
        course.subjects = response.subjects;

        this.selectedSubjects[courseId] =
          response.subjects?.map((subject: any) => subject.id) ?? [];
        this.closeSubjectModal();
        Swal.fire({
          icon: 'success',
          title: 'Subjects Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        console.error('Error updating subjects:', error);

        Swal.fire({
          icon: 'error',
          title: 'Failed to Update Subjects',
          text: 'Something went wrong while updating subjects.'
        });
      }
    });
  }


  openSubjectModal(course: Course): void {
  this.selectedCourse = course;

  const courseId = course.course_id as number;

  this.selectedSubjects[courseId] =
    course.subjects?.map((subject: any) => subject.id) ?? [];

  this.showSubjectModal = true;
}

closeSubjectModal(): void {
  this.showSubjectModal = false;
  this.selectedCourse = null;
}
}
