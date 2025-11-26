import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { GlobalUserListComponent } from '../Dialogs/global/global-userlist-dialog/global-user-list.component';
import { EventServiceService } from '../Services/Event Service/event-service.service';
import { EventhubService } from '../Services/Eventhub Service/eventhub.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from '../Object Models/user/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Festival am Waldrand';
  unlocked: boolean = false;
  showEventDropdown = false;
  userEvents: any[] = [];
  showBackArrow = false;

  constructor(
    public shiftplanService: ShiftplanService,
    private dialog: MatDialog,
    public eventService: EventServiceService,
    private eventHubService: EventhubService,
    private router: Router,
    private cdr: ChangeDetectorRef


  ) {
    this.eventService.getCurrentEvent().subscribe(event => {
      this.title = event.name;
    });

    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    });

    this.eventService.getRoles();
  }

  ngOnInit(): void {
    this.eventHubService.allEvents.subscribe(events => {
      this.userEvents = events;
    });

    if (this.router.url.includes('shiftplan') || this.router.url.includes('userlist')) {
      console.log('We are on a shiftplan route!');
      this.showBackArrow = true;
    }
  }
  test() {

    console.log("is the shit active ? ", this.showBackArrow)
  }
  toggleEventDropdown() {
    this.showEventDropdown = !this.showEventDropdown;

    if (this.showEventDropdown) {
      this.eventHubService.getUsersEvents();
    }
  }

  selectEvent(event: any) {
    this.title = event.name;
    this.eventService.setCurrentEvent(event);
    this.eventService.getAllUser();
    this.showEventDropdown = false;
    // Additional logic: notify service of new selection
  }

  createNewEvent() {
    console.log('Create new event clicked');
    this.router.navigate(['/add-event']);
    // Open dialog or navigate to event creation
  }

  openUserMenu() {
    // You can later hook user menu dropdown here
  }
  goBack() {
    this.router.navigate(['/']); // oder z. B. this.router.navigate(['/overview']);
  }


  getInitials(): string {
    let user: User = this.eventService.loggedInUser;
    const initials = `${user.fName.charAt(0).toUpperCase()}.${user.lName.charAt(0).toUpperCase()}.`;
    return initials; // Replace with real user data if needed
  }

  globalUserlist() {
    this.dialog.open(GlobalUserListComponent, {
      width: '80vw',
      height: 'auto',
    });
  }
}
