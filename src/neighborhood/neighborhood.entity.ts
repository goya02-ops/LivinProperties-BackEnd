import { Entity, PrimaryKey, Property, ManyToOne, Rel } from '@mikro-orm/core';
import { City } from '../city/city.entity.js';
import { BaseEntity } from '../shared/baseEntity.js';

@Entity()
export class Neighborhood extends BaseEntity {

  @Property()
  name!: string;  

  @ManyToOne(() => City, { nullable: false }) 
  city!: Rel<City>;    
}
