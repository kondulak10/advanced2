import axios from 'axios';

export function login(item) {
  return new Promise((resolve, reject) => {
    axios.post('/api/users/login', item).then(response => {
      resolve(Object.assign({}, response));
    }).catch(r => {
      reject({message: "Fail"})
    });
  });
}

export function useToken(item) {
  return new Promise((resolve, reject) => {
    axios.post('/api/users/useToken', item).then(response => {
      resolve(Object.assign({}, response));
    }).catch(r => {
      reject({message: "Fail"})
    });
  });
}

export function createItem(item) {
  return new Promise((resolve, reject) => {
    axios.post('/api/users/create', item).then(response => {
      resolve(Object.assign({}, response.data.item));
    }).catch(r => {
      reject({message: "Fail"})
    });
  });
}

export function logoutUser() {
  return new Promise((resolve, reject) => {
    axios.post('/api/users/logout').then(response => {
      resolve();
    }).catch(r => {
      reject({message: "Fail"})
    });
  });
}
