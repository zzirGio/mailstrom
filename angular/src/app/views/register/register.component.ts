import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, UserService } from '@services';

import { content } from '@app/app.content';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    pageContent = content.views.register;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+$/i)]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

  // convenience getter for easy access to form fields
    get form() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value).subscribe(
            res => {
                this.alertService.success('Registration successful!', true);
                this.router.navigate(['/login']);
            }, 
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
