import { Component, OnInit ,ViewChild} from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect: any;
  public data:any = [];
  public settings = {};
  public selectedItems:any = [];
  public selectedIds:any=[]
  currentUser: any;
  isSuccessful = false;
  isSignUpFailed = false;
  userid:any
  errorMessage = '';
  btnDisabled=false
  options = [
    { name: "Html", value: 1 },
    { name: "Css", value: 2 },
    { name: "Angular", value: 3 },
    { name: "Javascript", value: 4 }
  ]
  selectedOption?: string;
  profile: any = {
    fname: '',
    lname: '',
    title:'',
    companyname:'',
    username: null,
    skills:null,
    year:0,
    month:0,
    email: null
  };
  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.selectedOption = this.options[0].name;
    this.profile.username = this.currentUser.username
    this.profile.companyname = this.currentUser.companyname
    this.profile.email = this.currentUser.email
    this.userid = this.currentUser.id;
    this.getUserById();

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

  getUserById(){
    this.userService.getUserById(this.userid).subscribe({
      next: data => {
        console.log(data);
        this.profile = data;
        if(this.profile.skills !== ''){
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
    })
  }
  
  updateProfile(){
    this.profile.skills = this.selectedIds.toString();
    this.userService.updateUserById(this.userid, this.profile).subscribe({
      next: data => {
        console.log(data);
        this.getUserById();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
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
