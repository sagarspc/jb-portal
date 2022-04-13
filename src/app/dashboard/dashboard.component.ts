import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { JobService } from '../job/job.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jobpostedcount: any;
    
  constructor(private data: DataService, private jobService: JobService) { }
   

  ngOnInit(): void {
     this.jobService.getJobs().subscribe(data=> this.jobpostedcount = data.length)
  }

}
