import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null); // Przechowuje użytkownika w trakcie edycji
  const [errors, setErrors] = useState({});

  // Pobranie listy użytkowników z API
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // Usuwanie użytkownika
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

  // Funkcja walidacji
  const validate = (user) => {
    const newErrors = {};
    if (!user.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane.';
    }
    if (!user.email.trim()) {
      newErrors.email = 'E-mail jest wymagany.';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Niepoprawny format adresu e-mail.';
    }
    return newErrors;
  };

  // Dodawanie nowego użytkownika
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

  // Rozpoczęcie edycji użytkownika
  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  // Zapisanie zmian edytowanego użytkownika
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
    setEditingUser(null); // Zakończenie edycji
    setNewUser({ name: '', email: '' });
    setErrors({});
  };

  return (
    <div>
      <h2>Zarządzanie użytkownikami</h2>
      {loading ? (
        <p>Ładowanie użytkowników...</p>
      ) : (
        <>
          {/* Lista użytkowników */}
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
                <button onClick={() => handleEdit(user)}>Edytuj</button>
                <button onClick={() => handleDelete(user.id)}>Usuń</button>
              </li>
            ))}
          </ul>

          {/* Formularz dodawania/edycji */}
          <form onSubmit={editingUser ? handleSaveEdit : handleAddUser}>
            <h3>{editingUser ? 'Edytuj użytkownika' : 'Dodaj nowego użytkownika'}</h3>
            <div>
              <input
                type="text"
                placeholder="Imię i nazwisko"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="E-mail"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <button type="submit">
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
              >
                Anuluj
              </button>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default UserManagement;
