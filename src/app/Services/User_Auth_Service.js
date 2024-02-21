import axios from 'axios.js';

export const postLogin = (username, password) => {
  return axios
    .post(`/TMS/api/auth/signin`, {
      username: username,
      password: password,
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
        // console.log(`error status`, error.response.status);
        // console.log(`error header`, error.response.headers);
      }
    });
};

export const getAnUser = (inputId) => {
  return axios.get(`/TMS/api/user/${inputId}`, {});
};

export const getAllUser = () => {
  return axios.get(`/TMS/api/user`);
};

export const getAPageUser = (params) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: '/TMS/api/user',
    params: {
      page: params.page,
      limit: params.limit,
      active: params.active,
      search: params.search,
    },
  };
  return axios.request(config);
};

export const postCreateNewUser = (data) => {
  return axios
    .post(`/TMS/api/auth/signup`, {
      name: data.name,
      username: data.username,
      password: data.password,
      company: data.company,
      email: data.email,
      contact: data.contact,
      rulename: data.rulename,
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
      }
    });
};

export const putEditUserData = (data) => {
  return axios.put(`/TMS/api/user/admin/${data.id}`, {
    company: data.company,
    email: data.email,
    contact: data.contact,
    rulename: data.rulename,
  });
};

export const putEditOwnData = (data) => {
  return axios.put(`/TMS/api/user/${data.id}`, {
    company: data.company,
    email: data.email,
    contact: data.contact,
  });
};

export const deleteUser = (userID) => {
  // console.log(`ID: `, userID);
  return axios.delete(`/TMS/api/user/remove/${userID}`, {});
  // return;
};

export const putChangeUserPassword = (userID, newPassword) => {
  return axios({
    method: 'put',
    url: `/TMS/api/user/admin/password/${userID}`,
    params: {
      passwordnew: newPassword,
    },
  });
};

export const putChangeAccountPassword = (userID, oldPassword, newPassword) => {
  return axios({
    method: 'put',
    url: `/TMS/api/user/password/${userID}`,
    params: {
      passwordold: oldPassword,
      passwordnew: newPassword,
    },
  });
};

export const getUserListDevice = (id) => {
  let config = {
    method: 'get',
    url: `/TMS/api/user/${id}/listDevice`,
  };
  return axios.request(config);
};

export const getSearchResult = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/barSearch/device`,
    params: {
      search: data,
    },
  });
};
