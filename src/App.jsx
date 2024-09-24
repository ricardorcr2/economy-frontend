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

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Relatorios</Link>
          </li>
          <li>
            <Link to="/despesa">Despesas</Link>
          </li>
          <li>
            <Link to="/receita">Receitas</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Relatorio />
          </Route>
          <Route path="/despesa">
            <Despesa />
          </Route>
          <Route path="/receita">
            <Receita />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}