import React                           from 'react';
import {useHistory, Link }             from 'react-router-dom';
import {Form, Input, Button}           from 'antd';
import {UserOutlined, LockOutlined}    from '@ant-design/icons';
import api                             from '../../../services/api';
import logoImg                         from '../../assets/dreams.png';
import Img                             from '../../assets/bodyImage.png';
import './style.scss'


const Logon = () => {
  const history = useHistory();

  async function handleLogin(event){
    try
    {
         const {email, password} = event; 
         const data = {email, password}
         var response = await api.post('/authenticate', data);
         console.log(response.data)
         if(response.status === 200){
            localStorage.setItem('userId', response.data.user[0].idUser);
            localStorage.setItem('typeUser', response.data.user[0].typeUser);
            localStorage.setItem('token', response.data.token);
            history.push('/home');
         }
        
    }
    catch(err)
    {
        alert("E-mail ou senha invalidos!");
    }
  }
  
  return (
    <div className="logon-container">
    <section className="form">
        <img src={logoImg} alt="Dreams" id="logoImage"/>
        <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={handleLogin}>
          <Form.Item name='email' rules={[{type: 'email',required: true, message: 'Digite um e-mail valido!'},]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Digite seu e-mail" style={{borderRadius: "15px"}}/>
          </Form.Item >
          <Form.Item name="password" rules={[{ required: true, message: 'Por favor digite sua senha!',},]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Digite sua senha"  style={{borderRadius: "15px"}}/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="button">
              Entrar
            </Button>
            <Link className="back-link" to="/register">
              não tenho cadastro
            </Link>
          </Form.Item>
      </Form>
    </section>
    <img src={Img}/>
</div>
  );
};

export default Logon;