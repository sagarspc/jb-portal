import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../job';
import { JobService } from '../../job/job.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect: any;
  job =  new Job();
  errorMessage:any
  currentUser:any
  btnDisabled = false;
  public data:any = [];
  public settings = {};
  public selectedItems:any = [];
  options = [
    { name: "Html", value: 1 },
    { name: "Css", value: 2 },
    { name: "Angular", value: 3 },
    { name: "Javascript", value: 4 }
  ]
  selectedOption?: string;
  roles:any
  constructor(
    private jobService: JobService,
    private router: Router,
    private token: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.selectedOption = this.options[0].name;
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

  addJob(){
    this.btnDisabled = true;
    this.job.companyname = this.currentUser.companyname
    this.job.skills = this.selectedItems.toString();
    this.jobService.addJob(this.job).subscribe({
      next: data => {
        console.log(data);
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
   
    this.selectedItems.push(item.item_id);
    console.log(this.selectedItems);

  }
  public onDeSelect(item: any) {
    console.log(item);
    // this.selectedItems.pop(item.item_id);
    // console.log(this.selectedItems);
    const index = this.selectedItems.indexOf(item.item_id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
      console.log(this.selectedItems);
    }
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
  public onDeSelectAll(items: any) {
    console.log(items);
  }

}
