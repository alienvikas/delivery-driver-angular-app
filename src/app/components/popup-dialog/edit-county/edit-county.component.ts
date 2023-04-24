import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountyService } from 'src/app/services/county/county.service';

@Component({
  selector: 'app-edit-county',
  templateUrl: './edit-county.component.html',
  styleUrls: ['./edit-county.component.scss']
})
export class EditCountyComponent {
  countyForm!: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder,
    private countyService: CountyService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<EditCountyComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.countyForm = this.fb.group({
      id: new FormControl(this.data.country.id),
      name: new FormControl(this.data.country.name, [Validators.required]),
    });
  }

  onBlur() {
    if (!this.submitted)
      this.countyForm.markAsUntouched();
  }

  onClick() {
    this.submitted = true;
  }

  onUpdate(form: any) {
    this.spinner.show();
    if (this.countyForm.invalid) { this.spinner.hide(); return; }// stop here if form is invalid
    this.countyService.update(this.countyForm.value.id, form).subscribe((res) => {
      this.dialogRef.close();
      this.spinner.hide();
    })
  }

  get f() { return this.countyForm.controls; }
}
