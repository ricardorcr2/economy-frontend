import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Relatorio from "./Relatorio";
import Signin from "./Signin";
import Signup from "./Signup";
import Despesa from "./Despesa";
import Receita from "./Receita";
import DespesaForm from "./Despesa/form";
import ReceitaForm from "./Receita/form";

export default function App() {
  const token = localStorage.getItem('token');

  function signout() {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>Financeiro</h1>
          </div>
          <ul className="nav-links">
            {
              token ? (
                <>
                  <li>
                    <Link to="/" className="nav-link">
                      <i className="fas fa-chart-line"></i> Relatórios
                    </Link>
                  </li>
                  <li>
                    <Link to="/despesa" className="nav-link">
                      <i className="fas fa-money-bill-wave"></i> Despesas
                    </Link>
                  </li>
                  <li>
                    <Link to="/receita" className="nav-link">
                      <i className="fas fa-dollar-sign"></i> Receitas
                    </Link>
                  </li>
                  <li>
                    <Link to="/despesa-form" className="nav-link">
                      <i className="fas fa-plus-circle"></i> Criar despesa
                    </Link>
                  </li>
                  <li>
                    <Link to="/receita-form" className="nav-link">
                      <i className="fas fa-plus-circle"></i> Criar receita
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="nav-link" onClick={signout}>
                      <i className="fas fa-sign-out-alt"></i> Sair
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signin" className="nav-link">
                      <i className="fas fa-sign-in-alt"></i> Entrar
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="nav-link">
                      <i className="fas fa-user-plus"></i> Cadastrar
                    </Link>
                  </li>
                </>
              )
            }
          </ul>
        </nav>

        <hr />
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
