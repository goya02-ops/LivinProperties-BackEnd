import { Entity, Property, Cascade, Collection, OneToMany, ManyToOne } from '@mikro-orm/mysql';
import { BaseEntity } from '../shared/baseEntity.js';
import { Price } from '../price/price.entity.js';
import { Designation } from '../designation/designation.entity.js';
import { Documentation } from '../documentation/documentation.entity.js';
import { User } from '../user/user.entity.js';
import { Neighborhood } from '../neighborhood/neighborhood.entity.js';

@Entity()
export class State extends BaseEntity {

  @Property({ nullable: false })
  description!: string;

  @Property({ nullable: false })
  denomination!: string;

  @Property({ nullable: false })
  status!: string;

  @Property({ nullable: false })
  address!: string;

  @Property()
  aptNumber!: string;

  @OneToMany(() => Price, (price) => price.state, { cascade: [Cascade.ALL] })
  prices = new Collection<Price>(this);

  @OneToMany(() => Designation, (designation) => designation.state, { cascade: [Cascade.ALL] })
  designations = new Collection<Designation>(this);
  
  @ManyToOne(() => User, { nullable: false })
  owner!: User;

  @OneToMany(() => Documentation, (documentation) => documentation.state, { cascade: [Cascade.ALL] })
  documentations = new Collection<Documentation>(this);
  
  @ManyToOne(() => Neighborhood, { nullable: false })
  neighborhood!: Neighborhood;
}