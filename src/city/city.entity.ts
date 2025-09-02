import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from '../shared/baseEntity.js';

@Entity()
export class City extends BaseEntity {
    @PrimaryKey()
    postalCode!: number;

    @Property()
    name!: string;
}