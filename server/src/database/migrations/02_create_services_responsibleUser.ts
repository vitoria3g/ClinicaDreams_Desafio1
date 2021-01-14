import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('responsibleUser_service', //TABELA DE REPRESENTANTES VINCULADOS A SERVIÇOS
  table =>{
    table.increments('idResponsibleUser_service').primary();
    table.integer('idServices').notNullable().references('idService').inTable('services');
    table.uuid('idResponsible').notNullable().references('idUser').inTable('users');
    table.decimal('salesCommission').notNullable();
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('responsibleUser_service');
}