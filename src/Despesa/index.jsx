import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

export default function Despesa() {
  const [despesas, setDespesas] = useState([]);

  async function getDespesas() {
    const response = await axios.get('http://localhost:8080/despesa');
    setDespesas(response.data);
  }

  useEffect(() => {
    getDespesas();
  }, []);

  return (
    <div className="despesa-container">
      <p>Lista de Despesas</p>
      <table className="despesa-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa, index) => (
            <tr key={index}>
              <td>{despesa.descricao}</td>
              <td>{despesa.categoria}</td>
              <td>R$ {despesa.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
