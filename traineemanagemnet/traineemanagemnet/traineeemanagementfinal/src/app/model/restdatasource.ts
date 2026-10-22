import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from './course';
import { Observable, Subject, tap } from 'rxjs';
import { Subjects } from './subject';
import { Batch } from './batch';
import { Branch } from './branch';
import { Topic } from './topic';
import { Trainee } from './trainee';
import { Trainer } from './trainer';
@Injectable()
export class RestDataSource {
  private locationAddedSubject = new Subject<void>();
  locationAdded$ = this.locationAddedSubject.asObservable();
  private url: string = 'http://localhost:8000/user/';

  private courses: Observable<Course[]> | undefined;
  // private subjectss: Observable<Subjects[]> | undefined;
  private subjects: Subjects[] = [];
  private subjectsUpdated = new Subject<Subjects[]>();
  private topics: Observable<Topic[]> | undefined;
  private topicList: Topic[] = []; // Separate local array to store topic data
  private topicsUpdated = new Subject<Topic[]>();
  trainerDataUpdated: EventEmitter<any> = new EventEmitter();
  private trainerDataUpdatedSubject: Subject<any> = new Subject<any>();
  traineeDataUpdated: EventEmitter<any> = new EventEmitter();
  private traineeDataUpdatedSubject: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) {}

  // get courses
  getCourses(): Observable<Course[]> {
    console.log('get courses');
    if (!this.courses) {
      this.courses = this.http.get<Course[]>(
        `${this.url}courseinsertandgettingall/`
      );
    }
    return this.courses;
  }

  getSubjects(): Observable<Subjects[]> {
    return this.http
      .get<Subjects[]>(`${this.url}subjects/`)
      .pipe(
        tap((subjects) => {
          this.subjects = subjects;
          this.subjectsUpdated.next([...this.subjects]);
        })
      );
  }
  getSubjectUpdateListener(): Observable<Subjects[]> {
    return this.subjectsUpdated.asObservable();
  }

  addSubject(subject: Subjects): Observable<Subjects> {
    return this.http
      .post<Subjects>(`${this.url}subjects/`, subject)
      .pipe(
        tap((newSubject) => {
          this.subjects.push(newSubject);
          this.subjectsUpdated.next([...this.subjects]);
        })
      );
  }



  // Add course
  saveCourse(course: Course): Observable<any> {
    console.log(course);
    return this.http
      .post<Course>(`${this.url}courseinsertandgettingall/`, course)
      .pipe(
        tap(() => {
          this.locationAddedSubject.next(); // Emit value to notify subscribers
          this.courses = undefined; // Clear the cached data so that the updated data will be fetched next time
        })
      );
  }

  // Update course
  updateCourse(course_id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(
      `${this.url}courseupdateanddeleteandretraivebyid/${course_id}/`,
      course
    );
  }

  // Delete course
  deleteCourse(course_id: number): Observable<Course> {
    return this.http.delete<Course>(
      `${this.url}courseupdateanddeleteandretraivebyid/${course_id}/`
    );
  }

  // Get course by id
  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(
      `${this.url}courseupdateanddeleteandretraivebyid/${courseId}/`
    );
  }


  deleteSubject(subjectId: any) {
    return this.http.delete(
      // `${this.url}subjectupdateanddeleteandretrievebyid/${subjectId}/`
      `${this.url}subjects/${subjectId}/`
    );
  }
  // Get batches
  getBatches(): Observable<Batch[]> {
    console.log('hello');
    return this.http.get<Batch[]>(`${this.url}batchinsertandgettingall/`);
  }

  // Get batch by id
  getBatchById(batch_id: number): Observable<Batch> {
    return this.http.get<Batch>(
      `${this.url}batchupdateanddeleteandretraivebyid/${batch_id}/`
    );
  }

  // Get branches
  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.url}branchinsertandgettingall/`);
  }

  // Add batch
  addBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(`${this.url}batchinsertandgettingall/`, batch);
  }

  // Update batch
  updateBatch(batch_id: number, batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(
      `${this.url}batchupdateanddeleteandretraivebyid/${batch_id}/`,
      batch
    );
  }

  // Delete batch
  deleteBatch(batch_id: number): Observable<Batch> {
    return this.http.delete<Batch>(
      `${this.url}batchupdateanddeleteandretraivebyid/${batch_id}/`
    );
  }


  getTopics(): Observable<Topic[]> {
    if (!this.topics) {
      this.topics = this.http
        .get<Topic[]>(this.url + 'topicinsertandgettingall/')
        .pipe(
          tap((topics) => {
            this.topicList = topics; // Store the fetched topics in the local array
            this.topicsUpdated.next([...this.topicList]); // Emit the updated topics data to the subscribers
          })
        );
    }
    return this.topics;
  }


  saveTopic(topic: Topic): Observable<any> {
    return this.http
      .post<Topic>(this.url + 'topicinsertandgettingall/', topic)
      .pipe(
        tap((newTopic) => {
          this.locationAddedSubject.next();
          this.topics = undefined; // Clear the cached data so that the updated data will be fetched next time
          this.topicList.push(newTopic); // Add the new topic to the local array
          this.topicsUpdated.next([...this.topicList]); // Emit the updated topics data to the subscribers
        })
      );
  }
  getTopicsUpdateListener(): Observable<Topic[]> {
    return this.topicsUpdated.asObservable();
  }

  // Authentication

  register(user: any) {
    return this.http.post('http://localhost:8000/authentication/register/', user);
  }

  login(credentials: any) {
    return this.http.post('http://localhost:8000/authentication/login/', credentials);
  }

  logout() {
    return this.http.post('http://127.0.0.1:8000/authentication/logout/', {});
  }

  getBatchesForBranch(branchId: number): Observable<Branch> {
    console.log('dhsabj');
    const url = `http://127.0.0.1:8000/user/branchupdateanddeleteandretraivebyid/${branchId}`;
    return this.http.get<Branch>(url);
  }

  //trainee
  saveTrainee(trainee: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(
      `http://127.0.0.1:8000/user/traineeinsertandgettingall/`,
      trainee
    );
  }

  getTrainees(): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(`${this.url}traineeinsertandgettingall/`);
  }
  deleteTraineeById(trainee_id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.url}traineeupdateanddeleteandretrievebyid/${trainee_id}/`
    );
  }


  updateTrainee(trainee_id: number, trainee: Trainee): Observable<Trainee> {
    return this.http
      .put<Trainee>(
        `${this.url}traineeupdateanddeleteandretrievebyid/${trainee_id}/`,
        trainee
      )
      .pipe(
        tap(() => {
          this.emitTraineeDataUpdated(); // Emit the event after updating the trainer
        })
      );
  }

  //Trainer
  saveTrainer(trainer: Trainer): Observable<Trainer> {
    console.log('dfsghj');
    return this.http.post<Trainer>(
       `${this.url}trainers/`,
      trainer
    );
  }

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.url}trainers/`);
  }
  deleteTrainerById(trainer_id: number) {
    return this.http.delete(
      `${this.url}trainers/${trainer_id}/`
    );
  }

  updateTrainer(trainer_id: number, trainer: Trainer): Observable<Trainer> {
    return this.http
      .put<Trainer>(
        `${this.url}trainers/${trainer_id}/`,
        trainer
      )
      .pipe(
        tap(() => {
          this.emitTrainerDataUpdated(); // Emit the event after updating the trainer
        })
      );
  }
  emitTrainerDataUpdated() {
    this.trainerDataUpdated.emit();
  }
  getTrainerDataUpdated(): Observable<any> {
    return this.traineeDataUpdatedSubject.asObservable();
  }
  emitTraineeDataUpdated() {
    this.traineeDataUpdated.emit();
  }
  getTraineeDataUpdated(): Observable<any> {
    return this.traineeDataUpdatedSubject.asObservable();
  }
}
