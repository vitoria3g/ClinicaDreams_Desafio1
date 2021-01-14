import React, {useState, useEffect}        from 'react';
import {useHistory}                        from 'react-router-dom';
import {Modal, Button, Form, InputNumber}  from 'antd';
import api                                 from '../../../../services/api';

const AssociatePerson = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [customer, setCustomers] = useState([]);

  useEffect(async()=>{
    const idUser = localStorage.getItem('userId');
    const typeUser =  localStorage.getItem('typeUser');
    const header = {idUser, typeUser}
    var responseAtend = await api.get('/servicesCustomer',{headers:header});

    const person = responseAtend.data;
    setCustomers(responseAtend.data);
    
    let customerId = "";
    for (let i = 0; i < person.length; i++) {
      if(customerId !== person[i].Customer){
        let op = document.createElement("option");
        op.value = person[i].Customer; 
        op.text = person[i].Customer;
        document.getElementById("slc_person").append(op);
      }
      customerId = person[i].Customer;
    }

  },[]);
  
  function onChangePerson(){
    //remove todos os itens do segundo select
    for(let x = 0; x<=document.getElementById("slc_service").childElementCount; x++){document.getElementById("slc_service").children[x].remove()}
    //filtra os serviços de acordo com o atendimento
    let services = customer.filter(x=>{return x.Customer == document.getElementById("slc_person").value});
    for(let i = 0; i < services.length; i++) {
        let op = document.createElement("option");
        op.value = services[i].idService; 
        op.text = services[i].title;
        document.getElementById("slc_service").append(op);
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  async function handleRegister(event){
    try
    {
      const {cust, status, totalMinutes} = event;
      let total = customer.filter(x=>{return x.idService == document.getElementById("slc_service").value})[0].totalMinutes;
      if(status == "C" && totalMinutes == undefined){ alert("Informe o tempo de execussão do serviço!")}
      else if(total < totalMinutes){
        alert(`O valor não pode ser maior que ${total}`)
      }
      else{
        const data = {
                cust,
                service: document.getElementById("slc_service").value,
                status, 
                totalMinutes
              }

        var response = await api.put('/customerService', data);
        if(response.status === 200){
          setIsModalVisible(false);
          alert("Cadastro realizado");
       }
       else{
          alert("Ocorreu um erro ao cadastrar atendimento");
       } 
      }
    }
    catch(err)
    {
      console.log(err.message);
    }
  }

  return (
     <>
      <Modal title="Atendimentos" visible={isModalVisible} centered okButtonProps={{ disabled: true}} onCancel={handleCancel} cancelButtonProps={{ disabled: false }}>
      <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={handleRegister}>
         <Form.Item name="cust" rules={[{ required: true, message: "Selecione um atendimento" }]}>
            <select id="slc_person" onChange={onChangePerson}>
              <option value="0">-selecione um atendimento-</option>
            </select>
          </Form.Item>
          <Form.Item name="service">
            <select id="slc_service">
              <option value="0">-selecione um serviço-</option>
            </select>
          </Form.Item>
          <Form.Item name="status" rules={[{ required: true, message: "Informe o status do serviço" }]}>
            <select id="slc_status">
              <option value="0">-selecione o status-</option>
              <option value="I">Iniciado</option>
              <option value="C">Concluido</option>
            </select>
          </Form.Item>
          <Form.Item name="totalMinutes" rules={[{type: 'number',min: 60, max:1000},]}>
            <InputNumber className="InputNumber" placeholder="Digite a quantidade de minutos de execução" style={{borderRadius: "15px"}}/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="button">
              cadastrar
            </Button>
          </Form.Item>
      </Form>
      </Modal>
    </>
    );
};

export default AssociatePerson;