import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ExtendedUser } from './extended-user.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExtendedUser>;

@Injectable()
export class ExtendedUserService {

    private resourceUrl =  SERVER_API_URL + 'api/extended-users';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/extended-users';

    constructor(private http: HttpClient) { }

    create(extendedUser: ExtendedUser): Observable<EntityResponseType> {
        const copy = this.convert(extendedUser);
        return this.http.post<ExtendedUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(extendedUser: ExtendedUser): Observable<EntityResponseType> {
        const copy = this.convert(extendedUser);
        return this.http.put<ExtendedUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ExtendedUser>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExtendedUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExtendedUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExtendedUser[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ExtendedUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExtendedUser[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExtendedUser[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExtendedUser = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExtendedUser[]>): HttpResponse<ExtendedUser[]> {
        const jsonResponse: ExtendedUser[] = res.body;
        const body: ExtendedUser[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExtendedUser.
     */
    private convertItemFromServer(extendedUser: ExtendedUser): ExtendedUser {
        const copy: ExtendedUser = Object.assign({}, extendedUser);
        return copy;
    }

    /**
     * Convert a ExtendedUser to a JSON which can be sent to the server.
     */
    private convert(extendedUser: ExtendedUser): ExtendedUser {
        const copy: ExtendedUser = Object.assign({}, extendedUser);
        return copy;
    }
}
