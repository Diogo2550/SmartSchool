import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Student } from '../../models/student';
import { StudentService } from '../../core/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  
  public studentForm:FormGroup;
  public title = "Alunos";
  public selectedStudent:Student;
  public modalRef:BsModalRef;

  public students:Student[];

  private modo:string;
  
  constructor(private fb:FormBuilder,
              private modalService:BsModalService,
              private studentService:StudentService) {
    this.createForm();
  }
  
  ngOnInit(): void {
    this.getStudents();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public selectStudent(aluno:Student):void {
    this.selectedStudent = aluno;
    this.studentForm.patchValue(aluno);
  }

  public deselectStudent():void {
    this.selectedStudent = null;
  }
  
  public studentSubmit():void {
    this.updateStudent(this.studentForm.value);
  }

  public newStudent():void {
    this.selectedStudent = new Student();
    this.studentForm.patchValue(this.selectedStudent);
  }

  public deleteStudent(studentId:number):void {
    this.studentService.delete(studentId).subscribe(
      (model:any) => { 
        console.log(model);
        this.getStudents();
      },
      (error:any) => { console.error(`Error: ${error.Message}`); }
    );
  }
  
  private createForm():void {
    this.studentForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required ]
    });
  }

  private getStudents():void {
    this.studentService.getAll().subscribe(
      (students:Student[]) => { 
        this.students = students;
      },
      (error:any) => { console.error(error); }
    );
  }

  private updateStudent(student:Student):void {
    student.id === 0 ? this.modo = 'post' : this.modo = 'put';
    
    this.studentService[this.modo](student).subscribe(
      (value:Student) => { 
        console.log(value);
        this.getStudents();
        this.deselectStudent();
      },
      (error:any) => { console.error(error); }
    );
  }
  
}

