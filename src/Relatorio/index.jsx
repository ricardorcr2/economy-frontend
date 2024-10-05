import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Relatorio() {
  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);


  async function getDespesas() {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        "token": token
      }
    }

    const response = await axios.get('http://localhost:8080/despesa', axiosConfig);
    setDespesas(response.data);
    const totalValorDespesas = response.data.reduce((acc, despesa) => acc + despesa.valor, 0);
    setTotalDespesas(totalValorDespesas);
  }

  async function getReceitas() {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        "token": token
      }
    };
    const response = await axios.get('http://localhost:8080/receita', axiosConfig);
    setReceitas(response.data);
    const totalValorReceitas = response.data.reduce((acc, receita) => acc + receita.valor, 0);
    setTotalReceitas(totalValorReceitas);
  }

  useEffect(() => {
    getDespesas();
    getReceitas();
  }, []);

  const data = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        label: 'Valores',
        data: [totalReceitas, totalDespesas],
        backgroundColor: ['#4CAF50', '#F44336'], // Cores: verde para receitas e vermelho para despesas
        borderColor: ['#388E3C', '#D32F2F'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relatorio-container">
      <h1>Relatório de Receitas e Despesas</h1>

      {/* Contêiner das tabelas */}
      <div className="tables-container">
        {/* Tabela de Despesas */}
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
          <div className="total-despesa-container">
            <strong>Total Despesas:</strong> R$ {totalDespesas.toFixed(2)}
          </div>
        </div>

        {/* Tabela de Receitas */}
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
          <div className="total-container">
            <strong>Total Receitas:</strong> R$ {totalReceitas.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Resultado final - Receita líquida */}
      <div className="resultado-container">
        <h2> <p>
          <strong>Receita Líquida:</strong> R$ {(totalReceitas - totalDespesas).toFixed(2)}
        </p>
        </h2>
      </div>
    </div>
  );
}
