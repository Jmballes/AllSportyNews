import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ExtendedUser } from './extended-user.model';
import { ExtendedUserService } from './extended-user.service';

@Component({
    selector: 'jhi-extended-user-detail',
    templateUrl: './extended-user-detail.component.html'
})
export class ExtendedUserDetailComponent implements OnInit, OnDestroy {

    extendedUser: ExtendedUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private extendedUserService: ExtendedUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExtendedUsers();
    }

    load(id) {
        this.extendedUserService.find(id)
            .subscribe((extendedUserResponse: HttpResponse<ExtendedUser>) => {
                this.extendedUser = extendedUserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExtendedUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'extendedUserListModification',
            (response) => this.load(this.extendedUser.id)
        );
    }
}
