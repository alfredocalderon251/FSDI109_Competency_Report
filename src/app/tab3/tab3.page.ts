import { Component } from '@angular/core';
import { Friend } from '../models/Friend';
import { DataService } from '../services/data.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  model:Friend=new Friend();
  myFriends:Friend[]=[];

  constructor(private data:DataService,private shared:SharedService) {
    //read all my friends
    this.data.getAllFriends().subscribe(res=>{
      this.myFriends=[];//clear prev data

      //Filter to show only friends to belong to me

      for(var i=0;i<res.length;i++){
        if(res[i].belongsTo=="Alfredo"){
          this.myFriends.push(res[i]); // Only My Friends
          
        }
        console.log("Friend List",this.myFriends);
      }
      //this.myFriends  =res; // All Friends
    })


  }


  saveFriend(){
    if(this.model.name!="" ){
      console.log("Saving Friend",this.model);
      this.data.saveFriend(this.model);
      this.model=new Friend();
    }
    

  }
}
