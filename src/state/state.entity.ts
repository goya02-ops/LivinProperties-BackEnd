import { Entity, Property, Cascade, Collection, OneToMany, ManyToOne } from '@mikro-orm/mysql';
import { BaseEntity } from '../shared/baseEntity.js';

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
/*

  @OneToMany(() => Designation, (designation) => designation.state, { cascade: [Cascade.ALL] })

  @OneToMany(() => Price, (price) => price.state, { cascade: [Cascade.ALL] })
  prices = new Collection<Price>(this);

  @OneToMany(() => Documentation, (documentation) => documentation.state, { cascade: [Cascade.ALL] })
  documentations = new Collection<Documentation>(this);

  @ManyToOne(() => Client, { nullable: false })
  owner!: Client;

  @ManyToOne(() => Neighborhood, { nullable: false })
  neighborhood!: Neighborhood;

*/


}