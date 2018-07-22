/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AllSportyNewsTestModule } from '../../../test.module';
import { ExtendedUserComponent } from '../../../../../../main/webapp/app/entities/extended-user/extended-user.component';
import { ExtendedUserService } from '../../../../../../main/webapp/app/entities/extended-user/extended-user.service';
import { ExtendedUser } from '../../../../../../main/webapp/app/entities/extended-user/extended-user.model';

describe('Component Tests', () => {

    describe('ExtendedUser Management Component', () => {
        let comp: ExtendedUserComponent;
        let fixture: ComponentFixture<ExtendedUserComponent>;
        let service: ExtendedUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AllSportyNewsTestModule],
                declarations: [ExtendedUserComponent],
                providers: [
                    ExtendedUserService
                ]
            })
            .overrideTemplate(ExtendedUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtendedUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtendedUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ExtendedUser(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.extendedUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
