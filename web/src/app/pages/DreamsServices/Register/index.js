import React, {useState}                     from 'react';
import {useHistory}                          from 'react-router-dom';
import {Modal, Button, Form, Input, InputNumber, }  from 'antd';
import api                                   from '../../../../services/api';

const RegistrationService = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  const validateMessages = {
    required: 'O campo não pode ser nulo!',
    number: {
      range: 'O valor minimo deve ser 60min',
    },
  };

  async function handleRegister(event){
    try
    {
      var response = await api.post('/services', event);
      if(response.status === 200){
         setIsModalVisible(false);
         alert("Serviço criado");
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
      <Modal title="Serviços" visible={isModalVisible} centered okButtonProps={{ disabled: true}} onCancel={handleCancel} cancelButtonProps={{ disabled: false }}>
      <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={handleRegister} validateMessages={validateMessages}>
          <Form.Item name='title' rules={[{ required: true, message: 'Por favor, digite o titulo do serviço!' }]}>
            <Input placeholder="Digite o titulo" style={{borderRadius: "15px"}}/>
          </Form.Item >
          <Form.Item name='description' rules={[{required: true, message: 'Por favor, digite a descrição do serviço!'},]}>
            <Input placeholder="Digite a descrição" style={{borderRadius: "15px"}}/>
          </Form.Item >
          <Form.Item name='value' rules={[{required: true, message: 'Por favor, digite o valor do serviço!'},]}>
            <InputNumber className="InputNumber" placeholder="Digite o valor em reais"  style={{borderRadius: "15px"}}/>
          </Form.Item >
          <Form.Item name="totalMinutes" rules={[{type: 'number',min: 60, max:1000,required: true},]}>
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

export default RegistrationService;