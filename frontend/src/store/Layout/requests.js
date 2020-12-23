import axios from 'axios';

const getMenuRequest = () =>
  axios.post(
    `${process.env.API_ENDPOINT}/dashboard/menu`,
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );

export { getMenuRequest as default };
