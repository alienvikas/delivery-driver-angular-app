import {
  Calendar,
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
  EventSourceFuncArg
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, signal } from '@angular/core';
import { CalendarShiftService } from 'src/app/services/calendar-shift/calendar-shift.service';
import { ToastrService } from 'ngx-toastr';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import momentPlugin from '@fullcalendar/moment';
import bootstrap from '@fullcalendar/bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCalendarShiftComponent } from '../../popup-dialog/add-calendar-shift/add-calendar-shift.component';
import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-week-view',
  templateUrl: './calendar-week-view.component.html',
  styleUrls: ['./calendar-week-view.component.scss'],
})

export class CalendarWeekViewComponent implements OnInit {
  currentEvents = signal<EventApi[]>([]);
  calendarEvents: EventInput[] = [];
  calendarApi!: Calendar;
  pluginArry = [dayGridPlugin, timeGridPlugin, interactionPlugin,
    momentPlugin, bootstrap5Plugin, resourceTimelinePlugin,
    bootstrapPlugin
  ];
  calendarOptions = this.setCalendarConfiguration();

  constructor(private changeDetector: ChangeDetectorRef,
    private calendarShiftService: CalendarShiftService,
    public toastr: ToastrService, private notificationService: NotificationService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: any) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  createEventId() {
    return "";
  }
  //#endregion

  handleDateClick(arg: any) {
    //alert('date click!' + arg.dateStr);
    const dialogRef = this.dialog.open(AddCalendarShiftComponent, {
      width: '60rem',
      disableClose: true,
    });
  }

  openShiftDialog() {
    const dialogRef = this.dialog.open(AddCalendarShiftComponent, {
      width: '60rem',
      disableClose: true,
    });
  }

  async loadEvents(args: EventSourceFuncArg): Promise<EventInput[]> {
    const events: EventInput[] = [];
    return new Promise<EventInput[]>((resolve) => {
      this.calendarShiftService.findAll().subscribe(result => {
        result.forEach((val: any) => {
          console.log(val)
          let startDate = moment(val.shiftStartDate);
          let endDate = moment(val.shiftFinishDate);
          events.push({
            id: val.id,
            title: val.shiftAutoNumber,
            start: startDate.format("YYYY-MM-DD") + " " + val.shiftStartTime,
            end: endDate.format("YYYY-MM-DD") + " " + val.shiftFinishTime,
            color: '#' + val.shiftColor
          });
          resolve(events);
        });
      });
    });
  }

  setCalendarConfiguration() {
    let _calendarOptions: CalendarOptions = {
      plugins: this.pluginArry,
      themeSystem: 'bootstrap5',
      navLinks: true,
      forceEventDuration: true,
      dateClick: this.handleDateClick.bind(this),
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      events: this.loadEvents.bind(this),
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      initialView: 'timelineWeek',
      slotMinTime: '00:00:00',
      slotMaxTime: '24:00,00',
      slotDuration: '1:00',
      snapDuration: '0:15',
      titleFormat: 'MMMM D , YYYY',
      slotLabelFormat: [
        'ddd DD/MM/YY',
        'HH'
      ],
      timeZone: 'UTC',
      selectOverlap: true,
      eventColor: 'red',
      lazyFetching: true,
      windowResizeDelay: 0,
      eventLongPressDelay: 0,
      longPressDelay: 0,
      displayEventEnd: true,
      editable: true,
      allDaySlot: false,
      nowIndicator: true,
      eventBackgroundColor: '#ff0000',
      weekends: true,
      height: 550
    }
    return _calendarOptions;
  }
}

