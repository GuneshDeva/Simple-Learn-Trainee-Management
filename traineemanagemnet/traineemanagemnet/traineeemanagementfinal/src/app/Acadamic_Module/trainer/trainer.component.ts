import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Trainer } from 'src/app/model/trainer';
import { TrainerFormComponent } from '../trainer-form/trainer-form.component';
import { Subjects } from 'src/app/model/subject';
import Swal from 'sweetalert2';
import { Trainee } from 'src/app/model/trainee';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit, AfterViewInit {
  trainers!: Trainer[];
  allTrainers: Trainer[] = [];                              /**This line added newly  -01.10.2026  */
  selectedSubject!: string;
  public subjects: Subjects[] = [];
  displayedColumns: string[] = [
    'trainer_id',
    'trainer_name',
    'trainer_age',
    'trainer_gender',
    'trainer_phonenumber',
    'trainer_email',
    'address_id',
    'action',
  ];
  dataSource!: MatTableDataSource<Trainer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // constructor(
  //   private courseRepository: CourseRepository,
  //   private dialog: MatDialog,
  //   private restData: RestDataSource
  // ) {
  //   this.dataSource = new MatTableDataSource();
  //   this.restData.getTrainers().subscribe({
  //     next: (resp) => {
  //       console.log(resp);
  //       this.trainers = resp;
  //       this.dataSource.data = resp;
  //     },
  //   });
  // }

  // The above constructor is old the new one is added below   -29.09.2026
  constructor(
  private courseRepository: CourseRepository,
  private dialog: MatDialog,
  private restData: RestDataSource
) {
   this.dataSource = new MatTableDataSource();
}


  trainees?: Trainee[];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ngOnInit(): void {
  //   this.getSubject();
  //   this.getTrainers();
  //   this.restData.trainerDataUpdated.subscribe(() => {
  //     this.refreshTrainers();
  //   });
  //   this.trainers = this.courseRepository.getTrainers();
  //   this.getTrainers();
  // }


  // The above ngOnInIt() is old and the new one is added below and also getTrainersFromBackend()    -29.09.2026
ngOnInit(): void {
  this.getSubject();
  this.getTrainersFromBackend();

  this.restData.trainerDataUpdated.subscribe(() => {
    this.refreshTrainers();
  });
    this.refreshTrainers();
}

getTrainersFromBackend(): void {
  this.restData.getTrainers().subscribe({
    next: (resp) => {
      console.log('Trainers from backend:', resp);

      this.trainers = resp;
      this.dataSource.data = resp;
    },
    error: (error) => {
      console.error('Error loading trainers:', error);
    }
  });
}

//   refreshTrainers(): void {
//   this.restData.getTrainers().subscribe({
//     next: (resp) => {
//       this.trainers = resp;
//       this.dataSource.data = resp;
//     },
//     error: (error) => {
//       console.error('Error refreshing trainers:', error);
//     }
//   });
// }


refreshTrainers() {
  this.restData.getTrainers().subscribe((trainerData) => {
    console.log('Refreshed trainers:', trainerData);

    // Keep the complete trainer list separately
    this.allTrainers = trainerData;

    // Refresh subjects also, because trainer-subject relationship may have changed
    this.restData.getSubjects().subscribe((subjectData) => {
      console.log('Refreshed subjects:', subjectData);

      this.subjects = subjectData;

      // If a subject is currently selected,
      // apply that subject filter again
      if (this.selectedSubject) {
        this.filterTrainersBySubject();
      } else {
        // No subject selected -> show all trainers
        this.trainers = this.allTrainers;
        this.dataSource.data = this.allTrainers;
      }
    });
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTrainers() {
    return this.courseRepository.getTrainers();
  }

  // addTrainer() {
  //   this.dialog.open(TrainerFormComponent);
  //   this.getTrainers();
  // }

// The above addTrainer() is old and the new one is added below   -29.09.2026

  addTrainer() {
  const dialogRef = this.dialog.open(
    TrainerFormComponent,
    {
      width: '500px',
      maxWidth: '70vw',
      maxHeight: '90vh'
    }
  );

  dialogRef.afterClosed().subscribe(() => {
    this.refreshTrainers();
  });
}

  // deleteTrainer(trainer: Trainer) {
  //   console.log('inside delete skill :' + trainer.trainer_id);
  //   this.courseRepository.deleteTrainerById(trainer.trainer_id as number);
  //   this.getTrainers();
  // }
  deleteTrainer(trainer: Trainer) {
    if (typeof trainer.trainer_Id === 'number') {
      this.restData.deleteTrainerById(trainer.trainer_Id).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // Fetch and update the trainers again
            this.restData.getTrainers().subscribe((resp) => {
              this.trainers = resp;
              this.dataSource.data = resp; // Update the MatTable dataSource
            });
          });
        },
        (error) => {
          console.error('Error occurred while deleting the trainer:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the trainer.',
          });
        }
      );
    }
  }

  // editTrainer(trainer: Trainer) {
  //   console.log(trainer);
  //   this.dialog.open(TrainerFormComponent, {
  //     data: trainer,
  //   });
  //   this.getTrainers();
  // }

  // The above editTrainer() is old and the new one is added below   -29.09.2026

editTrainer(trainer: Trainer) {
  console.log(trainer);

  const dialogRef = this.dialog.open(
    TrainerFormComponent,
    {
      width: '500px',
      maxWidth: '70vw',
      maxHeight: '90vh',
      data: trainer
    }
  );

  dialogRef.afterClosed().subscribe(() => {
    this.refreshTrainers();
  });
}

  // filterTrainersBySubject() {
  //   this.trainers = this.courseRepository
  //     .getSubjects()
  //     .filter((subject) =>
  //       subject.subject_name.includes(this.selectedSubject)
  //     )[0]?.trainer;
  //   console.log(this.trainers);
  //   console.log(this.courseRepository.getSubjects());

  //   let ids: any = this.trainers?.map((trainer) => trainer.trainer_id);
  //   console.log(ids);
  //   this.trainers = this.courseRepository
  //     .getTrainers()
  //     .filter((trainer1) => ids.indexOf(trainer1.trainer_id) != -1);
  //   console.log(this.trainers);
  //   this.dataSource = new MatTableDataSource(this.trainers);
  //   return this.trainers;
  // }
  // filterTrainersBySubject() {
  //   if (!this.selectedSubject) {
  //     // If no subject is selected, display all trainers
  //     this.dataSource.data = this.trainers;
  //   } else {
  //     // Filter trainers based on the selected subject
  //     const filteredTrainers = this.trainers.filter((trainer) =>
  //       trainer.subjects?.some(
  //         (subject) => subject.subject_name === this.selectedSubject
  //       )
  //     );
  //     this.dataSource.data = filteredTrainers;
  //   }
  // }
  // filterTraineeByBatch() {
  //   let trainerIds = this.courseRepository
  //     .getBatches()
  //     .filter((batch) =>
  //       batch.batch_name.includes(this.selectedBatch)
  //     )[0]?.trainees_ids;
  //   console.log(trainerIds);
  //   this.trainees = this.courseRepository.getTrainees().filter((trainee) => {
  //     return trainerIds.indexOf(trainee.trainee_id) != -1;
  //     console.log(trainee.trainee_id + ':' + trainerIds);
  //   });
  //   this.dataSource = new MatTableDataSource(this.trainees);
  //   console.log(this.trainees);
  // }


  // filterTrainersBySubject() {
  //   this.trainers = this.courseRepository
  //     .getSubjects()
  //     .filter((subject) =>
  //       subject.subject_name.includes(this.selectedSubject)
  //     )[0]?.trainer;
  //   console.log(this.trainers);
  //   console.log(this.courseRepository.getSubjects());

  //   let ids: any = this.trainers?.map((trainer) => trainer.trainer_Id) || []; // Add a nullish coalescing operator to handle undefined this.trainers
  //   console.log(ids);

  //   if (Array.isArray(this.trainers)) {
  //     // Check if this.trainers is an array before filtering
  //     this.trainers = this.courseRepository
  //       .getTrainers()
  //       .filter((trainer1) => ids.indexOf(trainer1.trainer_Id) !== -1);
  //     console.log(this.trainers);
  //     this.dataSource = new MatTableDataSource(this.trainers);
  //   }

  //   return this.trainers;
  // }


filterTrainersBySubject() {
  const selectedSubject = this.subjects.find(
    (subject) => subject.subject_name === this.selectedSubject
  );

  // If nothing is selected, show all trainers
  if (!selectedSubject) {
    this.trainers = this.allTrainers;
    this.dataSource.data = this.allTrainers;
    return;
  }

  const trainerIds =
    selectedSubject.trainer?.map(
      (trainer) => trainer.trainer_Id
    ) || [];

  this.trainers = this.allTrainers.filter(
    (trainer) =>
      trainerIds.includes(trainer.trainer_Id)
  );

  this.dataSource.data = this.trainers;

  console.log('Selected subject:', selectedSubject.subject_name);
  console.log('Trainer IDs:', trainerIds);
  console.log('Filtered trainers:', this.trainers);
}
  getSubject() {
    this.restData.getSubjects().subscribe((data) => {
      this.subjects = data;
      console.log(this.subjects);
    });
  }

resetSubjectFilter(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();

  this.selectedSubject = '';

  this.trainers = [...this.allTrainers];

  this.dataSource.data = [...this.allTrainers];

  console.log('Subject filter reset');
  console.log('All trainers:', this.dataSource.data);
}

}
