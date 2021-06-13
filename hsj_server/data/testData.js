import mysql from "mysql2";

export const pool = mysql.createPool({
  host: "localhost",
  user: "newlearn",
  password: "newlearn",
  database: "newlearn",
});

const db = pool.promise();

export async function getList(req) {
  const ids = JSON.parse(req.query.filter).id;

  if (!ids) {
    const order = JSON.parse(req.query.sort)[1];
    const page = JSON.parse(req.query.range)[0];
    const perPage = JSON.parse(req.query.range)[1];

    return db
      .execute(
        `select * from userList order by id ${order} limit  ${page} , ${perPage} `
      )
      .then((result) => result[0]);
  } else {
    const promise = ids.map((id) => {
      return db
        .execute(`select * from userList where id = ?`, [id])
        .then((res) => res[0][0]);
    });
    return Promise.all(promise).then((results) => results);
  }
}

/* export async function getList() {

    return db.execute(`select * from userList ${order_desc} limit ${this.page}, ${perPage} `)
    .then((result)=> result[0]);
} */

export async function getOne(id) {
  return db
    .execute("select * from userList where id = ?", [id])
    .then((result) => result[0][0]);
}

export async function create(
  name,
  username,
  email,
  street,
  phone,
  website,
  company_name
) {
  console.log(name, email);
  return db
    .execute(
      `insert into userlist (name, username, email, street, phone, website, company_name)  values (?,?,?,?,?,?,?)`,
      [name, username, email, street, phone, website, company_name]
    )
    .then((result) => getOne(result[0].insertId));
}

export async function getManyReference(id) {
  // author_id 없어서 임시로 id 사용 , 추후 변경 가능

  return db
    .execute("select * from userList where id = ?", [id])
    .then((result) => result[0][0]);
}

export async function update(name, email, phone, id) {
  return db
    .execute(
      //   "UPDATE userList SET name= ? , email = ? , phone = ? , WHERE id= ?",
      `UPDATE userList SET name= ?, email = ? , phone = ? WHERE id= ?`,
      [name, email, phone, id]
    )
    .then(() => getOne(id));
}
 let temp = [];
export async function remove(id, prevData) {
  return db
    .execute("DELETE FROM userList WHERE id= ?", [id])
    .then(() => [{id,prevData}].JSON);
}

/* 
    const promise = ids.map((id) => {
      return db
        .execute(`select * from userList where id = ?`, [id])
        .then((res) => res[0][0]);
    });
    return Promise.all(promise).then((results) => results);
  }
   */
