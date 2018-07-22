/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AllSportyNewsTestModule } from '../../../test.module';
import { ExtendedUserDetailComponent } from '../../../../../../main/webapp/app/entities/extended-user/extended-user-detail.component';
import { ExtendedUserService } from '../../../../../../main/webapp/app/entities/extended-user/extended-user.service';
import { ExtendedUser } from '../../../../../../main/webapp/app/entities/extended-user/extended-user.model';

describe('Component Tests', () => {

    describe('ExtendedUser Management Detail Component', () => {
        let comp: ExtendedUserDetailComponent;
        let fixture: ComponentFixture<ExtendedUserDetailComponent>;
        let service: ExtendedUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AllSportyNewsTestModule],
                declarations: [ExtendedUserDetailComponent],
                providers: [
                    ExtendedUserService
                ]
            })
            .overrideTemplate(ExtendedUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtendedUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtendedUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ExtendedUser(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.extendedUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
