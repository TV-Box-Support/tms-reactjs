import axios from 'axios.js';

export const getDeviceActiveNow = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/device/now`,
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

export const getAPageDevice = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/device`,
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

export const getAPageDeviceLocation = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/device/location`,
    params: {
      page: data.page,
      limit: data.limit,
      location: data.location,
      description: data.description,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

// export const postANewDevice = (data) => {
//   return axios({
//     method: 'post',
//     url: `/TMS/api/device`,
//     params: {
//       sn: data.san,
//       mac: data.mac,
//       date: data.date,
//       description: data.description,
//     },
//   }).catch(function (error) {
//     if (error.response) {
//       // console.log(`error status`, error.response);
//       return error.response.data.message;
//     }
//   });
// };

export const putEditDescription = (data) => {
  return axios.put(`/TMS/api/device/${data.id}`, {
    description: data.description,
  });
};

export const getADeviceInfo = (id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/device/${id}`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

// export const getADevicePerformance = (data) => {
//   return axios({
//     method: 'get',
//     url: `/TMS/api/device/${data.id}/historyPerformance`,
//     params: {
//       day: data.day,
//       hour: data.hour,
//       minutes: data.minutes,
//     },
//   }).catch(function (error) {
//     if (error.response) {
//       console.log(`error status`, error.response);
//       return error.response.data.message;
//     }
//   });
// };

export const getADevicePerformance = (id, dayago) => {
  return axios({
    method: 'get',
    url: `/TMS/api/chart/area/device/${id}`,
    params: {
      dayago: dayago,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getAPageDeviceApp = (data, id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/device/${id}/application`,
    params: {
      page: data.page,
      limit: data.limit,
      name: data.name,
      isSystem: data.isSystem,
      isAlive: data.isAlive,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getAPageDevicePolicy = (data, id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/device/${id}/devicePolicyDetail`,
    params: {
      page: data.page,
      limit: data.limit,
      status: data.status,
      // search: data.search,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getAPageListDevices = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/listDevice`,
    params: {
      page: data.page,
      limit: data.limit,
      name: data.name,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const putAPageListDevices = (data) => {
  // console.log(data);
  return axios
    .put(`/TMS/api/listDevice/${data.id}`, {
      name: data.name,
      description: data.description,
    })
    .catch(function (error) {
      if (error.response) {
        // console.log(`error status`, error.response);
        return error.response.data.message;
      }
    });
};

export const postANewListDevices = (data) => {
  return axios
    .post(`/TMS/api/listDevice`, {
      name: data.name,
      location: data.location,
      description: data.description,
    })
    .catch(function (error) {
      if (error.response) {
        // console.log(`error status`, error.response);
        return error.response.data.message;
      }
    });
};

export const postDevicesToListDevices = (listDeviceID, deviceId) => {
  // console.log(data);
  const data = JSON.stringify(deviceId);
  return axios
    .post(`/TMS/api/listDevice/${listDeviceID}/device`, data, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(function (error) {
      if (error.response) {
        // console.log(`error status`, error.response);
        return error.response;
      }
    });
};

export const getDevicesInListDevices = (data) => {
  // console.log(data);
  return axios({
    method: 'get',
    url: `/TMS/api/listDevice/${data.id}/device`,
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

export const deleteDeviceinListDevice = (listDeviceId, deviceId) => {
  return axios
    .delete(`/TMS/api/listDevice/${listDeviceId}/device/${deviceId}`)
    .catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
};

export const getUsersInListDevices = (data) => {
  // console.log(data);
  return axios({
    method: 'get',
    url: `/TMS/api/listDevice/${data.id}/user`,
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

export const deleteUserinListDevice = (listDeviceId, userId) => {
  return axios.delete(`/TMS/api/user/${userId}/listDevice/${listDeviceId}`).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
};

export const postUsersToListDevices = (listDeviceID, userId) => {
  return axios.post(`/TMS/api/user/${userId}/listDevice/${listDeviceID}`).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response;
    }
  });
};
