import axios from 'axios.js';
export const getAPageApp = (data) => {
  console.log(data);
  return axios({
    method: 'get',
    url: `/TMS/api/application`,
    params: {
      page: data.page,
      limit: data.limit,
      packagename: data.packagename,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};
export const getAAppInfo = (id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/application/${id}`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};
export const getAPageAppDevice = (data, appID) => {
  return axios({
    method: 'get',
    url: `/TMS/api/application/${appID}/device`,
    params: {
      page: data.page,
      limit: data.limit,
      search: data.search,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getAPageAppDeviceNow = (data, appID) => {
  return axios({
    method: 'get',
    url: `/TMS/api/application/${appID}/device/now`,
    params: {
      page: data.page,
      limit: data.limit,
      search: data.search,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response;
    }
  });
};
