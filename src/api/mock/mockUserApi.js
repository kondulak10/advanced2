import delay from '../delay';

const items = [
  {
    id: 1,
    email: "1",
    password: "p"
  },
  {
    id: 2,
    email: "2",
    password: "p"
  }
  ,
  {
    id: 3,
    email: "3",
    password: "p"
  }
]

class UserApi {

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
        if (!item.email || !item.password || item.email.length == 0 || item.password.length == 0) {
          reject("Fill email and password");
        }
        for (let u of items) {
          if (u.email === item.email) {
            reject("Email already exists");
          }
        }
        item.id = Math.max.apply(Math, items.map(function (o) { return o.id; })) + 1;
        items.push(item);
        resolve(item);
      }, delay)
    });
  }

  //get user
  static loginUser(item) {
    return new Promise((resolve, reject) =>{
      setTimeout(()=>{
        for (let user of items) {
          if (user.email === item.email && user.password === item.password) {
            resolve(user);
          }
        }
        reject("User not found");
      }, delay)
    })
  }
}

export default UserApi;
