const axios = require('axios');

const entityData = require('../iluminacao.json');

axios.post('http://localhost:1026/v2/entities', entityData)
  .then(response => {
    console.log('Entidade registrada com sucesso');
  })
  .catch(error => {
    console.error('Erro ao registrar entidade:', error);
  });
