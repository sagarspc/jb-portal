import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../job/job';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  addJob (data: any): Observable<any> {
    return this.http.post(API_URL + 'job', data);
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(API_URL + 'job');
  }
 
  getJobById(id: any): Observable<any> {
    return this.http.get(`${API_URL}job/${id}`);
  }

  updateJobById(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}job/${id}`, data);
  }

}
