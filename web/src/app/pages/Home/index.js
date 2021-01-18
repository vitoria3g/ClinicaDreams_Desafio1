import React, {useEffect, useState}   from 'react';
import {useHistory }                  from 'react-router-dom';
import api                            from '../../../services/api';
import MenuComponent                  from '../Components/Menu';
import {Button, Tooltip, Drawer}      from 'antd';
import {MenuOutlined}                 from '@ant-design/icons';
import logoImg                        from '../../assets/dreams.png';
import './style.scss';
const UserPage = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(true);

  useEffect(()=>{
    const userId = localStorage.getItem('userId');
    if(!userId){
      history.push('/');
    }
    //const response = api.get('/users'); 
  },[])

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  
  return (
    <>
      <div id="header">
        <img src={logoImg} id="ImageLogo"/>
        <Tooltip title="abrir menu">
          <Button onClick={showDrawer} id="Btn_menu">
            <MenuOutlined/>
          </Button>
        </Tooltip>
      </div>
      <Drawer title="" placement="right" closable={false} onClose={onClose} visible={visible}>
        <MenuComponent/>
      </Drawer>
      </>
    );
};

export default UserPage;

