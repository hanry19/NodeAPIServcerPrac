import React from "react";
import axios from "axios";

const apiUrl = "https://localhost:8080";
const header = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
  },
};

export default {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
    return axios.get(url);
    // .then(({ headers, json }) => ({
    //   data: json,
    //   total: parseInt(headers.get("content-range").split("/").pop(), 10),
    // }));
  },

  getOne: (resource, params) => axios.get(`${apiUrl}/${resource}/${params.id}`),
  //   .then(({ json }) => ({
  //     data: json,
  //   })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
    return axios.get(url);
    // .then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { field, order } = params.sort;
    const query = {
      target: params.target,
      sort: JSON.stringify([field, order]),
      id: params.id,
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

    return axios.get(url);
    // .then(({ headers, json }) => ({
    //   data: json,
    //   total: parseInt(headers.get("content-range").split("/").pop(), 10),
    // }));
  },

  update: (resource, params) =>
    axios.put(`${apiUrl}/${resource}/${params.id}`, {
      body: {
        data: JSON.stringify(params.data),
        previousData: JSON.stringify(params.previousData),
      },
    }),
  //   .then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return axios.put(`${apiUrl}/${resource}?${JSON.stringify(query)}`, {
      body: JSON.stringify(params.data),
    });
    //   .then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    axios.post(`${apiUrl}/${resource}`, {
      body: JSON.stringify(params.data),
    }),
  //   .then(({ json }) => ({
  //     data: { ...params.data, id: json.id },
  //   })),

//   delete: (resource, params) =>
//     axios.delete(`${apiUrl}/${resource}/${params.id}?${JSON.stringify(previousData)}`),
  //   .then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return axios.delete(
      `${apiUrl}/${resource}?${JSON.stringify(query)}`,
    );
    //   .then(({ json }) => ({ data: json }));
  },
};