import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CountyService } from 'src/app/services/county/county.service';

@Component({
  selector: 'app-add-county',
  templateUrl: './add-county.component.html',
  styleUrls: ['./add-county.component.scss']
})
export class AddCountyComponent {
  countyForm!: FormGroup;
  submitted: boolean = false;
  displayedColumns: string[] = ['action', 'name'];
  countyDataSource = new MatTableDataSource();

  constructor(private fb: FormBuilder,
    private countyService: CountyService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.countyDataSource.paginator = this.paginator;
    this.countyDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.countyForm = this.fb.group({
      name: new FormControl(null, [Validators.required])
    });
  }

  onBlur() {
    if (!this.submitted)
      this.countyForm.markAsUntouched();
  }

  onClick() {
    this.submitted = true;
  }

  onSubmit(form: any) {
    if (this.countyForm.invalid) return; // stop here if form is invalid
    this.spinner.show();
    this.countyService.save(form).subscribe((res) => {
      this.spinner.hide();
    })
  }

  onReset() {
    this.submitted = false;
  }

  get f() { return this.countyForm.controls; }
}
