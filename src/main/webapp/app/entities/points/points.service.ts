import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Points } from './points.model';
import { createRequestOption } from '../../shared';
import { Pointspeerweek } from './pointsperweek.model';

export type EntityResponseType = HttpResponse<Points>;
export type EntityPointsPeerWeekType = HttpResponse<Pointspeerweek>;

@Injectable()
export class PointsService {
    temp: any;
    private resourceUrl =  SERVER_API_URL + 'api/points';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/points';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(points: Points): Observable<EntityResponseType> {
        const copy = this.convert(points);
        return this.http.post<Points>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(points: Points): Observable<EntityResponseType> {
        const copy = this.convert(points);
        return this.http.put<Points>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Points>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Points[]>> {
        const options = createRequestOption(req);
        return this.http.get<Points[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Points[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Points[]>> {
        const options = createRequestOption(req);
        return this.http.get<Points[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Points[]>) => this.convertArrayResponse(res));
    }
    thisWeek(): Observable<EntityPointsPeerWeekType> {
        return this.http.get<Pointspeerweek>('api/points-this-week', { observe: 'response'})
        .map((res: EntityPointsPeerWeekType) => this.convertResponsePointsPeerWeek(res));
        // console.log('points.service.ts paso 1');
        // this.temp = this.http.get('api/points-this-week');
        // console.log('points.service.ts paso 2');
        // console.log(this.temp);
        // return this.temp.map((res: EntityResponseType) => this.convertResponse(res));
    }
    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Points = this.convertItemFromServer(res.body);
        return res.clone({body});
    }
    private convertResponsePointsPeerWeek(res: EntityPointsPeerWeekType): EntityPointsPeerWeekType {
        const body: Pointspeerweek = this.convertPointsPerWeekFromServer(res.body);
        return res.clone({body});
    }
    private convertPointsPerWeekFromServer(points: Pointspeerweek): Pointspeerweek {
        const copy: Pointspeerweek = Object.assign({}, points);
        return copy;
    }
    private convertArrayResponse(res: HttpResponse<Points[]>): HttpResponse<Points[]> {
        const jsonResponse: Points[] = res.body;
        const body: Points[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Points.
     */
    private convertItemFromServer(points: Points): Points {
        const copy: Points = Object.assign({}, points);
        copy.fecha = this.dateUtils
            .convertLocalDateFromServer(points.fecha);
        return copy;
    }

    /**
     * Convert a Points to a JSON which can be sent to the server.
     */
    private convert(points: Points): Points {
        const copy: Points = Object.assign({}, points);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(points.fecha);
        return copy;
    }
}
