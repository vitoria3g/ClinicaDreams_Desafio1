import React, {useState, useEffect}                     from 'react';
import {useHistory}                          from 'react-router-dom';
import {Modal, Button, Form, Input, Select}  from 'antd';
import api                                   from '../../../../services/api';
const { Option } = Select;

const Registration = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [service, setService] = useState([]);
  const children = [];

  useEffect(async()=>{
    let responseService = await api.get('/services');
    setService(responseService.data);
  },[]);

  const handleCancel = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  //Populando select
  for (let i = 0; i < service.length; i++) {
    children.push(<Option key={service[i].idService}>{service[i].title}</Option>);
  }
  
  async function handleRegister(event){
    try
    {
      const {services} =event;
      const client_create = localStorage.getItem('userId');
      const data = {
                     client_create,
                     services
                   }
      var response = await api.post('/customerService', data);
      if(response.status === 201){
         setIsModalVisible(false);
         alert("Atendimento criado!");
         history.push('/home');
      }
    }
    catch(err)
    {
        console.log(err.message);
    }
  }

  return (
     <>
      <Modal title="Atendimento" visible={isModalVisible} centered okButtonProps={{ disabled: true}} onCancel={handleCancel} cancelButtonProps={{ disabled: false }}>
      <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={handleRegister}>
          <Form.Item name='services' rules={[{ required: true, message: 'Por favor,escolha um ou mais serviços!' }]}>
          <Select mode="tags" style={{ width: '100%' }} placeholder="Escolha um ou mais serviços">
            {children}
          </Select>
          </Form.Item >
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

export default Registration;