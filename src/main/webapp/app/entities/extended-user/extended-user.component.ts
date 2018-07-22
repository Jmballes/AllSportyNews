import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ExtendedUser } from './extended-user.model';
import { ExtendedUserService } from './extended-user.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-extended-user',
    templateUrl: './extended-user.component.html'
})
export class ExtendedUserComponent implements OnInit, OnDestroy {
extendedUsers: ExtendedUser[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private extendedUserService: ExtendedUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.extendedUserService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ExtendedUser[]>) => this.extendedUsers = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.extendedUserService.query().subscribe(
            (res: HttpResponse<ExtendedUser[]>) => {
                this.extendedUsers = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExtendedUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ExtendedUser) {
        return item.id;
    }
    registerChangeInExtendedUsers() {
        this.eventSubscriber = this.eventManager.subscribe('extendedUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
