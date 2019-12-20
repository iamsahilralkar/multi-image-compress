## ngx-image-compress

Added multiple file support to compress


### Import
```sh
npm i multi-image-compress
```

### Usage


Import it in your app module

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxImageCompressService} from 'ngx-image-compress';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule {}
```


Use it in your component


```typescript
import {Component} from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';


@Component({
  selector: 'app-root',
  template: `
    <<div *ngFor="let item of imgResultBeforeCompress;let i = index;">
  -----------------------------------------------------
  <span >
  <h1>before</h1>
  <img *ngIf="imgResultBeforeCompress[i]" class="responsive" [src]="imgResultBeforeCompress[i]" alt="">
  </span>
  <span  >
  <h1>After</h1>
  <img *ngIf="imgResultAfterCompress[i]" class="responsive" [src]="imgResultAfterCompress[i]" alt="">
  </span>

  <div style="float: unset;"></div>
  </div>
  `
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
}
```

### How it's working underwood?

We will use Renderer2, and transform the image multiple time through HTML canvas encrustation.
In fact you can use the static version into the library and import renderer by yourself.


## Updates


#### 20/12/2019

Upload to Github
Need some fixes and tests to be use as a static library


