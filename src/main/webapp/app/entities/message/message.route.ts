import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MessageComponent } from './message.component';
import { MessageDetailComponent } from './message-detail.component';
import { MessagePopupComponent } from './message-dialog.component';
import { MessageDeletePopupComponent } from './message-delete-dialog.component';

@Injectable()
export class MessageResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const messageRoute: Routes = [
    {
        path: 'message',
        component: MessageComponent,
        resolve: {
            'pagingParams': MessageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.message.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'message/:id',
        component: MessageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.message.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messagePopupRoute: Routes = [
    {
        path: 'message-new',
        component: MessagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message/:id/edit',
        component: MessagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message/:id/delete',
        component: MessageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.message.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
