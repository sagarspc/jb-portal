import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {
  jobs:any
  errorMessage:any
  data:any = []
  selectedIds:any=[]
  selectedItems:any=[]
  searchText:any
  constructor(private jobService: JobService,private dataService: DataService) { }

  ngOnInit(): void {
    this.getJobs();

    this.data = [
      { item_id: 1, item_text: 'Html' },
      { item_id: 2, item_text: 'Css' },
      { item_id: 3, item_text: 'Javascript' },
      { item_id: 4, item_text: 'Anagular' },
      { item_id: 5, item_text: 'Php' },
    ];
  }
  getJobs(){
    this.jobService.getJobs().subscribe({
      next: data => {
        this.jobs = data;
        this.dataService.changeMessage(this.jobs.length);
        this.jobs.forEach((item:any) => {
        let splitArray = item.skills.split(',');
        
        this.selectedIds =  splitArray.map((str:any) => {
          return Number(str);
        });
        
        let tempArray:any = [];
        this.selectedIds.filter((item:any, i:number) =>{
            var item = this.data.find((el:any) => el.item_id === item);
            tempArray.push(item.item_text);
            this.selectedItems = tempArray;
        });
         console.log(this.selectedItems);
         item.skills = this.selectedItems;
      });
    },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }
 
}
