import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

export default function Receita() {
  const [receitas, setReceitas] = useState([]);
  const [total, setTotal] = useState(0)

  async function getReceitas() {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        "token": token
      }
    }
    const response = await axios.get('http://localhost:8080/receita', axiosConfig);
    setReceitas(response.data);
    const totalValor = response.data.reduce((acc, despesa) => acc + despesa.valor, 0);
    setTotal(totalValor);
  }

  useEffect(() => {
    getReceitas();
  }, []);

  return (
    <div className="receita-container">
      <p>Lista de Receitas</p>
      <div>
      <table className="receita-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {receitas.map((receita, index) => (
            <tr key={index}>
              <td>{receita.descricao}</td>
              <td>{receita.categoria}</td>
              <td>{new Date(receita.data).toLocaleDateString('pt-BR')}</td>
              <td>R$ {receita.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-container">
          <strong>Total:</strong> R$ {total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
