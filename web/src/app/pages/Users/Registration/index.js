import React, {useState}                     from 'react';
import {useHistory}                          from 'react-router-dom';
import {Modal, Button, Form, Input, Select}  from 'antd';
import api                                   from '../../../../services/api';

const Registration = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  async function handleRegister(event){
    try
    {
        var response = await api.post('/users', event);
        if(response.status === 200){
            setIsModalVisible(false);
            alert("usuário criado");

            //SE O CADASTRO FOR FEITO NA TELA INICIAL
            if(!localStorage.getItem('userId')){
              localStorage.setItem('userId', response.data.idUser);
              localStorage.setItem('typeUser', response.data.typeUser);
            }
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
      <Modal title="Faça seu cadastro no Dreams" visible={isModalVisible} centered okButtonProps={{ disabled: true}} onCancel={handleCancel} cancelButtonProps={{ disabled: false }}>
      <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={handleRegister}>
          <Form.Item name='name' rules={[{ required: true, message: 'Por favor digite seu nome!' }]}>
            <Input placeholder="Digite seu nome completo" style={{borderRadius: "15px"}}/>
          </Form.Item >
          <Form.Item name='email' rules={[{type: 'email',required: true, message: 'Digite um e-mail valido!'},]}>
            <Input  placeholder="Digite seu e-mail" style={{borderRadius: "15px"}}/>
          </Form.Item >
          <Form.Item name="password" rules={[{ required: true, message: 'Por favor digite sua senha!',},]}>
            <Input  type="password" placeholder="Digite sua senha"  style={{borderRadius: "15px"}}/>
          </Form.Item>
          {
            //CASO O USUÁRIO SEJA UM ADMINISTRADOR (ACESSO LIVRE)
            localStorage.getItem('typeUser') == "A" ? (
              <Form.Item name="typeUser" rules={[{ required: true, message: "Selecione o nível de usuário" }]}>
                <Select placeholder="Selecione o nível do usuário" allowClear>
                  <Option value="A">Administrador</Option>
                  <Option value="R">Representante</Option>
                  <Option value="S">Cliente</Option>
                </Select>
              </Form.Item>
            )
            : ""
          }
          
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