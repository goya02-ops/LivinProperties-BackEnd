import { Entity, PrimaryKey, Property, ManyToOne, Rel } from '@mikro-orm/core';
/*import { City } from '../city/city.entity.js';*/
import { BaseEntity } from '../shared/baseEntity.js';
/*import { Designation } from '../designation/designation.entity.js'*/ 

@Entity()
export class Payment extends BaseEntity {

  @Property()
    amount!: number;
  
  @Property()
    date_since!: Date;

  @Property()
    id_state!: number;
/*
  @ManyToOne(() => Designation, { nullable: false }) 
  Designation!: Rel<Designation>;    */
}
