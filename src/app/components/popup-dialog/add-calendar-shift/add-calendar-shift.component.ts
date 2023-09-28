import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FormInitialize } from 'src/app/form-initialization';
import { IDays } from 'src/app/interface/days';
import { IPayment } from 'src/app/interface/paytment-interface';
import { CalendarShiftService } from 'src/app/services/calendar-shift/calendar-shift.service';

@Component({
  selector: 'app-add-calendar-shift',
  templateUrl: './add-calendar-shift.component.html',
  styleUrls: ['./add-calendar-shift.component.scss']
})
export class AddCalendarShiftComponent implements OnInit {

  addCalendarShiftForm: FormGroup = FormInitialize.initializeCalendarShiftForm(this.fb);
  submitted: boolean = false;
  dayList: IDays[] = [
    { id: 1, value: this.translate.instant('Monday') },
    { id: 1, value: this.translate.instant('Tuesday') },
    { id: 1, value: this.translate.instant('Wednesday') },
    { id: 1, value: this.translate.instant('Thursday') },
    { id: 1, value: this.translate.instant('Friday') },
    { id: 1, value: this.translate.instant('Saturday') },
    { id: 1, value: this.translate.instant('Sunday') },
  ];
  shiftExtraBonusList = this.getExtraBonusList(1, 50, 0.25);
  disabled = false;
  color: ThemePalette = 'primary';
  touchUi = false;

  constructor(private fb: FormBuilder, private translate: TranslateService,
    private calendarShiftService: CalendarShiftService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  addShift(data: any) {
    debugger;
    if (this.addCalendarShiftForm.invalid) return; // stop here if form is invalid 
    this.setFormData(data);
    this.calendarShiftService.save(this.addCalendarShiftForm.value).subscribe(res => {
      this.snackBar.open("Shift added successfully !!!", "OK")
    })
  }

  onBlur() {
    if (!this.submitted)
      this.addCalendarShiftForm.markAsUntouched();
  }

  onChangeHour(event: any) {
    console.log("event", event);
  }

  onClick() {
    this.submitted = true;
    this.addCalendarShiftForm.markAllAsTouched();
  }

  getExtraBonusList(initialAmt: number, endAmt: number, incrementBy: number) {
    var bonusList: IPayment[] = [];
    for (let index = 0; initialAmt <= endAmt; index++) {
      bonusList.push({ id: index, value: '£' + initialAmt.toFixed(2) })
      initialAmt = initialAmt + incrementBy;
    }
    return bonusList;
  }

  setFormData(formData: any) {
    this.addCalendarShiftForm.patchValue({
      shiftStartDay: formData.shiftStartDay.value,
      shiftFinishDay: formData.shiftFinishDay.value,
      shiftExtraBonus: formData.shiftExtraBonus.value,
      shiftPricePerHour: formData.shiftPricePerHour.value,
      shiftExtraPerDrop: formData.shiftExtraPerDrop.value,
      shiftExtra: formData.shiftExtra.value,
      shiftMinimumPerHour: formData.shiftMinimumPerHour.value,
      shiftColor: formData.shiftColor.hex
    })
  }

  get f() { return this.addCalendarShiftForm.controls; }
}
