import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, interval, switchMap, Subscription, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../../Services/config.service';
import { EventModel } from 'src/app/Object Models/EventModel';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { User } from 'src/app/Object Models/user/user';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { EventhubService } from '../eventhub/eventhub.service';

@Injectable({
  providedIn: 'root'
})
export class EventService implements OnDestroy {

  private currentEventSubject = new BehaviorSubject<EventModel | null>(null);
  currentEvent$ = this.currentEventSubject.asObservable();

  private currentCatSubject = new BehaviorSubject<CategoryContent | null>(null);
  currentCat$ = this.currentCatSubject.asObservable();

  private allUserSubject = new BehaviorSubject<User[]>([]);
  allUser$ = this.allUserSubject.asObservable();
  private categoriesSubject = new BehaviorSubject<CategoryContent[]>([]);
  categories$ = this.categoriesSubject.asObservable();
  availableUsers$ = new BehaviorSubject<User[]>([]);

  refreshInterval: Subscription = Subscription.EMPTY;
  loggedInUser: any;
  isAdmin = true;

  constructor(
    private http: HttpClient,
    private conf: ConfigService,
    private authService: AuthService,
    private eventHubService: EventhubService
  ) {
    this.loadInitialState();
    this.authService.user$
      .pipe(
        filter(user => !!user),
        switchMap(user =>
          this.eventHubService.events$   // events loaded for this user
        ),
        map(events => events?.[0] || null)
      )
      .subscribe(event => {
        this.currentEventSubject.next(event);
      });

    // Start periodic category refresh
    // this.refreshInterval = interval(5000)
    //   .pipe(switchMap(() => this.updateCategories()))
    //   .subscribe();
  }
  ngOnInit(): void {
    // Start periodic category refresh
    this.refreshInterval = interval(5000)
      .pipe(switchMap(() => this.updateCategories()))
      .subscribe();

    this.authService.user$.subscribe(user => {
      console.log("EventService detected logged in user:", user);
      this.loggedInUser = user;
    });

    this.setCurrentEvent(this.eventHubService.events$.pipe(
      map(events => events[0] || null)
    ) as any);

    console.log("EventService initialized with event:", this.currentEvent);
  }

  ngOnDestroy(): void {
    this.refreshInterval.unsubscribe();
  }
  // loadUserEvents() {

  //   if (!this.loggedInUser) return;
  //   console.log('Loading events for user', this.loggedInUser);
  //   const url = `${this.conf.rootUrl}/user/eventsByUser/user_id/${this.loggedInUser.id}`;

  //   this.http.get<EventModel[]>(url, { headers: this.authService.getAuthHeaders() })
  //     .pipe(
  //       catchError(err => {
  //         console.error('Error loading events', err);
  //         if (err.status === 401) this.authService.refreshToken();
  //         return of([]);
  //       })
  //     )
  //     .subscribe(events => { this.currentEventSubject.next(events); console.log('Loaded events:', events); });
  // }


  private loadInitialState() {
    const storedEvent = localStorage.getItem('curr-event');
    if (storedEvent) this.currentEventSubject.next(JSON.parse(storedEvent));

    const storedCat = localStorage.getItem('curr-cat');
    if (storedCat) this.currentCatSubject.next(JSON.parse(storedCat));

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser);
      this.authService.setUser(this.loggedInUser);
    }
  }

  get currentEvent(): EventModel | null {
    return this.currentEventSubject.getValue();
  }

  get currentCategory(): CategoryContent | null {
    return this.currentCatSubject.getValue();
  }

  setCurrentEvent(event: EventModel) {
    this.currentEventSubject.next(event);
    localStorage.setItem('curr-event', JSON.stringify(event));
  }

  setCurrentCategory(cat: CategoryContent) {
    this.currentCatSubject.next(cat);
    localStorage.setItem('curr-cat', JSON.stringify(cat));
  }

  updateCategories(): Observable<CategoryContent[]> {
    const eventId = this.currentEvent?.id;
    if (!eventId) return of([]);

    return this.http.get<any>(`${this.conf.rootUrl}/shiftCategory/${eventId}/all`, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      map(res => {
        return res.shift_categories.map((category: any) => {

          const shifts: Shift[] = category.shifts.map((shift: any) => {

            const activities: Activity[] = shift.activities.map((activity: any) => {

              const user = activity.user
                ? new User(
                  activity.user.id,
                  activity.user.firstName,
                  activity.user.lastName,
                  activity.user.email,
                  ""
                )
                : null;

              return new Activity(activity.id, user || new User(-1, "", "", "", ""), activity.status);
            });

            return new Shift(
              shift.id,
              shift.startTime,   // restore Date
              shift.endTime,
              activities,
              shift.isActive
            );
          });

          return new CategoryContent(
            category.id,
            category.name,
            category.description,
            category.interval,
            shifts
          );
        });
      })
    );
  }

  /** Fetch all users for current event and update the BehaviorSubject */
  getAllUsers(): void {
    console.log("Fetching all users for current event");

    const eventId = this.currentEvent?.id;
    if (!eventId) {
      this.allUserSubject.next([]);
      return;
    }

    this.http
      .get<any[]>(`${this.conf.rootUrl}/event/${eventId}/allUsersByEvent`, {
        headers: this.authService.getAuthHeaders()
      })
      .pipe(
        map(rawUsers =>
          rawUsers.map(u =>
            new User(
              u.id,              // backend id → ids
              u.firstName,       // backend firstName → fName
              u.lastName,        // backend lastName → lName
              u.emailAddress,    // backend emailAddress → email
              "",                // backend does NOT send password -> empty string
              u.user_event.admin        // backend isAdmin → isAdmin
            )
          )
        ),
        catchError(err => {
          console.error('Error fetching users', err);
          return of([]);
        })
      )
      .subscribe(mappedUsers => {
        console.log("Updating users", mappedUsers);
        this.allUserSubject.next(mappedUsers);
      });
  }



  createInvite( email: string): Observable<any> {

    const eventId = this.currentEvent?.id;
    console.log("Creating invite for event ID:", eventId, "and email:", email);
    return this.http.post<any>(`${this.conf.rootUrl}/event/${eventId}/createInvite`, { email, eventId });
  }

  /**
   * Validate an invite token
   */
  validateInvite(token: string): Observable<any> {
    return this.http.get<any>(`${this.conf.rootUrl}/invite/validate/${token}`);
  }

  /**
   * Accept an invite token and join the event
   */
  acceptInvite(token: string): Observable<any> {
    return this.http.post(`${this.conf.rootUrl}/invite/accept`, { token });
  }
  /** Check if a user is admin */
  userIsAdmin(user: User): Observable<boolean> {
    const eventId = this.currentEventSubject.getValue()?.id;
    if (!eventId || !user) return of(false);
    console.log("Checking admin status for user:", user);
    return this.http.get<{ isAdmin: boolean }>(`${this.conf.rootUrl}/event/${eventId}/isAdmin/user_id/${user.id}`, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      map(res => res.isAdmin),
      catchError(() => of(false))
    );
  }

  /** Add a new user and update the BehaviorSubject immediately */
  addUser(fName: string, lName: string): Observable<User> {
    const eventId = this.currentEvent?.id;
    if (!eventId) return of(null as any);

    return this.http.post<User>(`${this.conf.rootUrl}/event/${eventId}/addUser`, { fName, lName }, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      tap((newUser: User) => {
        // Update the BehaviorSubject immediately
        console.log("Adding new user to BehaviorSubject:", newUser);
        const currentUsers = this.allUserSubject.getValue();
        this.allUserSubject.next([...currentUsers, newUser]);
      }),
      catchError(err => {
        console.error('Error adding user:', err);
        return of(null as any);
      })
    );
  }

  addUnregUser(firstName: string, lastName: string): void {
    console.log("Adding unregistered user:", firstName, lastName);
    const eventId = this.currentEvent?.id;

    if (!eventId || eventId === -1) {
      console.warn("No valid event selected.");
      return;
    }

    const url = `${this.conf.rootUrl}/user/${eventId}/add/`;
    const body = { firstName, lastName };
    const headers = this.authService.getAuthHeaders();

    this.http.post(url, body, { headers: headers }).subscribe({
      next: (res: any) => {
        console.log("Unregistered user added to event:", res);

        // OPTIONAL: refresh user list if backend doesn’t return new user
        this.getAllUsers();
      },
      error: (err) => {
        console.error("Failed to add unregistered user:", err);
      }
    });
  }
  /** Add a registered user to the event */
  userToEvent(userId: number): Observable<any> {
    const eventId = this.currentEvent?.id;
    if (!eventId) return of(null);

    const url = `${this.conf.rootUrl}/event/addUserToEvent/event_id/${eventId}/user_id/${userId}`;

    return this.http.get(url, { headers: this.authService.getAuthHeaders() }).pipe(
      tap(() => this.getAllUsers())
    );
  }

  /** Remove user from event */
  removeUserFromEvent(userId: number): Observable<any> {
    const eventId = this.currentEvent?.id;
    if (!eventId) return of(null);

    const url = `${this.conf.rootUrl}/event/${eventId}/removeUserFromEvent/user_id/${userId}`;

    return this.http.get(url, { headers: this.authService.getAuthHeaders() }).pipe(
      tap(() => this.getAllUsers())
    );
  }
  removeAdminRights(id: number): Observable<any> {
    const eventId = this.currentEvent?.id;
    if (!eventId) return of(null);

    const url = `${this.conf.rootUrl}/permission/${eventId}/removeAdmin/user_id/${id}`;

    return this.http.put(url, { headers: this.authService.getAuthHeaders() }).pipe(
      tap(() => this.getAllUsers())
    );
  }

  /** Create a new category */
  addCategory(name: string, description: string, eventId: number, shiftBlocks: any[]): Observable<any> {
    const url = `${this.conf.rootUrl}/shiftCategory/${eventId}/add`;

    return this.http.post(url, { name, description, event_id: eventId, shiftBlocks }, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      tap(() => this.updateCategories().subscribe())
    );
  }

  /** Delete category */
  deleteCategory(categoryId: number): Observable<any> {
    const eventId = this.currentEvent?.id;
    if (!eventId) return of(null);

    const url = `${this.conf.rootUrl}/shiftCategory/${eventId}/delete/id/${categoryId}`;

    return this.http.delete(url, { headers: this.authService.getAuthHeaders() }).pipe(
      tap(() => this.updateCategories().subscribe())
    );
  }

  /** Add shift block to category */
  addShiftBlockToCategory(newBlock: any, catId: number): Observable<any> {
    const eventId = this.currentEvent?.id;
    if (!eventId) return of(null);

    const url = `${this.conf.rootUrl}/shiftCategory/${eventId}/addShiftBlockToCategory/shift_category_id/${catId}`;
    const body = { shiftBlocks: [newBlock] };

    return this.http.post(url, body, { headers: this.authService.getAuthHeaders() }).pipe(
      tap(() => this.updateCategories().subscribe())
    );
  }

  /** Get available users for activity */
  getAvailableUsers(_shiftCatId: number, _activityId: number) {

    if (this.currentEvent && this.currentCategory) {
      // /activity/:current_event_id/availableUsers/shift_category_id/:shift_category_id/activity_id/:activity_id
      this.http.get(this.conf.rootUrl + '/activity/' + this.currentEvent.id + '/availableUsers/shift_category_id/' + this.currentCategory.id + '/activity_id/' + _activityId, { headers: this.authService.getAuthHeaders() }).subscribe((res: any) => {
        const users: User[] = res.map((user: any) => new User(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.password

        ));
        this.availableUsers$.next(users);
      });
    } else if (!this.currentCategory) console.log("No cat selected")
    else console.log("No event selected")
  }



  /** Register user for activity */
  regUserForActivity(activityId: number, userId: number): Observable<any> {
    const eventId = this.currentEvent?.id;
    const catId = this.currentCategory?.id;

    if (!eventId || !catId) return of(null);

    const url = `${this.conf.rootUrl}/activity/${eventId}/requestUser/shift_category_id/${catId}/activity_id/${activityId}/user_id/${userId}`;

    return this.http.put(url, {}, { headers: this.authService.getAuthHeaders() });
  }
  private refreshCategoriesSubject = new BehaviorSubject<void>(undefined);
  refreshCategories$ = this.refreshCategoriesSubject.asObservable();

  triggerCategoryReload() {
    this.refreshCategoriesSubject.next();
  }

  /** Remove user from activity */
  delUserFromActivity(activityId: number): Observable<any> {
    const eventId = this.currentEvent?.id;
    const catId = this.currentCategory?.id;
    console.log("Deleting user from activity:", activityId, "in event:", eventId, "category:", catId);
    if (!eventId || !catId) return of(null);
    console.log("Proceeding with delete request");
    const url = `${this.conf.rootUrl}/activity/${eventId}/removeUser/shift_category_id/${catId}/activity_id/${activityId}`;

    return this.http.put(url, { headers: this.authService.getAuthHeaders() });
  }

  /** Delete a shift */
  deleteShift(catId: number, shiftId: number): Observable<any> {
    const eventId = this.currentEvent?.id;
    if (!eventId) return of(null);

    const url = `${this.conf.rootUrl}/shift/${eventId}/shift_category_id/${catId}/shift_id/${shiftId}`;

    return this.http.delete(url, { headers: this.authService.getAuthHeaders() }).pipe(
      tap(() => this.updateCategories().subscribe())
    );
  }

  /** Claim user (legacy invitation) */
  claimUserInEvent(eventId: number, userId: number, fName: string, lName: string) {
    const url = `${this.conf.rootUrl}/user/${eventId}/claimUser/${userId}/${encodeURIComponent(fName)}/${encodeURIComponent(lName)}`;
    return this.http.get(url, { headers: this.authService.getAuthHeaders() });
  }
  makeUserToAdmin(_userId: number) {

    const storedUser = localStorage.getItem('user');

    if (storedUser) {

      const currUser = JSON.parse(storedUser);

      if (currUser && currUser.id && this.currentEvent != null) {

        this.http.put(this.conf.rootUrl + "/permission/" + this.currentEvent.id + "/makeAdmin/user_id/" + _userId, {}, { headers: this.authService.getAuthHeaders() }).subscribe((res) => {
          console.log("Juhuuuuu: ", res);
        });
      }
    }
  }


}
