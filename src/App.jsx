import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Relatorio from "./Relatorio";
import Despesa from "./Despesa";
import Receita from "./Receita";
import DespesaForm from "./Despesa/form";
import ReceitaForm from "./Receita/form";
import './style.css'; // Importando o CSS para estilização
import Signin from "./Signin";
import Signup from "./Signup";

export default function App() {
  return (
    <Router>
      <div>
        {/* Menu de navegação */}
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/">Relatórios</Link>
            </li>
            <li className="nav-item">
              <Link to="/despesa">Despesas</Link>
            </li>
            <li className="nav-item">
              <Link to="/despesa-form">Criar Despesa</Link>
            </li>
            <li className="nav-item">
              <Link to="/receita">Receitas</Link>
            </li>
            <li className="nav-item">
              <Link to="/receita-form">Criar Receita</Link>
            </li>
            <li className="nav-item">
              <Link to="/signin">Entrar</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">Cadastrar</Link>
            </li>
          </ul>
        </nav>
        
        <Switch>
          <Route exact path="/">
            <Relatorio />
          </Route>
          <Route path="/signin">
           <Signin />
          </Route>
          <Route path="/signup">
           <Signup />
          </Route>
          <Route path="/despesa">
            <Despesa />
          </Route>
          <Route path="/despesa-form">
            <DespesaForm />
          </Route>
          <Route path="/receita">
            <Receita />
          </Route>
          <Route path="/receita-form">
            <ReceitaForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
