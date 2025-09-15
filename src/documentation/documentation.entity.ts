import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/mysql';
import { BaseEntity } from '../shared/baseEntity.js';
import { State } from '../state/state.entity.js';

@Entity()
export class Documentation extends BaseEntity {

  @Property({ nullable: false })
  denomination!: string;

  @Property({ nullable: false })
  format!: string;

  @Property({ nullable: false })
  file!: Buffer;

  @ManyToOne(() => State, { nullable: false })
  state!: Rel<State>;

}