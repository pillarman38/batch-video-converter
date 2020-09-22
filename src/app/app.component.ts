import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { RecievedInfoServiceService } from './recieved-info-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  info = []
  arrOfTitles = []
  compressionSlider = 0
  audio = []
  video = []
  subtitles = []
  title = 'batch-video-converter';
  @ViewChild('myRange') myRange: ElementRef;
  constructor(private http: HttpClient, private recievedInfoServ: RecievedInfoServiceService){}

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
          
          // console.log(file);
          arr.push(obj)
          if(arr.length == ev.dataTransfer.items.length) {
            this.http.post(`http://localhost:4012/api/mov/getinfo`, arr).subscribe((res: any) => {
            console.log(res);
            this.recievedInfoServ.changeInfo(res)
            this.openCity("", "summary")
            var streams = res[0]['streams']
            
            this.audio = streams.filter((title) => {
              if(title['codec_name'] != "hevc") {
                if(title['codec_name'] != "hdmv_pgs_subtitle") {
                  return title
                }
              }
            })
            
            console.log(this.audio);
            this.video = streams[0]
            console.log(this.video);

            this.subtitles = streams.filter((title) => {
              if(title['codec_name'] == "hdmv_pgs_subtitle") {
                return title
              }
            })
            console.log(this.subtitles);
            
          })
          }
          
        } else {
      // Use DataTransfer interface to access the file(s)
        }
      }
    } 
  }
  
  selectedVideo(e, title) {
    console.log(e.target, title);
  }
  sliderValueChange(e) {
    console.log(this.myRange.nativeElement.value)
    this.compressionSlider = this.myRange.nativeElement.value
  }

  saveDir() {
    this.http.get(`http://localhost:4012/api/mov/selectDirectory`).subscribe((res) => {
      console.log(res);
    })
  }

  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // document.getElementById(cityName).style.display = "block";
    // console.log(evt.currentTarget.className);
    
    if(evt == "") {
      console.log("ok");
    } else {
      evt.currentTarget.className += " active";
    }
  }
  ngOnInit() {
    this.recievedInfoServ.why.subscribe(msg => {
      console.log(msg);
      this.info = msg
      if(msg == null) {
        console.log("null");
      } else {
        var arrOfTitles = msg.map(title => title.format)
        console.log(this.arrOfTitles);
      }
    })
  }
}
