import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { GlobalUserListComponent } from '../Dialogs/global/global-userlist-dialog/global-user-list.component';
import { EventService } from '../core/features/events/event.service';
import { EventhubService } from '../core/features/eventhub/eventhub.service';
import { NavigationEnd, Router } from '@angular/router';



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
    public eventService: EventService,
    private eventHubService: EventhubService,
    private router: Router,
    private cdr: ChangeDetectorRef


  ) {
    this.eventService.currentEvent$.subscribe(event => {
      if (event)
        this.title = event.name;
       
    });
    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    });

    // this.eventService.getRoles();
  }

  ngOnInit(): void {
    this.eventHubService.events$.subscribe(events => {
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
      this.eventHubService.loadUserEvents();
    }
  }

  selectEvent(event: any) {
    this.title = event.name;
    this.eventService.setCurrentEvent(event)
    this.eventService.getAllUsers();
    
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
    const user = this.eventService.loggedInUser; // or however you read the user

    if (!user || !user.firstName || !user.lastName) {
      return "";
    }

    return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
  }

  globalUserlist() {
    this.dialog.open(GlobalUserListComponent, {
      width: '80vw',
      height: 'auto',
    });
  }
}
