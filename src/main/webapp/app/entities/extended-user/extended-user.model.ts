import { BaseEntity, User } from './../../shared';

export class ExtendedUser implements BaseEntity {
    constructor(
        public id?: number,
        public user?: User,
        public categoryPreferences?: BaseEntity[],
    ) {
    }
}
