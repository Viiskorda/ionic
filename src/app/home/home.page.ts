import { CalendarComponent } from "ionic2-calendar/calendar";
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  event = {
    title: "",
    desc: "",
    startTime: "",
    endTime: "",
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: "month",
    currentDate: new Date()
  };

  viewTitle = "";
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      title: "",
      desc: "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      desc: this.event.desc,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay
    };

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        )
      );
      eventCopy.endTime = new Date(
        Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1)
      );
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  editEvent() {}

  removeEvent() {
    // text: 'Delete';
    // handler: () => {

    //   for (var i = 0; i <= this.eventSource.length; i++) {
    //     if (this.eventSource[i] ) {
    //      this.eventSource.splice(i)
         
         
    //     }
        
    //   }
    //   //this.eventSource.splice(event)
    //   console.log('delete clicked');
    // }


    // splice() the array of events
  }

  onCurrentDateChanged() {}
  reloadSource() {}

  // Change current month/week/day
  next() {
    var swiper = document.querySelector(".swiper-container")["swiper"];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector(".swiper-container")["swiper"];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, "medium", this.locale);
    let end = formatDate(event.endTime, "medium", this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: "From: " + start + "<br><br>To: " + end,
      buttons: [{
				text: "Delete",
				action: "removeEvent"
			},"OK"]
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  }
}
