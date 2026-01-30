import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../Object Models/user/user';
import { EventService } from '../core/features/events/event.service';
import { AddUserFormComponent } from '../Dialogs/global/add-user-form/add-user-form.component';
import { InviteUserDialogComponent } from '../Dialogs/global/invite-user-dialog/invite-user-dialog.component';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from '../core/features/dashboard/dashboard.service';
import { Shift } from '../Object Models/Dashboard Component/shift';
import { AdminNote } from '../Object Models/adminNote';

@Component({
  selector: 'app-userlist2',
  templateUrl: './userlist2.component.html',
  styleUrls: ['./userlist2.component.scss']
})
export class Userlist2Component implements OnInit {

  userList: User[] = [];
  openedUser: User | null = null;
  notes: AdminNote[] = [];
  newNote: string = '';


  searchOpen = false;
  searchTerm = '';
  filteredUserList: User[] = [];

  shiftsByUser: Shift[] = [];

  shiftBreakdownOpen: { [userId: string]: boolean } = {};


  constructor(private dashboardService: DashboardService, public eventService: EventService, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.eventService.allUser$.subscribe(users => {
      this.userList = users;

      this.applyFilter();
    });
    

    this.eventService.getAllUsers();

    this.dashboardService.shiftsByUser.subscribe(shifts => this.shiftsByUser = shifts);
  }
  
  // loadNotes(userId:number): void {
  //   this.eventService.getAdminNotesForUser(userId).subscribe({
  //     next: (res) => (this.notes = res),
  //     error: (err) => console.error('Failed to load notes', err)
  //   });
  // }

  private loadShiftsForOpenedUser(user: User): void {
    if (!user?.id) return;
    this.dashboardService.updateShiftsByUser(user.id, 'confirmed');
  }

  getShiftDurationBreakdown(user: User): { minutes: number, count: number }[] {
    if (!this.openedUser || this.openedUser.id !== user.id) return [];
    if (!this.shiftsByUser?.length) return [];

    const map = new Map<number, number>(); // Dauer in Minuten → Anzahl

    for (const shift of this.shiftsByUser) {
      const start = new Date(shift.startTime).getTime();
      const end = new Date(shift.endTime).getTime();

      const minutes = Math.round((end - start) / (1000 * 60));

      map.set(minutes, (map.get(minutes) || 0) + 1);
    }

    return Array.from(map.entries())
      .map(([minutes, count]) => ({ minutes, count }))
      .sort((a, b) => b.minutes - a.minutes);
  }

  getTotalShiftTime(user: User): string {
    if (!this.openedUser || this.openedUser.id !== user.id) return '0 Std.';

    let totalMinutes = 0;

    for (const shift of this.shiftsByUser) {
      const start = new Date(shift.startTime).getTime();
      const end = new Date(shift.endTime).getTime();
      totalMinutes += Math.round((end - start) / (1000 * 60));
    }

    return this.formatMinutes(totalMinutes);
  }

  formatMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours && minutes) return `${hours} Std. ${minutes} Min.`;
    if (hours) return `${hours} Std.`;
    return `${hours} Std. ${minutes} Min.`;
  }

  toggleShiftBreakdown(user: User, event: Event) {
    event.stopPropagation(); // verhindert dass die ganze Card toggelt
    this.shiftBreakdownOpen[user.id] = !this.shiftBreakdownOpen[user.id];
  }



  toggleSearch() {
    this.searchOpen = !this.searchOpen;

    if (!this.searchOpen) {
      this.searchTerm = '';
      this.applyFilter();
    }
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredUserList = this.userList;
      return;
    }

    this.filteredUserList = this.userList.filter(user =>
      `${user.fName} ${user.lName}`.toLowerCase().includes(term)
    );
  }
  loadNotes(userId:number): void {
    this.eventService.getAdminNotesForUser(userId).subscribe({
      next: (res) => (this.notes = res),
      error: (err) => console.error('Failed to load notes', err)
    });
  }

  addNote(userId:number): void {
    if (!this.newNote.trim()) return;

    this.eventService.createAdminNote(userId, this.newNote.trim()).subscribe({
      next: (note) => {
        this.notes.unshift(note); // add to top
        this.newNote = ''; // reset input
      },
      error: (err) => console.error('Failed to add note', err)
    });
  }

  deleteNote(noteId: number): void {
    if (!confirm('Are you sure you want to delete this note?')) return;

    this.eventService.deleteAdminNote(noteId).subscribe({
      next: () => {
        this.notes = this.notes.filter((n) => n.id !== noteId);
      },
      error: (err) => console.error('Failed to delete note', err)
    });
  }
  toggleUser(user: User): void {
    // console.log("Toggling", this.eventService.loggedInIsAdmin())
    this.openedUser = this.openedUser === user ? null : user;
    this.loadNotes(user.id);

    if (this.openedUser) {
      this.loadShiftsForOpenedUser(this.openedUser);
    }

  }

  makeAdmin(user: User): void {
    console.log('Make admin clicked for', user);
    // backend call here later
    this.eventService.makeUserToAdmin(user.id)

    // For now, just toggle the isAdmin property
    user.isAdmin = true;
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '400px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add user dialog was closed');
    });
  }

  inviteUser(user: User) {
    console.log('Invite user:', user);
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      data: { user: user },
      autoFocus: false,
      panelClass: 'invite-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The invite dialog was closed');
    });
    // later: open invite dialog
  }
  removeUser(user: User): void {
    console.log('Remove user clicked for', user);
    this.eventService.removeUserFromEvent(user.id).subscribe(() => {
      // After successful removal, update the user list
      console.log('User removed from event:', user);
      this.userList = this.userList.filter(u => u.id !== user.id);
      if (this.openedUser === user) {
        this.openedUser = null; // Close the details view if the removed user was opened
      }
    });

  }

  editUser(user: User) {
    // console.log('Edit user clicked for', user);
    // // Open a dialog or navigate to an edit page
    // // For now, just log the action
    // if (!user.phone) {
    //   return
    // }
    // this.authService.editUserPhone(user.phone).subscribe((updatedUser) => {
    //   console.log('User updated:', updatedUser);
    //   // Update the user in the userList
    //   const index = this.userList.findIndex(u => u.id === updatedUser.id);
    //   if (index !== -1) {
    //     this.userList[index] = updatedUser;
    //   }
    // });
  }

  removeAdmin(user: User): void {
    console.log('Remove admin clicked for', user);
    this.eventService.removeAdminRights(user.id).subscribe((res) => {
      console.log('Admin rights removed for', user);
      console.log(res);
    });

    // For now, just toggle the isAdmin property
    user.isAdmin = false;
  }

  toggleAdmin(person: any) {
    if (person.isAdmin) {
      this.removeAdmin(person);
    } else {
      this.makeAdmin(person);
    }
  }

  test(userId: any) {
    this.eventService.createInvite(userId).subscribe({
      next: invite => console.log('Invite created:', invite),
      error: err => console.error(err)
    });
  }
}
