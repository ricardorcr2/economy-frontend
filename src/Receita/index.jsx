import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

export default function Receita() {
  const [receitas, setReceitas] = useState([]);

  async function getReceitas() {
    const response = await axios.get('http://localhost:8080/receita');
    setReceitas(response.data);
  }

  useEffect(() => {
    getReceitas();
  }, []);

  return (
    <div className="receita-container">
      <p>Lista de Receitas</p>
      <table className="receita-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {receitas.map((receita, index) => (
            <tr key={index}>
              <td>{receita.descricao}</td>
              <td>{receita.categoria}</td>
              <td>R$ {receita.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
