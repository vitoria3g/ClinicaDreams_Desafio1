import React, {useState, useEffect}      from 'react';
import {useHistory}                      from 'react-router-dom';
import {Modal, Table,Spin}               from 'antd';
import api                               from '../../../../services/api';
import '../../../pages/global.scss';

const Users = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [user, setUser] = useState([]);
  const typeUser = localStorage.getItem("searchUser")
  
  useEffect(async()=>{   
     var response = await api.get('/users', {headers:{typeUser}});
     setUser(response.data)
  },[]);
  const handleOk = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  const columns = [
    {title: 'Nome', dataIndex: 'name', key: 'name'},
    {title: 'Email', dataIndex: 'email', key: 'email'},
    {title: 'Nível', dataIndex: 'type', key: 'type'},
    {title: 'Ativo', dataIndex: 'active', key: 'active'},
    {title: 'Criado em', dataIndex: 'createAt', key: 'createAt'}
  ];

  const data = [];
  for(let i = 0; i < user.length; ++i){
      data.push({
        key: user[i].idUser,
        name: user[i].name,
        email: user[i].email,
        type: user[i].typeUser == "S" ? "Cliente" : user[i].typeUser == "R" ? "Representante" : "Administrador",
        active: user[i].active == "S" ? "Sim" : "Não",
        createAt: new Date(user[i].createAt).toLocaleDateString()
      });
  }
  
  return (
     <>
      <Modal title="Usuários" visible={isModalVisible} onOk={handleOk} width={660} centered okButtonProps={{ display: "none" }} cancelButtonProps={{ disabled: true }}>
      {
        user.length > 0 ?
        <div style={{overflow: "auto", overflowY: "auto", height: "400px"}}>
          <Table
              className="components-table-demo-nested"
              columns={columns}
              dataSource={data}
              pagination={false}
          />
        </div>
        :
        <div className="loading">
          <Spin  tip="Aguarde..."/>
        </div>
      } 
    </Modal>
    </>
  );
};

export default Users;

