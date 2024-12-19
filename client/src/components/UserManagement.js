import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, createUser, updateUser } from '../api';

function UserManagement() {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Błąd ładowania użytkowników:', error);
        setLoading(false);
      });
  }, []);

  const validate = (user) => {
    const newErrors = {};
    if (!user.password.trim()) newErrors.password = 'Hasło jest wymagane.';
    else if (user.password.length < 6) newErrors.password = 'Hasło musi mieć co najmniej 6 znaków.';
    if (!user.name.trim()) newErrors.name = 'Imię i nazwisko jest wymagane.';
    else if (user.name.length < 3) newErrors.name = 'Imię musi mieć co najmniej 3 znaki.';
    if (!user.email.trim()) newErrors.email = 'E-mail jest wymagany.';
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = 'Niepoprawny format adresu e-mail.';
    return newErrors;
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const validationErrors = validate(newUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await createUser(newUser);
      setUsers([...users, response.data]);
      setMessage('Użytkownik został dodany.');
    } catch (error) {
      console.error('Błąd przy dodawaniu użytkownika:', error);
      setMessage('Błąd przy dodawaniu użytkownika.');
    } finally {
      setNewUser({ name: '', email: '', role: 'user' });
      setErrors({});
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email, role: user.role });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(newUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await updateUser(editingUser.id, newUser);
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...newUser } : user
        )
      );
      setMessage('Dane użytkownika zostały zaktualizowane.');
    } catch (error) {
      console.error('Błąd przy edytowaniu użytkownika:', error);
      setMessage('Błąd przy edytowaniu użytkownika.');
    } finally {
      setEditingUser(null);
      setNewUser({ name: '', email: '', role: 'user' });
      setErrors({});
    }
  };

  const handleDelete = async (id) => {
    console.log('ID do usunięcia:', id);  // Sprawdzenie, co jest przekazywane
    if (!id) {
      console.error('Niepoprawne ID użytkownika');
      return;
    }
  
    try {
      const response = await deleteUser(id);  // Przekazanie id użytkownika do usunięcia
      if (response.success) {
        setUsers(users.filter((user) => user.id !== id));  // Usuwanie użytkownika z listy
        setMessage('Użytkownik został usunięty.');
      } else {
        setMessage('Błąd przy usuwaniu użytkownika.');
      }
    } catch (error) {
      console.error('Błąd usuwania użytkownika:', error);
      setMessage('Błąd usuwania użytkownika.');
    }
  };
  
  
  const filteredUsers = users.filter(
    (user) =>
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(search.toLowerCase()))
  );
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Zarządzanie Użytkownikami
      </h2>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {message}
        </div>
      )}

      <input
        type="text"
        placeholder="Szukaj..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 border p-2 rounded w-full"
      />

      {loading ? (
        <p className="text-center text-gray-500">Ładowanie użytkowników...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between transition-transform transform hover:scale-105"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-700">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500 text-sm">Rola: {user.role}</p>
              </div>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {editingUser ? 'Edytuj użytkownika' : 'Dodaj nowego użytkownika'}
        </h3>
        <form
          onSubmit={editingUser ? handleSaveEdit : handleAddUser}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-600 mb-1">Imię i nazwisko</label>
            <input
              type="text"
              placeholder="Wprowadź imię i nazwisko"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 mb-1">E-mail</label>
            <input
              type="email"
              placeholder="Wprowadź e-mail"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Wprowadź hasło"
              value={newUser.password || ''}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Rola</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="user">Użytkownik</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {editingUser ? 'Zapisz zmiany' : 'Dodaj użytkownika'}
            </button>
            {editingUser && (
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setNewUser({ name: '', email: '', role: 'user' });
                  setErrors({});
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Anuluj
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserManagement;
