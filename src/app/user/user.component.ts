import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '@app/services';
import { first } from 'rxjs/operators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isEditable : boolean = false;
  userEditForm : FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private userService : UserService) { }

  users : any = {};

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user'));
    this.users !== null ? this.isEditable = false : this.isEditable = true;
    this.userEditForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      firstName : new FormControl('', [Validators.required]),
      lastName : new FormControl('', [Validators.required]),
      role : new FormControl('')
    });
  }

  cancel() {
    this.isEditable = false;
    this.userEditForm.reset();
  }

  save() {
    if(!this.isEditable) {
      this.isEditable = true;
      this.userEditForm.patchValue(this.users);
    } else {
      if (this.userEditForm.valid === true) {
        this.isEditable = false;
        this.users = this.userEditForm.value;
        this.userEditForm.reset();
      } else {
        this.userEditForm.markAllAsTouched();
      }
    }
  }

}
