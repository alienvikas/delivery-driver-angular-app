import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-shift-calendar',
  templateUrl: './shift-calendar.component.html',
  styleUrls: ['./shift-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftCalendarComponent implements OnInit {
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin, bootstrap5Plugin],
    initialView: 'timeGridWeek',
    height: 570,
    allDaySlot: false,
    nowIndicator: true,
    themeSystem: 'standard',
    handleWindowResize: true,
    //contentHeight: 766,
    timeZone: 'local', // the default (unnecessary to specify)
    headerToolbar: {
      //left: 'prev,next today',
      left: 'prev',
      center: 'title',
      right: 'next'
      //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    views: {
      timeGrid: {
        // options apply to timeGridWeek and timeGridDay views
      },
    },
    events: [
      { title: 'Meeting1', start: '2023-08-28T12:30:00Z', end: '2023-08-28T1:30:00Z' }
    ],
    select: function (info) {
      alert('selected ' + info.startStr + ' to ' + info.endStr);
      console.log("mạnh đã ở đây")
    },
    dateClick: function (arg) {
      alert('date click');
    },
    eventResize: function (info) {
      alert('window rezose');
    },
  };

  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin, bootstrap5Plugin],
  //   contentHeight: 'auto',
  //   allDaySlot: false,
  //   initialView: 'timeGridWeek',
  //   handleWindowResize: true,
  //   headerToolbar: {
  //     //left: 'prev,next today',
  //     left: '',
  //     center: '',
  //     right: ''
  //     //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
  //   },
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  // }

  constructor(private httpClient: HttpClient) { }

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  ngOnInit() {
    setTimeout(() => {
      return this.httpClient
        .get('http://localhost:8888/event.php')
        .subscribe((res: any) => {
          this.Events.push(res);
          console.log(this.Events);
        });
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.Events,
        dateClick: this.onDateClick.bind(this),
      };
    }, 2500);
  }

}
