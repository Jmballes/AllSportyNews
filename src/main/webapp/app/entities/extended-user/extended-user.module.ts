import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AllSportyNewsSharedModule } from '../../shared';
import { AllSportyNewsAdminModule } from '../../admin/admin.module';
import {
    ExtendedUserService,
    ExtendedUserPopupService,
    ExtendedUserComponent,
    ExtendedUserDetailComponent,
    ExtendedUserDialogComponent,
    ExtendedUserPopupComponent,
    ExtendedUserDeletePopupComponent,
    ExtendedUserDeleteDialogComponent,
    extendedUserRoute,
    extendedUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...extendedUserRoute,
    ...extendedUserPopupRoute,
];

@NgModule({
    imports: [
        AllSportyNewsSharedModule,
        AllSportyNewsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExtendedUserComponent,
        ExtendedUserDetailComponent,
        ExtendedUserDialogComponent,
        ExtendedUserDeleteDialogComponent,
        ExtendedUserPopupComponent,
        ExtendedUserDeletePopupComponent,
    ],
    entryComponents: [
        ExtendedUserComponent,
        ExtendedUserDialogComponent,
        ExtendedUserPopupComponent,
        ExtendedUserDeleteDialogComponent,
        ExtendedUserDeletePopupComponent,
    ],
    providers: [
        ExtendedUserService,
        ExtendedUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AllSportyNewsExtendedUserModule {}
