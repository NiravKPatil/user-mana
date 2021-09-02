import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { UserService } from '../services';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['./admin.component.scss'] 
})
export class AdminComponent implements OnInit {
    users: User[] = [];
    addUserFrom : FormGroup;
    isUserEdit : boolean = false;
    updateUser : boolean = false;
    message : string = "";
    messageBoolean : boolean = false;
    matcher = new MyErrorStateMatcher();

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.addUserFrom = new FormGroup({
            username : new FormControl('', [Validators.required, Validators.email]),
            password : new FormControl('', [Validators.required]),
            firstName : new FormControl('', [Validators.required]),
            lastName : new FormControl('', [Validators.required]),
            role : new FormControl('', [Validators.required])
        });
        this.userList();
    }

    userList() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    save() {
        if (!this.updateUser) {
            let userValid : boolean;
            this.users.forEach(element => {
                if (element.username !== this.addUserFrom.controls.username.value) {
                    this.isUserEdit = false;
                    this.messageBoolean = false;
                    userValid = true;
                } else {
                    this.isUserEdit = true;
                    this.messageBoolean = true;
                    this.message = "Username already exists."
                    userValid = false;
                    return this.addUserFrom.controls.username.markAsDirty();
                }
            });
            if (userValid === true) {
                this.users.push(this.addUserFrom.value);
                this.addUserFrom.reset();
            }
        } else {
            let username = this.addUserFrom.controls.username.value;
            this.users.find(item => item.username == username).firstName =  this.addUserFrom.controls.firstName.value;
            this.users.find(item => item.username == username).lastName =  this.addUserFrom.controls.lastName.value;
            this.users.find(item => item.username == username).role =  this.addUserFrom.controls.role.value;
            this.isUserEdit = false;
            this.updateUser = false;
            this.messageBoolean = false;
            this.addUserFrom.reset();
        }
    }

    editUser(event) {
        console.log(event);
        if (!event) {
            this.isUserEdit = true;
            return;
        }
        let newUser;
        this.userService.getAll().pipe(first()).subscribe(users => {
            for (let user of users) {
                if (user.username === event) {
                    newUser = user;
                    console.log(newUser);
                    this.isUserEdit = true;
                    this.updateUser = true;
                    this.addUserFrom.patchValue(newUser);
                }
            }
        });
    }

    Edit() {
        
    }

    cancel() {
        this.isUserEdit = false;
        this.addUserFrom.reset();
        this.updateUser = false;
        this.messageBoolean = false;
    }

    deleteUser(event) {
        let self = this;
        this.users.forEach(function (item, index) {
            if (item.username === event) {
                self.users.splice(index, 1);
            }
        });
    }
}