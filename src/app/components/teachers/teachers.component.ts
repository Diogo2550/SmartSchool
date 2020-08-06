import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../core/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  public teacherForm:FormGroup;
  public title = "Professores";
  public selectedTeacher:Teacher;
  public modalRef:BsModalRef;

  public teachers:Teacher[];

  private modo:string;
  
  constructor(private fb:FormBuilder,
              private modalService:BsModalService,
              private teacherService:TeacherService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public selectTeacher(teacher:Teacher):void {
    this.selectedTeacher = teacher;
    this.teacherForm.patchValue(teacher);
  }

  public deselectTeacher():void {
    this.selectedTeacher = null;
  }

  public teacherSubmit():void {
    this.updateTeacher(this.teacherForm.value);
  }

  public newTeacher():void {
    this.selectedTeacher = new Teacher();
    this.teacherForm.patchValue(this.selectedTeacher);
  }

  public deleteTeacher(teacherId:number):void {
    this.teacherService.delete(teacherId).subscribe(
      (model:any) => { 
        console.log(model);
        this.getTeachers();
      },
      (error:any) => { console.error(`Error: ${error.Message}`); }
    );
  }

  private getTeachers() {
    this.teacherService.getAll().subscribe(
      (teachers:Teacher[]) => { this.teachers = teachers; },
      (error:any) => { console.error(error); }
    );
  }

  private updateTeacher(teacher:Teacher):void {
    teacher.id === 0 ? this.modo = 'post' : this.modo = 'put';
    
    this.teacherService[this.modo](teacher).subscribe(
      (value:Teacher) => { 
        console.log(value);
        this.getTeachers();
        this.deselectTeacher();
      },
      (error:any) => { console.error(error); }
    );
  }

  private createForm():void {
    this.teacherForm = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });
  }
}
