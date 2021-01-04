import axios from 'axios';

const getDepartmentListRequest = (token) => {
  axios.post(
    `${process.env.API_ENDPOINT}/basic/department/list`,
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    }
  );
};

export { getDepartmentListRequest };
