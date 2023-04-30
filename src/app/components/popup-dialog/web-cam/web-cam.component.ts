import { Component } from '@angular/core';

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.scss']
})
export class WebCamComponent {
  // public seconds!: number;
  // private trigger: Subject<void> = new Subject<void>();

  // public webcamImage?: WebcamImage;

  // public triggerSnapshot(): void {
  //   this.seconds = 3;
  //   setTimeout(() => {
  //     this.seconds = 2;
  //     setTimeout(() => {
  //       this.seconds = 1
  //       setTimeout(() => {
  //         this.trigger.next();
  //         this.seconds = 0;
  //       }, 2000)
  //     }, 2000)
  //   }, 2000)

  // }

  // public handleImage(webcamImage: WebcamImage): void {
  //   console.info("received webcam image", webcamImage);
  //   this.webcamImage = webcamImage;
  // }

  // public get triggerObservable(): Observable<void> {
  //   return this.trigger.asObservable();
  // }
}
