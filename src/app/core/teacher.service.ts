import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = `${environment.apiUrl}teacher/`;

  constructor(private http:HttpClient) { }

  public getAll():Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}`);
  }

  public getById(id:number):Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}id`);
  }

  public post(teacher:Teacher) {
    return this.http.post(this.baseUrl, teacher);
  }

  public put(teacher:Teacher):Observable<Teacher> {
    return this.http.put<Teacher>(`${this.baseUrl}${teacher.id}`, teacher);
  }

  public delete(teacherId:number):Observable<Teacher> {
    return this.http.delete<Teacher>(`${this.baseUrl}${teacherId}`);
  }

}
