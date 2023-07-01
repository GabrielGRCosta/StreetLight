const express = require('express');
const app = express();

// Importar os controladores e as rotas
const entityController = require('./controllers/entityController');
const entityRoutes = require('./routes/entityRoutes');

// Configurar o servidor Express
app.use(express.json());

// Definir as rotas
app.use('/entities', entityRoutes);

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
