import axios from 'axios.js';

export const getAPageAPK = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/apk`,
    params: {
      page: data.page,
      limit: data.limit,
      packagename: data.packagename,
      version: data.version,
    },
  }).catch(function (error) {
    if (error.response) {
      return error.response.data.message;
    }
  });
};

export const deleteAPKfile = (id) => {
  const data = JSON.stringify(id);
  return axios
    .delete('/TMS/api/apk', { data: data, headers: { 'Content-Type': 'application/json' } })
    .catch(function (error) {
      if (error.response) {
        // console.log(`error status`, error.response);
        return error.response.data.message;
      }
    });
};

export const postNewAPKData = (data) => {
  return axios({
    method: 'post',
    url: `/TMS/api/apk/`,
    data: data,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const postNewAPKFile = async (file, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/TMS/api/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const putEditAPKData = (data, id) => {
  return axios({
    method: 'put',
    url: `/TMS/api/apk/${id}`,
    data: data,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getAPKFromServer = (url, fileName) => {
  return axios({
    url,
    method: 'GET',
    responseType: 'blob',
  })
    .then((response) => {
      const href = window.URL.createObjectURL(response.data);

      const anchorElement = document.createElement('a');

      anchorElement.href = href;
      anchorElement.download = fileName;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
      return response;
    })
    .catch((error) => {
      // console.log('error: ', error);
    });
};

export const getPolicy = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/policy`,
    params: {
      page: data.page,
      limit: data.limit,
      policyname: data.policyname,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getAPolicy = (id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/policy/${id}`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const putEditPolicy = (data) => {
  return axios
    .put(`/TMS/api/policy/${data.id}`, {
      policyname: data.policyname,
      action: data.action,
      commandName: data.commandName,
    })
    .catch(function (error) {
      if (error.response) {
        // console.log(`error status`, error.response);
        return error.response.data.message;
      }
    });
};

export const postCreateNewPolicy = (data) => {
  return axios
    .post(`/TMS/api/policy`, {
      policyname: data.policyname,
      action: data.action,
      commandName: data.commandName,
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
      }
    });
};

export const getPolicyAPK = (data) => {
  return axios({
    method: 'get',
    params: {
      page: data.page,
      limit: data.limit,
      policyname: data.policyname,
    },
    url: `/TMS/api/policy/${data.id}/apk`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getPolicyDevice = (data) => {
  return axios({
    method: 'get',
    params: {
      page: data.page,
      limit: data.limit,
      search: data.search,
    },
    url: `/TMS/api/policy/${data.id}/device`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response;
    }
  });
};

export const getPolicyDeviceLocation = (data) => {
  return axios({
    method: 'get',
    params: {
      page: data.page,
      limit: data.limit,
      location: data.location,
      description: data.description,
    },
    url: `/TMS/api/policy/${data.id}/device`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response;
    }
  });
};

export const putPolicyStatus = (policyId, status) => {
  return axios({
    method: 'put',
    url: `/TMS/api/policy/${policyId}/status/${status}`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const postMapPolicyApk = (policyId, ApkId) => {
  const data = JSON.stringify(ApkId);
  return axios
    .post(`/TMS/api/policy/${policyId}/apk`, data, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
      }
    });
};

export const deleteMapPolicyApk = (policyId, ApkId) => {
  return axios.delete(`/TMS/api/policy/${policyId}/apk/${ApkId}`).catch(function (error) {
    if (error.response) {
      return error.response.data;
    }
  });
};

export const getAPageCommand = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/command`,
    params: {
      page: data.page,
      limit: data.limit,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const putEditCommand = (data) => {
  return axios
    .put(`/TMS/api/command/${data.id}`, {
      commandNotificationId: data.commandNotificationId,
      name: data.name,
      command: data.command,
    })
    .catch(function (error) {
      if (error.response) {
        // console.log(`error status`, error.response);
        return error.response.data.message;
      }
    });
};

export const postCreateNewCommand = (data) => {
  return axios
    .post(`/TMS/api/command`, {
      command: data.command,
      name: data.name,
      commandNotificationId: data.commandNotificationId,
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
      }
    });
};

export const getCommandNotiID = (id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/commandNotification/${id}`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getNotiID = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/commandNotification`,
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

export const getNotiIDForCommand = (search) => {
  return axios({
    method: 'get',
    url: `/TMS/api/commandNotification`,
    params: {
      page: 1,
      limit: 10,
      search: search,
    },
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const getSingleNotiID = (id) => {
  return axios({
    method: 'get',
    url: `/TMS/api/commandNotification/${id}`,
  }).catch(function (error) {
    if (error.response) {
      // console.log(`error status`, error.response);
      return error.response.data.message;
    }
  });
};

export const putEditNotiID = (data) => {
  return axios
    .put(`/TMS/api/commandNotification/${data.id}`, {
      title: data.title,
      message: data.message,
    })
    .catch(function (error) {
      if (error.response) {
        // console.log(`error status`, error.response);
        return error.response.data.message;
      }
    });
};

export const postCreateNewNotiId = (data) => {
  return axios
    .post(`/TMS/api/commandNotification`, {
      title: data.title,
      message: data.message,
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
      }
    });
};

export const postMapPolicyDevices = (policyId, deviceId) => {
  const data = JSON.stringify(deviceId);
  return axios
    .post(`/TMS/api/policy/${policyId}/devicePolicyDetail`, data, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
      }
    });
};

export const getAPagePolicyDevices = (data, policyId) => {
  return axios({
    method: 'get',
    url: `/TMS/api/policy/${policyId}/devicePolicyDetail`,
    params: {
      page: data.page,
      limit: data.limit,
      status: data.status,
    },
  });
};

export const getAPagePolicyDevice = (data) => {
  return axios({
    method: 'get',
    url: `/TMS/api/policy/${data.id}/device`,
    params: {
      page: data.page,
      limit: data.limit,
      search: data.search,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      if (error.response && error.response.status === 404) {
        return { message: error.response.data.message, status: 404 };
      } else {
        // console.log(`error status`, error.response);
        return error.response;
      }
    });
};

export const deleteMapPolicyDevice = (policyId, deviceId) => {
  return axios
    .delete(`/TMS/api/device/${deviceId}/policy/${policyId}/devicePolicyDetail`)
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
      }
    });
};

export const postMapPolicyListDevices = (policyId, listDeviceId) => {
  return axios
    .post(`/TMS/api/policy/${policyId}/listDevice/${listDeviceId}/devicePolicyDetail`)
    .catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
};
