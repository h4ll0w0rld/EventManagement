import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service'; // Your service to get/update user
import { User } from '../../Object Models/user/user';
import { EventService } from '../../core/features/events/event.service';
//import { User } from '../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user!: any | null;
  phoneForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.pattern(/^(\+?[0-9-\s]{7,15})$/)]]
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.phoneForm.patchValue({
          phone: user.phone ?? ''
        });
      }
    });
  }

  savePhone(): void {
    if (this.phoneForm.invalid || !this.user) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const phone = this.phoneForm.value.phone;

    this.authService.editUserPhone(phone).subscribe({
      next: () => {
        // ✅ manually update local user
        const updatedUser = { ...this.user!, phone };

        this.authService.setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        this.successMessage = 'Phone number updated successfully!';
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to update phone number.';
        this.loading = false;
      }
    });
  }
}
