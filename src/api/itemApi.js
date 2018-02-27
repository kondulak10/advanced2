import axios from 'axios';

function getHeaders() {
  return {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
  }
}

export function createItem(item) {
  return new Promise((resolve, reject) => {
    axios.post('/api/items/create', item, getHeaders()).then(response => {
      resolve(Object.assign({}, response.data.item));
    }).catch(r => {
      reject(r);
    });
  });
}

export function getAll() {
  return new Promise((resolve, reject) => {
    axios.get('/api/items/all').then(response => {
      resolve(response.data.items);
    });
  });
}

export function getSearch(search) {
  return new Promise((resolve, reject) => {
    axios.post('/api/items/search', search).then(response => {
      resolve(response.data.items);
    });
  });
}

export function updateItem(item) {
  return new Promise((resolve, reject, headers) => {
    axios.post('/api/items/update', item, getHeaders()).then(response => {
      resolve(Object.assign({}, response.data.item));
    }).catch(r => {
      reject(r);
    });
  });
}

export function getItemById(id) {
  return new Promise((resolve, reject) => {
    axios.post('/api/items/getById', { id: id }).then(response => {
      resolve(Object.assign({}, response.data.item));
    });
  });
}
