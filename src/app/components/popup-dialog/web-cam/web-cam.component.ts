import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith } from 'rxjs';
import { FormInitialize } from 'src/app/form-initialization';

//#region image object interface
export interface IImageObject {
  fileName: String;
  base64String: String;
  imageType: string;
}
//#endregion

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.scss',
    '../../../../../node_modules/bootstrap/dist/css/bootstrap.css']
})

export class WebCamComponent implements AfterViewInit, OnInit {

  //#region constructor
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<WebCamComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  //#endregion

  //#region variables
  WIDTH = 400;
  HEIGHT = 300;
  @ViewChild("video") public video!: ElementRef;
  @ViewChild("canvas") public canvas!: ElementRef;
  captures: any[] = [];
  error: any;
  isCaptured: boolean = false;
  webCamForm!: FormGroup;
  mediaStream!: MediaStream;
  //#endregion

  //#region initialize variable before page load
  ngOnInit() {
    this.formInitialize();
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }
  //#endregion

  //#region form initialize
  formInitialize() {
    this.webCamForm = FormInitialize.initializeWebCamForm(this.fb);
  }
  //#endregion

  //#region setup camera device
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.mediaStream = stream;
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
  //#endregion

  //#region capture image
  capture() {
    if (this.webCamForm.valid) {
      this.drawImageToCanvas(this.video.nativeElement);
      if (this.captures.length > 0)
        this.captures = [];
      this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
      this.isCaptured = true;
    }
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
  //#endregion

  //#region remove current image
  removeCurrent() {
    this.isCaptured = false;
  }
  //#endregion

  //#region image object
  setImageObj() {
    const imageObj: IImageObject = {
      fileName: this.webCamForm.value["fileName"],
      base64String: this.canvas.nativeElement.toDataURL("image/png"),
      imageType: "image/png"
    };
    return imageObj;
  }
  //#endregion

  //#region upload photo
  onSubmit() {
    this.stopCamera();
    this.dialogRef.close({
      fileUploadProp: this.setImageObj()
    });
  }
  //#endregion

  //#region stop web camera
  stopCamera() {
    this.mediaStream.getVideoTracks()[0].stop();
  }
  //#endregion
}
