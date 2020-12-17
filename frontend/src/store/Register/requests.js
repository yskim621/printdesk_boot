import axios from 'axios';

const checkIdRequest = (id) =>
  axios.get(`${process.env.API_ENDPOINT}/register/exist/userName/${id}`);

const registerRequest = (form) =>
  axios
    .post(
      `${process.env.API_ENDPOINT}/register/register_submit`,
      {
        userName: form.id.replace(/ /g, ''),
        email: form.email,
        password: form.password,
        companyName: form.companyName,
        companyNumber: form.companyName,
        representativeName: form.representativeName,
        businessCondition: form.businessCondition,
        sectors: form.sectors,
        address: form.address,
        taxBill: form.taxBill,
        manager: form.manager,
        tel: form.tel,
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
