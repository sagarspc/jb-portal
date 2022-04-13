import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-job-applied-list',
  templateUrl: './job-applied-list.component.html',
  styleUrls: ['./job-applied-list.component.css']
})
export class JobAppliedListComponent implements OnInit {
  searchText:any
  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  get jobItems() {
     return this.data.getJob();
   }

   removeJob(index:number, job:any) {
    this.data.removeFromJob(job);
  }

}
