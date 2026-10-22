import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectRepository } from 'src/app/model/Repository/subject.repository';
import { TopicsRepository } from 'src/app/model/Repository/topics.repository';
import { TrainerRepository } from 'src/app/model/Repository/trainer.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Subjects } from 'src/app/model/subject';
import { Topic } from 'src/app/model/topic';
import { Trainer } from 'src/app/model/trainer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  isLoading = true;
  constructor(
    private formBuilder: FormBuilder,
    private trainerRepository: TrainerRepository,
    private subjectRepository: SubjectRepository,
    private restDatasource: RestDataSource,
    private topicsRespository: TopicsRepository,
    private router: Router
  ) {}

  show: boolean = false;
  icon: boolean = true;
  select: boolean = false;
  cl: boolean = true;
  public trainer!: Trainer[];
  public sub!: Subjects[];
  public topics: Topic[] = [];
  public subject: Subjects = new Subjects();
  public topic: Topic = new Topic();
  loginForm!: FormGroup;
  public subjects: Subjects[] = [];
  topicForm!: FormGroup;
  selectedSubjectId: number | null = null;





  ngOnInit(): void {

  this.loginForm = this.formBuilder.group({
    subject_name: ['', Validators.required],
  });

  this.topicForm = this.formBuilder.group({
    topic_name: ['', Validators.required],
    subject_Id: ['', Validators.required],
  });

  this.getSubject();

  this.restDatasource.getTopics().subscribe((topics) => {
    this.topics = topics;
  });

  this.restDatasource.getSubjectUpdateListener().subscribe((subjects) => {
    this.subjects = subjects;
  });
}

  public getTrainer() {
    console.log(this.trainerRepository.getTrainer());
    return this.trainerRepository.getTrainer();
  }
  form = new FormGroup({
    subject_name: new FormControl('', Validators.required),
  });

  onTrainerSelection(event: any) {
    this.topic.subject_Id = event.value;

    console.log('hii');
    console.log(event.value);
  }



saveSubject() {
  console.log(this.subject);

  if (this.loginForm.valid) {
    const data = this.loginForm.value;

    console.log('Subject data being sent:', data);

    this.restDatasource.addSubject(data).subscribe({
      next: (response) => {
        console.log('Subject added successfully:', response);

        Swal.fire({
          icon: 'success',
          title: 'Subject Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.show = false;
          this.getSubject();
        });
      },

      error: (error) => {
        console.error('Add Subject API Error:', error);

        Swal.fire({
          icon: 'error',
          title: 'Subject Saved',
          text: 'Subject was saved, but the server response had an error.',
        });

        this.getSubject();
      },
    });
  }
}

  getSubject() {
    this.restDatasource.getSubjects().subscribe((data) => {
      this.subjects = data;
      console.log(this.subjects);
      this.isLoading = false;
    });
  }


  delete(subjectId: any) {
    if (typeof subjectId === 'number') {
      this.restDatasource.deleteSubject(subjectId).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.getSubject(); // Fetch and filter the branches again
          });
        },
        (error) => {
          console.error('Error occurred while deleting the subject:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the subject.',
          });
        }
      );
    }
  }

  hide() {
    if (this.show == false) {
      this.show = true;
    } else {
      this.show = false;
    }
  }


  getTopic(subject_Id: any) {
  console.log('Selected Subject ID:', subject_Id);
  const topics = this.topicsRespository.getTopics();
  console.log('All Topics:', topics);

  const topic: Topic[] = topics.filter(
    (data) => data.subjects?.subject_Id == subject_Id
  );

  console.log('Filtered Topics:', topic);
  return topic;
}

  iconMap: { [subjectId: number]: boolean } = {};


  view(subject_Id: number) {
  if (this.selectedSubjectId === subject_Id) {
    this.selectedSubjectId = null;
  } else {
    this.selectedSubjectId = subject_Id;
  }
}

  sel() {
    if (this.select == false) {
      this.select = true;
    } else {
      this.select = false;
    }
  }

  saveTopic() {

  if (this.topicForm.valid) {
    const data = this.topicForm.value;
    console.log('Topic data:', data);
    this.restDatasource.saveTopic(data).subscribe((newTopic) => {

      Swal.fire({
        icon: 'success',
        title: 'Topic Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {

        this.cl = true;
        this.topics.push(newTopic);

      });

    });
  }
}

  top() {
  if (this.cl === true) {
    // Open Add Topic form
    this.cl = false;
  } else {
    // Close Add Topic form and reset the form
    this.cl = true;

    this.topicForm.reset();
  }
}
}
