import { useState } from 'react';
import './style.css';
import axios from 'axios';

export default function Signup() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        const newObject = {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
        };

        axios.post('http://localhost:8080/user/create', newObject)
            .then((response) => {
                console.log('User created successfully:', response.data);
                window.location.href = "/signin";
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Criar Conta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type='text'
                            name='nome'
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type='password'
                            name='senha'
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="signup-button">Criar Usuário</button>
                </form>
            </div>
        </div>
    );
}
