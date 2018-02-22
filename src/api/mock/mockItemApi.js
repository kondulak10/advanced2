import delay from '../delay';

export const items = [
  {
    id: 1,
    name: "Item 1",
    price: 20,
    brand: "Brand A"
  },
  {
    id: 2,
    name: "Item 2",
    price: 4000,
    brand: "Brand A"
  },
  {
    id: 3,
    name: "Item 3",
    price: 234,
    brand: "Brand B"
  },
  {
    id: 4,
    name: "Item 4",
    price: 566,
    brand: "Brand A"
  },
  {
    id: 5,
    name: "Item 5",
    price: 52300,
    brand: "Brand B"
  },
  {
    id: 6,
    name: "Item 6",
    price: 2,
    brand: "Brand C"
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

}

export default ItemApi;
