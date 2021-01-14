import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Pages
import Logon           from './app/pages/Logon';
import Home            from './app/pages/Home';
import Users           from './app/pages/Users/Search';
import Register        from './app/pages/Users/Registration';
import Customer        from './app/pages/Customer/Register';
import Responsible     from './app/pages/Customer/Responsible';
import SearchCustomer  from './app/pages/Customer/Requests';
import RegisterService from './app/pages/DreamsServices/Register';
import SearchService   from './app/pages/DreamsServices/Search';
import AssociatePerson from './app/pages/DreamsServices/AssociatePerson';


export default function Routes(){
  return (
      <BrowserRouter> 
          <Switch> 
              <Route path="/" exact component={Logon}/>
              <Route path="/home" component={Home}/>
              <Route path="/searchUser" component={Users}/>
              <Route path="/register" component={Register}/>
              <Route path="/createCustomer" component={Customer}/>
              <Route path="/personService" component={Responsible}/>
              <Route path="/customer" component={SearchCustomer}/>
              <Route path="/registrationService" component={RegisterService}/>
              <Route path="/searchService" component={SearchService}/>
              <Route path="/associate" component={AssociatePerson}/>
          </Switch>
      </BrowserRouter>
  );
}