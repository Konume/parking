import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Walidacja formularza
    if (!email || !password) {
      setError('Proszę wypełnić oba pola');
      return;
    }

    // Walidacja e-maila
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Proszę podać poprawny adres e-mail');
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
  

    setLoading(true); // Rozpoczęcie ładowania
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Nieznany błąd');
        return;
      }

      // Zapisanie danych użytkownika i tokenu w localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      // Wywołujemy funkcję `onLogin` z danymi użytkownika
      onLogin(data.user);
    } catch (error) {
      setError('Błąd połączenia z serwerem');
      console.error(error);
    } finally {
      setLoading(false); // Zakończenie ładowania
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-2xl font-bold text-center">Logowanie</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>} {/* Wyświetlanie błędu */}
    </div>
  );
}

export default Login;
