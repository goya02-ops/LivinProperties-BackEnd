import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/mysql';
import { BaseEntity } from '../shared/baseEntity.js';
import { Designation } from '../designation/designation.entity.js'

@Entity()
export class Payment extends BaseEntity {

  @Property()
    amount!: number;
  
  @Property()
    date_since!: Date;

  @Property()
    id_state!: number;

  @ManyToOne(() => Designation, { nullable: false }) 
  designation!: Rel<Designation>;
}
