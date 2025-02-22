const bcrypt = require('bcryptjs');

const password = 'qaz123'; // Hasło z formularza
const hashedPassword = '$2a$10$cMTdLA2f93qfyhutrNXQM.0s5r0lE/v9tWt8QQpXX4cwwSpRPle82'; // Hasło zapisane w bazie

bcrypt.compare(password, hashedPassword).then(isMatch => {
  console.log(isMatch); // Powinno zwrócić true, jeśli hasła są zgodne
}).catch(err => console.error(err));
