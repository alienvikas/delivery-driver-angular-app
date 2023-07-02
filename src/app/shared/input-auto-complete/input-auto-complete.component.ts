import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-input-auto-complete',
  templateUrl: './input-auto-complete.component.html',
  styleUrls: ['./input-auto-complete.component.scss']
})
export class InputAutoCompleteComponent implements OnInit {
  @Input() labelText: string = '';
  @Input() inputPlaceholder: string = '';
  filteredData!: Observable<any[]>;
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';
  @Input() dropdownData: any;
  @Input() iconType: string = '';
  @Input() errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.formGroup);
    this.filteredData = this.formGroup.controls[this.controlName].valueChanges.pipe(
      startWith(''),
      map(d => (d ? this.filterData(d) : this.dropdownData.slice())));
  }

  displayFn(option: any) {
    if (option != null)
      return option.name;
  }

  private filterData(value: any): any[] {
    let filterValue = "";
    if (value.name != undefined)
      filterValue = value.name.toLowerCase();
    else
      filterValue = value.toLowerCase();

    let result = this.dropdownData.filter((d: any) => d.name.toLowerCase().includes(filterValue));
    return result;
  }
}
