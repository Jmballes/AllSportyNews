import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AllSportyNewsCategoryModule } from './category/category.module';
import { AllSportyNewsMessageModule } from './message/message.module';
import { AllSportyNewsPointsModule } from './points/points.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AllSportyNewsCategoryModule,
        AllSportyNewsMessageModule,
        AllSportyNewsPointsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AllSportyNewsEntityModule {}
