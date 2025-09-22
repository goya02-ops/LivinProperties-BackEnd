import { Property, ManyToOne, Rel, Entity, OneToMany, Cascade, Collection } from '@mikro-orm/mysql';
import { BaseEntity } from '../shared/baseEntity.js';
import { State } from '../state/state.entity.js';
import { User } from '../user/user.entity.js';
//import { Payment } from '../payment/payment.entity.js';
//import { Chat } from '../chat/chat.entity.js';
//import { Visit } from '../visit/visit.entity.js';

@Entity()
export class Designation extends BaseEntity {

  @Property({nullable: false})
  fromDate!: Date;

  @Property({nullable: false})
  toDate!: Date;

  @ManyToOne(() => State, {nullable: false})
  state!: Rel<State>;

  @ManyToOne(() => User, {nullable: false})
  agent!: Rel<User>;
  /*
  
  @OneToMany(() => Payment, (payment) => payment.designation, {cascade: [Cascade.ALL]})
  payments = new Collection<Payment>(this);

  @OneToMany(() => Chat, (chat) => chat.designation, {cascade: [Cascade.ALL]})
  chats = new Collection<Chat>(this);

  @OneToMany(() => Visits, (visits) => visits.designation, {cascade: [Cascade.ALL]})
  visits = new Collection<Visit>(this);
  */
}