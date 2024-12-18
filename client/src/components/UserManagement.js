import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.success) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error('Błąd usuwania użytkownika:', error);
    }
  };

  const validate = (user) => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = 'Imię i nazwisko jest wymagane.';
    if (!user.email.trim()) newErrors.email = 'E-mail jest wymagany.';
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = 'Niepoprawny format adresu e-mail.';
    return newErrors;
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const validationErrors = validate(newUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const id = Math.max(...users.map((user) => user.id), 0) + 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: '', email: '' });
    setErrors({});
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const validationErrors = validate(newUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setUsers(
      users.map((user) =>
        user.id === editingUser.id ? { ...user, ...newUser } : user
      )
    );
    setEditingUser(null);
    setNewUser({ name: '', email: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Zarządzanie Użytkownikami
      </h2>

      {/* Lista użytkowników */}
      {loading ? (
        <p className="text-center text-gray-500">Ładowanie użytkowników...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-700">
                  {user.name}
                </h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formularz dodawania/edycji */}
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
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
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
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
                  setNewUser({ name: '', email: '' });
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
