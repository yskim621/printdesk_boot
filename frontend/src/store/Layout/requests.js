import axios from 'axios';

const getMenuRequest = (token) =>
  axios.post(
    `${process.env.API_ENDPOINT}/dashboard/menu`,
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

export { getMenuRequest as default };
