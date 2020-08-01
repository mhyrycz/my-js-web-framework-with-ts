import { User } from './models/User';

const user = new User({ id: 1, name: 'maciek', age: 28 });

user.save();

async function updateUser() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 2000)
  });

  let result = await promise;

  console.log(result)
}

updateUser();


