import { useState } from 'react';
import './style.css';
import axios from 'axios';

export default function Signin() {
    const [formData, setFormData] = useState({
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
            email: formData.email,
            senha: formData.senha,
        };

        axios.post('http://localhost:8080/user/login', newObject)
            .then((response) => {
                console.log('Login successful:', response.data);
                localStorage.setItem("token", response.data.token);
                window.location.href = "/";
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type='text'
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

                    <button type="submit" className="login-button">Logar</button>
                </form>
            </div>
        </div>
    );
}
