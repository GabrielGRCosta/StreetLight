// entityController.js
const axios = require('axios');

const orionBaseUrl = "http://localhost:1026";


let entities = []; // Array para armazenar as entidades

// Função para criar uma entidade
exports.createEntity = (req, res) => {
  const entity = req.body;
  const id = String(entities.length);
  entity.id = id;

  entities.push(entity); // Adicionar a entidade ao array

  axios
    .post(`${orionBaseUrl}/v2/entities`, entity)
    .then(response => {
      console.log('Entidade criada:', response.data);
      res.sendStatus(201); // Status de resposta: Created
    })
    .catch(error => {
      console.error('Erro ao criar entidade:', error);
      res.status(500).send('Erro ao criar entidade');
    });
};

// Função para obter todas as entidades
exports.getEntities = (req, res) => {
  axios
    .get(`${orionBaseUrl}/v2/entities`)
    .then(response => {
      const entities = response.data;
      console.log('Entidades:', entities);
      res.json(entities);
    })
    .catch(error => {
      console.error('Erro ao consultar entidades:', error);
      res.status(500).send('Erro ao consultar entidades');
    });
};

exports.getEntity = (req, res) => {
  const entityId = req.params.id;

  axios
    .get(`${orionBaseUrl}/v2/entities/${entityId}`)
    .then(response => {
      const entity = response.data;
      console.log('Entidade encontrada:', entity);
      res.status(200).json(entity);
    })
    .catch(error => {
      console.error('Erro ao consultar entidade:', error);
      res.status(500).send('Erro ao consultar entidade');
    });
};


// Função para remover uma entidade
exports.removeEntity = (req, res) => {
  const entityId = req.params.id;

  axios
    .delete(`${orionBaseUrl}/v2/entities/${entityId}`)
    .then(response => {
      console.log('Entidade removida com sucesso');
      res.sendStatus(204); // Status de resposta: No Content
    })
    .catch(error => {
      console.error('Erro ao remover entidade:', error);
      res.status(500).send('Erro ao remover entidade');
    });
};

// Função para atualizar uma entidade
exports.updateEntity = (req, res) => {
  const entityId = req.params.id;
  const updatedAttributes = req.body;

  axios
    .patch(`${orionBaseUrl}/v2/entities/${entityId}/attrs`, updatedAttributes)
    .then(response => {
      console.log('Entidade atualizada:', response.data);
      res.sendStatus(200); // Status de resposta: OK
    })
    .catch(error => {
      console.error('Erro ao atualizar entidade:', error);
      res.status(500).send('Erro ao atualizar entidade');
    });
};
