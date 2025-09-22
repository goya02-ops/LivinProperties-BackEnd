import { Entity, OneToMany, Property, Cascade, Collection } from '@mikro-orm/mysql';
import { BaseEntity } from '../shared/baseEntity.js';
import { Designation } from '../designation/designation.entity.js';
import { Visit } from '../visit/visit.entity.js';
// import { Chat } from '../chat/chat.entity.js';


@Entity()
export class User extends BaseEntity {

  @Property({ nullable: false })
  docNumber!: string; 

  @Property({ nullable: false })
  typeDoc!: string;

  @Property({ nullable: false })
  name!: string; 

  @Property({ nullable: false })
  email!: string;

  @Property({ nullable: false })
  surname!: string;

  @Property({ nullable: false })
  type!: string; 

  @Property({ nullable: true })
  cuil?: string;

  @Property({ nullable: true }) 
  agentNumber?: string;


  @OneToMany(() => Designation, (Designation) => Designation.agent, {
    cascade: [Cascade.ALL] 
  })
  Designations = new Collection<Designation>(this);

  @OneToMany(() => Visit, (visit) => visit.client, {
    cascade: [Cascade.ALL] 
  })
  Visits = new Collection<Visit>(this);

/*
  
  @OneToMany(() => Chat, (Chat) => Chat.user, {
    cascade: [Cascade.ALL] 
  })
  Chats = new Collection<Chat>(this);

  */
}