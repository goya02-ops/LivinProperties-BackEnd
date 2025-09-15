import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/mysql';
import { BaseEntity } from '../shared/baseEntity.js';
import { State } from '../state/state.entity.js';

@Entity()
export class Price extends BaseEntity {

  @Property({ nullable: false })
  fromDate!: Date;

  @Property({ nullable: false })
  value!: number;

  @ManyToOne(() => State, { nullable: false })
  state!: Rel<State>;

}