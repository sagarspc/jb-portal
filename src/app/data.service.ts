import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  changeMessage(msg: string) {
    this.messageSource.next(msg);
  }

  getJob() {
    const job = sessionStorage.getItem('job');
    return job ? JSON.parse(job) : [];
  }

  applyForJob(item: any) {
    const job: any = this.getJob();
    if (job.find((data:any) => JSON.stringify(data.id) === JSON.stringify(item.id))) {
      return false;
    } else {
      job.push(item);
      sessionStorage.setItem('job', JSON.stringify(job));
      return true;
    }
  }

  removeFromJob(item: any) {
    let job: any = this.getJob();
    if (job.find((data:any) => JSON.stringify(data) === JSON.stringify(item))) {
      job = job.filter((data:any) => JSON.stringify(data) !== JSON.stringify(item));
      sessionStorage.setItem('job', JSON.stringify(job));
    }
  }

  clearJob() {
    sessionStorage.setItem('job', '[]');
  }
}
