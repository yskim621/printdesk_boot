import axios from 'axios';

const checkIdRequest = (id) =>
  axios.get(`${process.env.API_ENDPOINT}/register/exist/userName/${id}`);

const registerRequest = (id, email, password) =>
  axios
    .post(
      `${process.env.API_ENDPOINT}/register/register_submit`,
      {
        userName: id.replace(/ /g, ''),
        email,
        password,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
    .catch((error) => {
      throw error[1];
    });

export { checkIdRequest, registerRequest };
