import { Entity, OneToMany, Property, Cascade, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.js';
// import { Designation } from '../Designation/Designation.entity.js';


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


/*
  @OneToMany(() => Designation, (Designation) => Designation.user, {
    cascade: [Cascade.ALL] 
  })
  Designations = new Collection<Designation>(this);

  */
}