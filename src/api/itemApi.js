import axios from 'axios';

export function createItem(item) {
  return new Promise((resolve, reject) => {
    axios.post('/api/items/create', item).then(response => {
      resolve(Object.assign({}, response.data.item));
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

export function updateItem(item) {
  return new Promise((resolve, reject) => {
    axios.post('/api/items/update', item).then(response => {
      resolve(Object.assign({}, response.data.item));
    });
  });
}

export function getItemById(id) {
  return new Promise((resolve, reject) => {
    axios.post('/api/items/getById', {id: id}).then(response => {
      resolve(Object.assign({}, response.data.item));
    });
  });
}
