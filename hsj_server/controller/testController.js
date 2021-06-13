import * as testData from "../data/testData.js";

// get 전체 리스트
export async function getList(req, res) {
  res.status(200).json(await testData.getList(req));
}

//get 1개 ㅇㅋㅇㅋ
export async function getOne(req, res) {
  const id = req.params.id;

  const data = await testData.getOne(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `no have [ ${id} ]` });
  }
}

// get여러개 ㅇㅋㅋ
export async function getMany(req, res) {
  console.log("get Many");
  const ids = req.query.id;
  console.log(ids);

  const data = await testData.getOne(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `no have [ ${ids} ]` });
  }
}

export async function getManyReference(req, res) {
  // author_id가 없어서 임시로 id로 사용 추후 변경 가능
  const id = req.params.id;

  const data = await testData.getOne(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `no have [ ${id} ]` });
  }
}

// 새로 만들기 ㅇㅋㅇㅋ
export async function create(req, res) {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const street = req.body.street;
  const phone = req.body.phone;
  const website = req.body.website;
  const company_name = req.body.company_name;

  const newCreate = await testData.create(
    name,
    username,
    email,
    street,
    phone,
    website,
    company_name
  );

  res.status(201).json(newCreate);
}

// update ㅇㅋㅇㅋ
export async function update(req, res) {
  const id = req.params.id;
  console.log(Number(id));
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  const data = await testData.getOne(id);
  console.log(data.id);

  if (!data) {
    return res.status(404).json({ message: `data not found: ${id}` });
  }
  if (data.id !== Number(id)) {
    return res.status(403).json({ message: `시발: ${id}` });
  }
  const updated = await testData.update(name, email, phone, id);
  res.status(200).json(updated);
}

export async function updateMany(req, res) {
  res.status(200).json({ message: "updateMany" });
}

// 삭제
export async function remove(req, res) {
  const id = req.params.id;
  const data = await testData.getOne(id);
  const prevData = data.name;

  if (!data) {
    return res.status(404).json({ message: `data not found: ${id}` });
  }
  if (data.id !== Number(id)) {
    return res.sendStatus(403);
  }
  const remove = await testData.remove(id, prevData);
  res.status(204).json(remove);
}

export async function removeMany(req, res) {
  res.status(200).json({ message: "removeMany" });
}
