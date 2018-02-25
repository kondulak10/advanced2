import delay from '../delay';

export const items = [
  {
    id: 1,
    name: "Item 1",
    price: 20,
    brand: "Brand A",
    discount: 10,
    pay: 1,
    get: 1
  },
  {
    id: 2,
    name: "Item 2",
    price: 4000,
    brand: "Brand A",
    discount: 0,
    pay: 2,
    get: 3
  },
  {
    id: 3,
    name: "Item 3",
    price: 234,
    brand: "Brand B",
    discount: 0,
    pay: 1,
    get: 1
  },
  {
    id: 4,
    name: "Item 4",
    price: 566,
    brand: "Brand A",
    discount: 70,
    pay: 2,
    get: 6
  },
  {
    id: 5,
    name: "Item 5",
    price: 52300,
    brand: "Brand B",
    discount: 0,
    pay: 1,
    get: 1
  },
  {
    id: 6,
    name: "Item 6",
    price: 2,
    brand: "Brand C",
    discount: 0,
    pay: 1,
    get: 3
  }
]

class ItemApi {
  //get all items
  static getAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], items));
      }, delay);
    });
  }


  //create item
  static createItem(item) {
    item = Object.assign({}, item);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //checks
        if (!item.name || !item.price || !item.brand || item.name.length == 0 || item.price.length == 0 || item.brand.length == 0) {
          reject("Fill all info");
        }
        item.id = Math.max.apply(Math, items.map(function (o) { return o.id; })) + 1;
        items.push(item);
        resolve(item);
      }, delay)
    });
  }

  //get element by id
  static getItemById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let i of items) {
          if (i.id === id) {
            resolve(i);
          }
        }
        reject(null);
      }, delay)
    })
  }

  //update elemebt by id
  static updateItem(itemP) {
    var item = Object.assign({}, itemP);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //fix
        item.price = parseInt(item.price);
        item.discount = parseInt(item.discount);
        item.get = parseInt(item.get);
        item.pay = parseInt(item.pay);
        const existingIndex = items.findIndex(a => a.id == item.id);
        if (existingIndex >= 0) {
          items.splice(existingIndex, 1, item);
          resolve(item);
        }
        else {
          reject(null);
        }
      }, delay)
    })
  }
}

export default ItemApi;
