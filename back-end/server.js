const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3000;
const entityController = require('./controllers/entityController');
const entityRoutes = require('./routes/entityRoutes');


// Configurar o servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });


// Configurar o servidor Express
app.use(express.json());

// Definir as rotas
app.use('/entities', entityRoutes);

app.post('/inscricao', (req, res) => {
  // Aqui você pode receber os dados do usuário enviados pelo front-end
  const { email, dispositivo } = req.body;

  // Salve as informações de inscrição em algum lugar (banco de dados, arquivo, etc.)
  // ...

  // Envie uma resposta indicando que a inscrição foi realizada com sucesso
  res.status(200).json({ message: 'Inscrição realizada com sucesso' });
});


// Rota para receber as notificações de atualização de entidades
app.post('/notificacao-atualizacao', async (req, res) => {
  try {
    // Aqui você pode extrair os dados da notificação recebida
    const { id, status } = req.body;

    // Enviar uma notificação para os clientes conectados via WebSocket
    const notificacao = { id, status, mensagem: 'A entidade foi atualizada' };
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(notificacao));
      }
    });

    // Enviar uma resposta de sucesso
    res.status(200).json({ message: 'Notificação enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    res.status(500).send('Erro ao enviar notificação');
  }
});

// Iniciar o servidor HTTP
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});

// Tratar as conexões WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Evento para lidar com mensagens recebidas do cliente
  ws.on('message', (message) => {
    console.log('Mensagem recebida:', message);

    // Lógica para processar as mensagens recebidas do cliente
    // ...
  });

  // Evento para lidar com o fechamento da conexão pelo cliente
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});
