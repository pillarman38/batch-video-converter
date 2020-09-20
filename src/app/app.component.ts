import { Component } from '@angular/core';
// import * as ffmpeg from 'ffmpeg';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'batch-video-converter';
  
  constructor(private http: HttpClient){}

  dragOverHandler(ev) {

    console.log('File(s) in drop zone'); 
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  dropHandler(ev) {
    console.log('File(s) dropped');
    var arr = []
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          var obj = {
            title: file['name'],
            path: file['path']
          }
          
          console.log(file);
          arr.push(obj)
          if(arr.length == ev.dataTransfer.items.length) {
            this.http.post(`http://localhost:4012/api/mov/getinfo`, arr).subscribe((res) => {
            console.log(res);
            
          })
          }
          
        }else {
        console.log(ev);
      // Use DataTransfer interface to access the file(s)
    }
      } 
      
    } 
  }

}
