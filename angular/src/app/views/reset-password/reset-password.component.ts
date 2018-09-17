import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from '@services';

import { content } from '@app/app.content';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  pageContent = content.views.resetPassword;
  resetForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private snackBar: MatSnackBar) { }

  ngOnInit() {
      this.resetForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+$/i)]],
          email: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(8)]]
      });
  }

// convenience getter for easy access to form fields
  get form() { return this.resetForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.resetForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.resetPassword(this.resetForm.value).subscribe(
        res => {
            this.snackBar.open(this.pageContent.resetSuccess, 'Dismiss', { duration: 3000 });
            this.router.navigate(['/login']);
        }, 
        error => {
            this.snackBar.open(error, 'Dismiss', { duration: 3000 });
            this.loading = false;
        });
  }

}
