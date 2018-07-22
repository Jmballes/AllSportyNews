/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AllSportyNewsTestModule } from '../../../test.module';
import { ExtendedUserDialogComponent } from '../../../../../../main/webapp/app/entities/extended-user/extended-user-dialog.component';
import { ExtendedUserService } from '../../../../../../main/webapp/app/entities/extended-user/extended-user.service';
import { ExtendedUser } from '../../../../../../main/webapp/app/entities/extended-user/extended-user.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { CategoryService } from '../../../../../../main/webapp/app/entities/category';

describe('Component Tests', () => {

    describe('ExtendedUser Management Dialog Component', () => {
        let comp: ExtendedUserDialogComponent;
        let fixture: ComponentFixture<ExtendedUserDialogComponent>;
        let service: ExtendedUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AllSportyNewsTestModule],
                declarations: [ExtendedUserDialogComponent],
                providers: [
                    UserService,
                    CategoryService,
                    ExtendedUserService
                ]
            })
            .overrideTemplate(ExtendedUserDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtendedUserDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtendedUserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExtendedUser(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.extendedUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'extendedUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExtendedUser();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.extendedUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'extendedUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
