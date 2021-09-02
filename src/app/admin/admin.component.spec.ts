import { AdminComponent } from './admin.component';
import {
    TestBed
  } from '@angular/core/testing';
import { Role } from '../models';
import { UserService } from '../services';
import 'zone.js';
import 'zone.js/dist/async-test.js';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';

const users = [
    { id: 1, username: 'admin@admin.com', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user@admin.com', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

describe('AdminComponent', () => {
    let component : AdminComponent;
    let userServiceMock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        getAll : jest.fn()
                    }
                }
            ]
        });
        component = new AdminComponent(
            userServiceMock
        );
    });

    describe('Admin Component Start', () => {
        it(`should call 'ngOnInint' when User Login`, () => {
            const user = jest.spyOn(component, 'ngOnInit');
            const service = userServiceMock.getAll().
            pipe(first()).subscribe((data) => {
                expect(data).toEqual(users);
            });
            component.ngOnInit();
            expect(user).toHaveBeenCalled();
        });
    });
});