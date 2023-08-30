import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadButtonComponent } from './file-upload-button.component';

describe('FileUploadButtonComponent', () => {
  let component: FileUploadButtonComponent;
  let fixture: ComponentFixture<FileUploadButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadButtonComponent]
    });
    fixture = TestBed.createComponent(FileUploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
