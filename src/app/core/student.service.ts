import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = `${environment.apiUrl}student/`;

  constructor(private http:HttpClient) { }

  public getAll():Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }

  public getById(id:number):Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}id`);
  }

  public post(student:Student) {
    return this.http.post(this.baseUrl, student);
  }

  public put(student:Student):Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}${student.id}`, student);
  }

  public delete(studentId:number):Observable<Student> {
    return this.http.delete<Student>(`${this.baseUrl}${studentId}`);
  }

}
