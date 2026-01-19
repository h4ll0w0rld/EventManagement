import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShiftplanService } from '../Services/Shiftplan Service/shiftplan.service';
import { GlobalUserListComponent } from '../Dialogs/global/global-userlist-dialog/global-user-list.component';
import { EventService } from '../core/features/events/event.service';
import { EventhubService } from '../core/features/eventhub/eventhub.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { User } from '../Object Models/user/user';
import { AddEventComponent } from '../Dialogs/global/add-event/add-event.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Kein Event ausgewählt';
  unlocked: boolean = false;
  showEventDropdown = false;
  userEvents: any[] = [];
  showBackArrow = false;
  showUserMenu = false;
  user: any | null = null;

  private initials$!: Observable<string>;



  constructor(
    public shiftplanService: ShiftplanService,
    private dialog: MatDialog,
    public eventService: EventService,
    private eventHubService: EventhubService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,



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
    //this.eventHubService.loadUserEvents();
    this.eventHubService.events$.subscribe(events => {
      this.userEvents = events;
      console.log("User events updated:", events);  
      if (events.length == 0 && this.router.url !== '/') {

        this.dialog.open(AddEventComponent, {
          width: '80vw',
          height: 'auto',
        });
      }
    });

    if (this.router.url.includes('shiftplan') || this.router.url.includes('userlist')) {
      console.log('We are on a shiftplan route!');
      this.showBackArrow = true;
    }

    this.authService.user$.subscribe(user => {
      this.user = user;
      this.cdr.detectChanges();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Check if the click was inside the event dropdown or the toggle button
    const clickedInsideEvent = target.closest('.event-dropdown') || target.closest('.home-icon-div');
    if (!clickedInsideEvent) {
      this.showEventDropdown = false;
    }

    // Check if click was inside user menu or user icon
    const clickedInsideUser = target.closest('.user-dropdown') || target.closest('.user-icon');
    if (!clickedInsideUser) {
      this.showUserMenu = false;
    }
  }

  toggleUserMenu() {
    console.log('Toggling user menu');
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    console.log('Logging out...');
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/authLanding']);
    });
    //this.eventService.logout(); // your existing logout method
    //this.router.navigate(['/login']);
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
    this.dialog.open(AddEventComponent, {
      width: '80vw',
      height: 'auto',
    });
    this.eventHubService.loadUserEvents();
    //this.router.navigate(['/add-event']);
    // Open dialog or navigate to event creation
  }

  openUserMenu() {
    // You can later hook user menu dropdown here
  }
  goBack() {
    this.router.navigate(['/']); // oder z. B. this.router.navigate(['/overview']);
  }


  getInitials(): string {
    // or however you read the user

    if (!this.user || !this.user.firstName || !this.user.lastName) {
      console.log("Bigg problem", this.user);
      return "";
    }

    return this.user.firstName.charAt(0).toUpperCase() + this.user.lastName.charAt(0).toUpperCase();
  }

  globalUserlist() {
    this.dialog.open(GlobalUserListComponent, {
      width: '80vw',
      height: 'auto',
    });
  }
}
