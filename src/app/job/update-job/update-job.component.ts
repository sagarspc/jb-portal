import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Job } from '../job';
import { JobService } from '../../job/job.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect: any;
  job =  new Job();
  errorMessage:any
  currentUser:any
  btnDisabled = false;
  public data:any = [];
  public settings = {};
  public selectedItems:any = [];
  public selectedIds:any=[]
  options = [
    { name: "Html", value: 1 },
    { name: "Css", value: 2 },
    { name: "Angular", value: 3 },
    { name: "Javascript", value: 4 }
  ]
  jobID:any
  selectedOption?: string;
  constructor(
    private jobService: JobService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private token: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.jobID = this.activatedRoute.snapshot.params['id'];
    this.getJobById(); 
    this.currentUser = this.token.getUser();
    this.data = [
      { item_id: 1, item_text: 'Html' },
      { item_id: 2, item_text: 'Css' },
      { item_id: 3, item_text: 'Javascript' },
      { item_id: 4, item_text: 'Anagular' },
      { item_id: 5, item_text: 'Php' },
    ];
    // setting and support i18n
    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
  }

  getJobById(){
    this.jobService.getJobById(this.jobID).subscribe({
      next: data => {
        this.job = data;
        if(this.job.skills !== ''){
           let splitArray = data.skills.split(',');
        this.selectedIds =  splitArray.map((str:any) => {
          return Number(str);
        });
        
        let tempArray:any = [];
        this.selectedIds.filter((item:any, i:number) =>{
            var item = this.data.find((el:any) => el.item_id === item);
            tempArray.push(item);
            this.selectedItems = tempArray
        });
      }
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  updateJob(){
    this.job.skills = this.selectedIds.toString();
    this.jobService.updateJobById(this.jobID, this.job).subscribe({
      next: data => {
        console.log(data);
        this.getJobById();
        this.router.navigate(['/jobs'])
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }
  public onFilterChange(item: any) {
    console.log(item);
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }

  public onItemSelect(item: any) {
   
    this.selectedIds.push(item.item_id);
    console.log(this.selectedIds);

  }
  public onDeSelect(item: any) {
    console.log(item);
    
   
    const index = this.selectedIds.indexOf(item.item_id);
    if (index > -1) {
      this.selectedIds.splice(index, 1);
      console.log(this.selectedIds);
    }
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }
}
