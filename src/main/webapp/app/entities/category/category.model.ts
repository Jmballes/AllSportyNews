import { BaseEntity, User } from './../../shared';

export class Category implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public author?: User,
    ) {
    }
}
