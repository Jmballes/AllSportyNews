import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExtendedUserComponent } from './extended-user.component';
import { ExtendedUserDetailComponent } from './extended-user-detail.component';
import { ExtendedUserPopupComponent } from './extended-user-dialog.component';
import { ExtendedUserDeletePopupComponent } from './extended-user-delete-dialog.component';

export const extendedUserRoute: Routes = [
    {
        path: 'extended-user',
        component: ExtendedUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'extended-user/:id',
        component: ExtendedUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const extendedUserPopupRoute: Routes = [
    {
        path: 'extended-user-new',
        component: ExtendedUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extended-user/:id/edit',
        component: ExtendedUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extended-user/:id/delete',
        component: ExtendedUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'allSportyNewsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
