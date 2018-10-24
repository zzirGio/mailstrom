import { Component } from '@angular/core';

@Component({
  selector: 'delete-dialog',
  template: `
      <h2 mat-dialog-title>Delete Account</h2>
      <mat-dialog-content class="mat-typography">
        <h3>Are you sure you want to delete your account?</h3>
        <p>This cannot be undone.</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-button class="btn-danger" [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
      </mat-dialog-actions>
    `
})
export class DeleteUserDialogContentComponent {}


@Component({
  selector: "delete-message-dialog",
  template: `
      <h2 mat-dialog-title>Delete message</h2>
      <mat-dialog-content class="mat-typography">
        <p>Are you sure you want to delete this message?</p>
        <p>This cannot be undone.</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-button class="btn-danger" [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
      </mat-dialog-actions>
    `
})
export class DeleteMessageDialogContentComponent {}


 @Component({
  selector: "delete-contact-dialog",
  template: `
      <h2 mat-dialog-title>Delete contact</h2>
      <mat-dialog-content class="mat-typography">
        <p>Are you sure you want to delete this contact?</p>
        <p>This cannot be undone.</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-button class="btn-danger" [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
      </mat-dialog-actions>
    `
})
export class DeleteContactDialogContentComponent {}
