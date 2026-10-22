import { Injectable } from '@angular/core';

import { Topic } from '../topic';
import { RestDataSource } from '../restdatasource';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class TopicsRepository {
  public topics: Topic[] = [];
  constructor(private restDataSource: RestDataSource, private route: Router) {
    this.restDataSource.getTopics().subscribe((data) => {
      this.topics = data;
      console.log(this.topics);
    });
    this.getTopics();
  }
  getTopics() {
    return this.topics;
  }
  saveTopic(topic: Topic) {
    console.log('repo');
    console.log(topic);
    this.restDataSource.saveTopic(topic).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Batch Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {


      });
    });
  }

}
