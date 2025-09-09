import { Entity, PrimaryKey, Property, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from '../shared/baseEntity.js'; //BaseEntity fuerza a crear un campo "ID", que esta clase no necesita, pues su PK es postalCode
import { Neighborhood } from "../neighborhood/neighborhood.entity.js";

@Entity()
export class City extends BaseEntity{
    @Property()
    postalCode!: number;

    @Property()
    name!: string;

    @OneToMany(() => Neighborhood, (neighborhood) => neighborhood.city, { cascade: [Cascade.ALL] })
    neighborhoods = new Collection<Neighborhood>(this);
}