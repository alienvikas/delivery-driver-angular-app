import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormInitialize } from 'src/app/form-initialization';
import { CountyService } from 'src/app/services/county/county.service';

@Component({
  selector: 'app-add-edit-uk-area',
  templateUrl: './add-edit-uk-area.component.html',
  styleUrls: ['./add-edit-uk-area.component.scss']
})
export class AddEditUkAreaComponent {
  //#region variables
  ukAreaForm!: FormGroup;
  submitted: boolean = false;
  //#endregion

  //#region constructor
  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService,
    private countyService: CountyService) {
    this.ukAreaForm = FormInitialize.initializeUKAreaForm(fb);
  }
  //#endregion

  //#region blur function
  onBlur() {
    if (!this.submitted)
      this.ukAreaForm.markAsUntouched();
  }
  //#endregion

  //#region submit form
  onSubmit(form: any) {
    if (this.ukAreaForm.invalid) return; // stop here if form is invalid
    this.spinner.show();
    this.countyService.save(form).subscribe(res => {
      this.spinner.hide();
    })
  }
  //#endregion

  //#region on click
  onClick(){}
  //#endregion

  //#region get form controls
  get f() { return this.ukAreaForm.controls; }
  //#endregion
}
