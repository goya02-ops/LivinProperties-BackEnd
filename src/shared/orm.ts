import { MikroORM } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init({
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./src/**/*.entity.ts"],
  dbName: "inmobiliarialvp",
  clientUrl: "mysql://lvp:LivinProp%231@localhost:3306/inmobiliarialvp", // #1 codificado por el %23
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: { // never in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema:[],
  },
})

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  /*
  await generator.dropSchema();
  await generator.createSchema();
  */ 
  await generator.updateSchema();
};