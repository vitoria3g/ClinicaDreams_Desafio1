import React, {useState, useEffect}          from 'react';
import {useHistory}                          from 'react-router-dom';
import {Modal, Button, Form, Input}          from 'antd';
import api                                   from '../../../../services/api';

const AssociatePerson = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(async()=>{
    let responseUser = await api.get('/users', {headers:{typeUser: "R"}});
    let responseService = await api.get('/services', {headers:{typeUser: "A"}});
    let user = responseUser.data;
    let service = responseService.data;

    for (let i = 0; i < user.length; i++) {
      let op = document.createElement("option");
          op.value = user[i].idUser; 
          op.text = user[i].name;
      document.getElementById("slc_person").append(op);
    }

    for (let i = 0; i < service.length; i++) {
      let op = document.createElement("option");
          op.value = service[i].idService; 
          op.text = service[i].title;
      document.getElementById("slc_service").append(op);
    }
  },[]);
  


  const handleCancel = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  async function handleRegister(event){
    try
    {
      var response = await api.post('/associateUser', event);
      if(response.status === 200){
         setIsModalVisible(false);
         alert("representante vinculado");
         history.goBack();
      }
    }
    catch(err)
    {
       console.log(err.message);
    }
  }

  return (
     <>
      <Modal title="Associar representante" visible={isModalVisible} centered okButtonProps={{ disabled: true}} onCancel={handleCancel} cancelButtonProps={{ disabled: false }}>
      <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={handleRegister}>
         <Form.Item name="idServices" rules={[{ required: true, message: "Selecione um serviço" }]}>
            <select id="slc_service">
              <option value="0">-selecione um serviço-</option>
            </select>
          </Form.Item>
          <Form.Item name="idResponsible" rules={[{ required: true, message: "Selecione um representante" }]}>
            <select id="slc_person">
              <option value="0">-selecione um representante-</option>
            </select>
          </Form.Item>
          <Form.Item name="salesCommission" rules={[{ required: true, message: "Informe a comissão do representante" }]}>
            <Input type="number" placeholder="Valor da comissão %" style={{borderRadius: "15px"}}/>
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