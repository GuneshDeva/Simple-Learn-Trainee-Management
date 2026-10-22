import { Subjects } from './../subject';
import { Injectable } from "@angular/core";


import { RestDataSource } from "../restdatasource";
@Injectable()
export class SubjectRepository{
constructor(private restDatasource:RestDataSource){



}
// public subject:Subjects[]=[];
public subjects:Subjects[]=[];
getsubjects(){

return this.subjects;

}
deletesubject(subjectId:any){
  this.restDatasource.deleteSubject(subjectId).subscribe(data=>{
      console.log(subjectId)
  })
}
}
