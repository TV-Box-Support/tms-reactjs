import axios from 'axios.js';

export const getSummaryforStudio = () => {
  return axios({
    method: 'get',
    url: `/TMS/api/terminalStudio/device`,
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};

export const getStudioHistoryOnlineBarChart = () => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/bar/device`,
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};

export const getStudioOnlinePieChart = (type) => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/pie/device`,
    params: {
      type: type,
    },
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};

export const getStudioDeviceIn30DaysLineChart = () => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/area/device`,
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};

export const getDeviceIn7DaysBarChart = (id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/area/device/device/${id}`,
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};
export const getPolicyPieChart = (type) => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/pie/policy`,
    params: {
      type: type,
    },
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};
export const getSinglePolicyPieChart = (id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/pie/policy/${id}`,
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};

export const getApplicationBarChart = () => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/doubleBar/application`,
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};

export const getSingleApplicationPieChart = (id, type) => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/pie/application/${id}`,
    params: {
      type: type,
    },
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};

export const getSingleDeviceReportPieChart = (id, packagename, dayago) => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/area/device/${id}/application`,
    params: {
      packagename: packagename,
      dayago: dayago,
    },
  }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};
