import React, {useState, useEffect}      from 'react';
import {useHistory}                      from 'react-router-dom';
import {Modal, Table}                    from 'antd';
import api                               from '../../../../services/api';
import '../../../pages/global.scss';

const UserRequest = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [customer, setCustomers] = useState([]);
  const idUser = localStorage.getItem('userId');
  const typeUser =  localStorage.getItem('typeUser');
  const data = [];
  let customerId = "";

  useEffect(async()=>{
     var response = await api.get('/servicesCustomer',{headers:{idUser, typeUser}});
     setCustomers(response.data)
  },[]);

  const handleOk = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  function calcComissao(value, comissao){
    return (value*comissao)/100
  }
  const columns = [
                    {title:'Pedido', dataIndex:'title', key:'title'},
                    {title:'Solicitado em', dataIndex:'date', key:'date'}
                  ];

  
  for(let i = 0; i < customer.length; ++i){
    if(customerId !== customer[i].Customer){
      data.push({
        key: customer[i].Customer,
        title: customer[i].Customer,
        date: new Date(customer[i].createAt).toLocaleDateString()
      });
    }
    customerId = customer[i].Customer;
  }
  //Serviços adicionados
  const expandedRowRender = (record) => {

        let services = customer.filter(x=>{return x.Customer == record.key});    
        const columns = [
          { title:'Serviço', dataIndex:'service', key:'service' },
          { title:'Descrição', dataIndex:'description', key:'description' },
          { title:'Status', dataIndex:'status', key:'status' },
          { title:'Valor', dataIndex:'value', key:'value' },
          typeUser !== "S" ? { title:'Comissão', dataIndex:'salesCommission', key:'salesCommission' } : {},
          typeUser !== "S" ? { title:'Total', dataIndex:'total', key:'total' } : {}
        ];

        //busca os serviços adicionados
        const data = [];
        for(let i = 0; i < services.length; ++i) {
            data.push({
              key: services[i].idService,
              service: services[i].title,
              description: services[i].description,
              status: services[i].statusService == "P" ? "Atribuido ao representante" : services[i].statusService == "I" ? "Em desenvolvimento" : "Concluido",
              value: `R$${services[i].value}`,
              salesCommission: `${services[i].salesCommission}%`,
              total: `R$${calcComissao(services[i].value,services[i].salesCommission)}`
            });
        }
    
        return <Table columns={columns} dataSource={data} pagination={false}/>;
  };
  
  return (
     <>
      <Modal title="Meus Atendimentos" visible={isModalVisible} onOk={handleOk} width={800} centered cancelButtonProps={{disabled:true}}>
        <div style={{overflow:"auto", overflowY:"auto", height:"350px", width:"750px"}}>
          <Table
              className="components-table-demo-nested"
              columns={columns}
              expandable={{expandedRowRender}}
              dataSource={data}
              pagination={false}
           />
        </div>
      </Modal>
    </>
    );
};

export default UserRequest;