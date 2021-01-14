import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('customerAndService', //TABELA DE SERVIÇOS RELACIONADOS AO ATENDIMENTO
  table =>{
    table.increments('idCustomerAndService').primary();
    table.integer('idService').notNullable().references('idService').inTable('services');
    table.integer('idCustomer').notNullable().references('idCustomerService').inTable('customerService');
    table.string('status').notNullable().defaultTo("P"); //P=pendente | C=concluido pelo representante | S=parado pelo representante | I=iniciado pelo representante
    table.integer('totalMinutes').notNullable();
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('customerAndService');
}