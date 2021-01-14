import React, {useState, useEffect}      from 'react';
import {useHistory}                      from 'react-router-dom';
import {Modal, Table}                    from 'antd';
import api                               from '../../../../services/api';
import '../../../pages/global.scss';

const Search = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [service, setService] = useState([]);
  const typeUser = localStorage.getItem('typeUser');
  
  useEffect(async()=>{
     var response =  await api.get('/services',{headers:{typeUser}});
     setService(response.data)
  },[]);

  const handleOk = () => {
    setIsModalVisible(false);
    history.goBack();
  };

  const columns = [
    {title: 'Titulo', dataIndex: 'title', key: 'title'},
    {title: 'Descrição', dataIndex: 'description', key: 'description'},
    {title: 'Valor', dataIndex: 'value', key: 'value'},
    {title: 'Situação', dataIndex: 'status', key: 'status'},
    {title: 'Responsavel', dataIndex: 'name', key: 'name'}
  ];

  const data = [];
  for(let i = 0; i < service.length; ++i){
      data.push({
        key: service[i].idService,
        title: service[i].title,
        description: service[i].description,
        value: service[i].value,
        status: service[i].status == "D" ? "Disponivel" : "Indisponivel",
        name: service[i].name
      });
  }
  
  return (
     <>
      <Modal title="Produtos" visible={isModalVisible} onOk={handleOk} width={660} centered okButtonProps={{ display: "none" }} cancelButtonProps={{ disabled: true }}>
        <div style={{overflow: "auto", overflowY: "auto", height: "400px"}}>
          <Table
              className="components-table-demo-nested"
              columns={columns}
              dataSource={data}
              pagination={false}
           />
        </div>
      </Modal>
    </>
    );
};

export default Search;

