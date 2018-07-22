import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { PointsService } from '../entities/points/points.service';
import { Pointspeerweek } from '../entities/points/pointsperweek.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    pointsThisWeek: any = {};
    pointsperweek: Pointspeerweek = {};
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private pointsService: PointsService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        console.log('ngOnInit');
    }

    registerAuthenticationSuccess() {

        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.getUserData();
            });
        });
        console.log('registerAuthenticationSuccess');
        if(this.isAuthenticated()) {  
        	this.getUserData();
        	}
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    getUserData() {
    	console.log('entro en getuserData');
     this.pointsService.thisWeek().subscribe((points: any) => {
     this.pointsperweek = points.body;
     console.log('getuserData');
     console.log(points.body);
     });
     }
}
