import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('services',  //TABELA DE SERVIÇOS
  table =>{
    table.increments('idService').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.integer('totalMinutes').notNullable().defaultTo(60); //60min
    table.string('status').notNullable().defaultTo("D"); //D=disponivel | I=indisponivel
    table.dateTime('createAt', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.dateTime('updateAt', { precision: 6 }).defaultTo(knex.fn.now(6))
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('services');
}