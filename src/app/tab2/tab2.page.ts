import { Component } from '@angular/core';
import { Post } from '../models/Post';
import { DataService } from '../services/data.service';
import { SharedService } from '../services/shared.service';
import { Friend } from '../models/Friend';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [Camera]
})
export class Tab2Page {

  model=new Post();
  myFriends:Friend[]=[];


  constructor(private data:DataService,private shared:SharedService,private camera:Camera ) {
    this.data.getAllFriends().subscribe(list=>{
      this.myFriends=[];// clear prev data
      //travel the list, filter only my friends
      for(var i=0; i<list.length;i++){
        if(list[i].belongsTo=="Alfredo"){
          this.myFriends.push(list[i]);
          //console.log(list[i]);
        }
      }

      console.log("To:",this.myFriends);
    })

  }

  /**
   * Create a shared service
   * put a Username Attribute in the service
   * Inject the service into this component
   * change Ln 28 to this model.from=this.shared.userName;
   */

  sendPost(){

    if(!this.model.message && !this.model.imageUrl)return;

    this.model.from=this.shared.userName;
    this.model.createdOn=new Date();// set this moment on time
    //console.log("Saving post",this.model);

    //save the object
    this.data.savePost(this.model);
    

    //create new model (clear form)
    this.model=new Post();
  }

  chooseImage(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };

    this.camera.getPicture(options).then(
      imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        //console.log(base64Image);
        this.model.imageUrl=base64Image;
      },
      err => {
        // Handle error
      }
    );
  }


 


}

// 1 - Install on your phone : Ionic DevApp
// 2 - Open it and register for a new account