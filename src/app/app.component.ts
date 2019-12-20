import {Component} from '@angular/core';
import {NgxImageCompressService} from 'projects/ngx-image-compress/src/lib/ngx-image-compress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private imageCompress: NgxImageCompressService) {}

  imgResultBeforeCompress = [];
  imgResultAfterCompress = [];

  compressFile() {
    this.imageCompress.uploadFile().then(({images, orientation}) => {
      this.imgResultBeforeCompress = images;
      for(let i = 0; i < images.length; i++){
      console.warn('Size in bytes was:', this.imageCompress.byteCount(images[i]));
      this.imageCompress.compressFile(images[i], orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress.push(result);
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
      }
    });
  }


  imgResultUpload = [];

  uploadFile() {
    this.imageCompress.uploadFile().then(({images, orientation}) => {
      this.imgResultUpload = images;
      // console.warn(images[0]);
      // console.warn(orientation);
    });
  }


}
