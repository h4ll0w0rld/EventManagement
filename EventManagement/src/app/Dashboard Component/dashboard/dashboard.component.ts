import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/Object Models/Dashboard Component/shift';
import { User } from 'src/app/Object Models/user/user';
import { DashboardService } from 'src/app/core/features/dashboard/dashboard.service';
import { EventService } from 'src/app/core/features/events/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  shiftsByUser: Shift[] = [];
  shiftRequests: Shift[] = [];
  allUsers: User[] = [];
  selectedUser: User | null = null;

  constructor(
    private dashboardService: DashboardService,
    public eventService: EventService
  ) { }

  ngOnInit(): void {
    // Subscribe to all users
    this.eventService.allUser$.subscribe(users => {
      this.allUsers = users;

      // Load selectedUser from localStorage or loggedInUser
      const stored = localStorage.getItem('selected-dashboard-user');
      if (stored) {
        const storedUser = JSON.parse(stored);
        // Find the user object in allUsers with same ID
        this.selectedUser = this.allUsers.find(u => u.id === storedUser.id) ?? this.allUsers[0] ?? null;
      } else {
        this.selectedUser = this.eventService.loggedInUser ?? this.allUsers[0] ?? null;
      }

      this.loadShiftsForSelectedUser();
    });


    // Subscribe to shifts
    this.dashboardService.shiftsByUser.subscribe(shifts => this.shiftsByUser = shifts);
    this.dashboardService.shiftRequests.subscribe(requests => this.shiftRequests = requests);

    // Fetch all users
    this.eventService.getAllUsers();
  }

  /** Called when a user is clicked/selected */
  onUserSelected(user: User): void {
    this.selectedUser = user;
    localStorage.setItem('selected-dashboard-user', JSON.stringify(user));
    this.loadShiftsForSelectedUser();
  }

  /** Load shifts and shift requests for the currently selected user */
  private loadShiftsForSelectedUser(): void {
    if (!this.selectedUser) return;

    const userId = this.selectedUser.id;
    this.dashboardService.updateShiftsByUser(userId, 'confirmed');
    this.dashboardService.updateShiftRequests(userId, 'requested');
  }
}
