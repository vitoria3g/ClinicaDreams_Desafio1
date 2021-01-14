import React, {useState}    from 'react';
import {useHistory, Link}   from 'react-router-dom';
import { Menu }             from 'antd';
import {AppstoreOutlined, SettingOutlined,UserOutlined, AppstoreAddOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;
//ID dos submenus de 1° nível
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

const MenuComponent = () => {

  const typeUser = localStorage.getItem('typeUser');
  const [openKeys, setOpenKeys] = useState([]);
  const history = useHistory();

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  function handleLogout(){
    localStorage.clear(); //limpar as variaveis
    history.push('/');
  }

  function searchUser(type){
    localStorage.setItem('searchUser', type);
    history.push('/searchUser');
  }
  return(
         <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 210 }}>
            <SubMenu key="sub1" icon={<AppstoreOutlined  />} title="Atendimento">
            {typeUser !== "R" ? 
              <Menu.Item key="1">
              <Link to="/createCustomer">
                Novo pedido
                </Link>
              </Menu.Item>
              : ""
              }
              <Menu.Item key="2">
                  <Link to="/customer">
                    Meus pedidos
                  </Link>
              </Menu.Item>
              {typeUser !== "S" ? 
              <Menu.Item key="3">
                <Link to="/personService">
                  Ações 
                 </Link>
              </Menu.Item> 
              : ""
              }
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreAddOutlined />} title="Serviços">
            {typeUser == "A" ? 
              <Menu.Item key="4">
                <Link to="/registrationService">
                  Novo serviço
                  </Link>
              </Menu.Item> 
              : ""
              }
              <Menu.Item key="5">
                <Link to="/searchService">
                  Produtos Dreams
                  </Link>
                </Menu.Item>
            {typeUser == "A" ? 
              <Menu.Item key="6">
                <Link to="/associate">
                  Vincular Representante
                  </Link>
              </Menu.Item> 
              : ""
              }
            </SubMenu>
            {typeUser == "A" ? (
              <SubMenu key="sub3" icon={<UserOutlined />} title="Usuários">
                <Menu.Item key="7">
                  <Link to="/register">
                    Novo usuário
                  </Link>
                </Menu.Item>
                <SubMenu key="sub4" title="Visualizar">
                  <Menu.Item key="8" onClick={()=>{searchUser("A")}}>Administradores</Menu.Item>
                  <Menu.Item key="9" onClick={()=>{searchUser("S")}}>Clientes</Menu.Item>
                  <Menu.Item key="10" onClick={()=>{searchUser("R")}}>Representante</Menu.Item>
                </SubMenu>
              </SubMenu>
              ) : ""
            }
            <SubMenu key="sub5" icon={<SettingOutlined/>} title="Minha conta">
              <Menu.Item key="11">Atualizar dados</Menu.Item>
              <Menu.Item key="12" onClick={handleLogout}>Sair</Menu.Item>
            </SubMenu>
         </Menu>
  );
}

export default MenuComponent;