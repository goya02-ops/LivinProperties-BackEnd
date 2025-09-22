import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/mysql';
import { BaseEntity } from '../shared/baseEntity.js';
import { User } from '../user/user.entity.js';
import { Designation } from '../designation/designation.entity.js';

@Entity()

export class Visit extends BaseEntity {

    @Property({nullable: false})
    date!: string;

    @Property({nullable: false})
    hour!: string;

    @Property({nullable: false})
    state!: string;

    @ManyToOne(() => Designation, {nullable: false})
    designation!: Rel<Designation>;
    
    @ManyToOne(() => User, {nullable: false})
    client!: Rel<User>;
}