import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

export default function Despesa() {
  const [despesas, setDespesas] = useState([]);
  const [total, setTotal] = useState(0)

  async function getDespesas() {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        "token": token
      }
    }
    const response = await axios.get('http://localhost:8080/despesa', axiosConfig);
    setDespesas(response.data);
    const totalValor = response.data.reduce((acc, despesa) => acc + despesa.valor, 0);
    setTotal(totalValor);
  }

  useEffect(() => {
    getDespesas();
  }, []);

  return (
    <div className="despesa-container">
      <p>Lista de Despesas</p>
      <div>
      <table className="despesa-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa, index) => (
            <tr key={index}>
              <td>{despesa.descricao}</td>
              <td>{despesa.categoria}</td>
              <td>{new Date(despesa.data).toLocaleDateString('pt-BR')}</td>
              <td>R$ {despesa.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-despesa-container">
          <strong>Total:</strong> R$ {total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
