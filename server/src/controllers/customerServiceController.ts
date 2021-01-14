import {Request, Response} from 'express';
import knex                from '../database/connection';

class customerServicesController {

  async create(req: Request, resp: Response) {
    
    const {client_create, services} = req.body; 
     try {
      await knex.transaction(async trx => {
    
        const ids = await knex('customerService')
                          .insert({idCliente:client_create}, 'idCustomerService')
                          .transacting(trx)
        
        const dataResponsible = services.map((item_id: number) => { return {idService: item_id,idCustomer: ids[0],status: "P"}});
                    await knex('customerAndService')
                          .insert(dataResponsible)
                          .transacting(trx)
        
        return resp.status(201).json({"message": "Sucess"});
      });
    } 
    catch (error) {
      return resp.status(500).json({"message": `${error.message}`});
    }
  }

  //Atualiza o status do atendimento do representante
  async update(req: Request, resp: Response){
    
    const {cust,service,status,totalMinutes} = req.body; 
    const id =  await knex('customerAndService') 
                      .where('idService', service)
                      .where('idCustomer', cust)
                      .select('idCustomerAndService').first();

    const response = await knex('customerAndService')
                         .where('idCustomerAndService', id.idCustomerAndService)
                         .update({status,totalMinutes});
    if(!response){
      return resp.status(500).json({"message": "Error update status!"})
    }
    return resp.status(200).json({"message": "OK"})
  }

}

export default new customerServicesController();