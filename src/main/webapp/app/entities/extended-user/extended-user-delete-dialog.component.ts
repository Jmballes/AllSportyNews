import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExtendedUser } from './extended-user.model';
import { ExtendedUserPopupService } from './extended-user-popup.service';
import { ExtendedUserService } from './extended-user.service';

@Component({
    selector: 'jhi-extended-user-delete-dialog',
    templateUrl: './extended-user-delete-dialog.component.html'
})
export class ExtendedUserDeleteDialogComponent {

    extendedUser: ExtendedUser;

    constructor(
        private extendedUserService: ExtendedUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.extendedUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'extendedUserListModification',
                content: 'Deleted an extendedUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-extended-user-delete-popup',
    template: ''
})
export class ExtendedUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extendedUserPopupService: ExtendedUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.extendedUserPopupService
                .open(ExtendedUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
