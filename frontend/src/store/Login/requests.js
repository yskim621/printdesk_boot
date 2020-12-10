import axios from 'axios';
import { i18n } from '../../i18n';

const loginRequest = (form) =>
  axios
    .post(
      `${process.env.API_ENDPOINT}/auth/login`,
      {
        userName: form.id.replace(/ /g, ''),
        password: form.password,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((error) => {
      let message;
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 400:
            message = i18n.t('login-error-invalid-id-pw');
            break;
          default:
            // eslint-disable-next-line prefer-destructuring
            message = error[1];
            break;
        }
      }
      throw message;
    });

export { loginRequest as default };
