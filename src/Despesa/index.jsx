import { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';

export default function Despesa() {

    const [despesas, setDespesas] = useState([])

    async function getDespesas() {
        const response = await axios.get('http://localhost:8080/despesa');
        setDespesas(response.data)
    }

    async function getReceitas() {
        const response = await axios.get('http://localhost:8080/receita');
        setDespesas(response.data)
    }

    useEffect(() => {
        getDespesas()
    }, [])

    return (
        <div>
            <p>
                Lista de Despesas
            </p> 
            {despesas.map(despesa => (
                <>
                {despesa.descricao} / {despesa.categoria} / {despesa.valor} 
                <br />
                </>
            ))}
        </div>
    );
}