const express = require('express');
var cors = require('cors')
const app = express();

// Importar os controladores e as rotas
const entityController = require('./controllers/entityController');
const entityRoutes = require('./routes/entityRoutes');

// Configurar o servidor Express
app.use(express.json());
app.use(cors())

// Definir as rotas
app.use('/entities', entityRoutes);

// Iniciar o servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
