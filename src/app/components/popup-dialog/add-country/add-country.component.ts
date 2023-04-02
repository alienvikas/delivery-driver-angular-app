import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent {
  countryForm!: FormGroup;
  submitted: boolean = false;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['action', 'name', 'phonecode'];
  countryDataSource = new MatTableDataSource();

  constructor(private fb: FormBuilder,
    private countryService: CountryService,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.countryDataSource.paginator = this.paginator;
    this.countryDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      countryIcon: new FormControl(null, [Validators.required]),
      countryCode: new FormControl(null, [Validators.required])
    });
  }

  onBlur() {
    if (!this.submitted)
      this.countryForm.markAsUntouched();
  }

  onClick() {
    this.submitted = true;
  }

  onSubmit(form: any) {
    if (this.countryForm.invalid) return; // stop here if form is invalid
    this.countryService.saveCountry(form).subscribe((res) => {
    })
  }

  onReset() {
    this.submitted = false;
  }

  get f() { return this.countryForm.controls; }
}
