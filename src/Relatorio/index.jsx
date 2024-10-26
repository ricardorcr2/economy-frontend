import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, plugins } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importando o plugin
import { drawPointLegend } from 'chart.js/helpers';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, ChartDataLabels, Legend);


  // est para gráfico
  const FinanceChart = ({ totalReceitas, totalDespesas }) => {
    const dataBar= {
      //options: {legend: { display: false},},
      labels: ['Receitas', 'Despesas'],
      datasets: [
        {
          label: ['Receitas', 'Despesas'],
          data: [totalReceitas, totalDespesas],
          backgroundColor: ['#4CAF50', '#F44336'], // Verde para receitas, vermelho para despesas
          borderColor: ['#388E3C', '#D32F2F'],
          borderWidth: 1,  
          
        },  
      ], 
    }; 

    const optionBar = {
      plugins: {
        legend: {
          display: false,
          position: 'top',
          reverse: true
        },  
      }
    }
  
    return <Bar data={dataBar} options={optionBar}/>;
  }; 

  // Componente para gráfico de pizza
const PieChart = ({ totalDespesas, totalReceitas }) => {
  const dataPie = {
    labels: ['Despesas', 'Receitas'],
    datasets: [
      {
        data: [totalDespesas, totalReceitas],
        backgroundColor: ['#F44336', '#4CAF50'],
        hoverBackgroundColor: ['#D32F2F', '#388E3C'],
      },
    ],
  };

  const optionsPie = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        reverse: true
      },
      datalabels: {
        formatter: (value, ctx) => {
          const total = totalReceitas + totalDespesas;
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff', // Cor do texto das porcentagens
        font: {
          weight: 'bold',
          size: '16', // Tamanho da fonte das porcentagens
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={dataPie} options={optionsPie} />;
};

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

  return (
    <div className="relatorio-container">
      <h1>Relatório de Receitas e Despesas</h1>

      <FinanceChart totalDespesas={totalDespesas} totalReceitas={totalReceitas} />  
      <PieChart totalDespesas={totalDespesas} totalReceitas={totalReceitas} /> {/* Adicionando gráfico de pizza */}
    

      {/* Contêiner das tabelas */}
      <div className="tables-container">
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
          <div className="total-receita-container">
            <strong>Total Receitas:</strong> R$ {totalReceitas.toFixed(2)}
          </div>
        </div>

        {/* Tabela de Despesass */}
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
