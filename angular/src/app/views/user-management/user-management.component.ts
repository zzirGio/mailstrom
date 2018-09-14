import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '@models';
import { AlertService, UserService } from '@services';

import { content } from '@app/app.content';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  pageContent = content.views.userManagement;
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  private user: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    
    this.updateForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get form() { return this.updateForm.controls; }

  onSubmit() {
    console.log('Usermanagement submitting!!!');
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }

    this.loading = true;
    const updatedDetails: User = {
      id: this.user.id,
      email: <string> this.form.email.value,
      username: this.user.username,
      password: this.form.password.value,
      token: <string> this.user.token
    }
    this.userService.update(updatedDetails).subscribe(
      res => {
          this.alertService.success(this.pageContent.submitSuccess, true);
          updatedDetails.password = '';
          localStorage.setItem('currentUser', JSON.stringify(updatedDetails));
          this.router.navigate(['/dashboard']);
      }, 
      error => {
          this.alertService.error(error);
          this.loading = false;
    });
  }
}
