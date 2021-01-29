import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
}

export const requestProducts = async () => {
  const { data } = await axios({
    url: '/api/products',
    method: 'GET'
  })
  return data
}

export const requestProduct = async (id) => {
  const { data } = await axios({
    url: `/api/products/${id}`,
    method: 'GET'
  })
  return data
}

export const requestUserLogin = async ({ email, password }) => {
  try {
    const { data } = await axios({
      url: '/api/users/login',
      method: 'POST',
      data: { email, password },
      headers
    })
    return data
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message
    throw new Error(message)
  }
}

export const requestUserRegister = async ({ name, email, password }) => {
  try {
    const { data } = await axios({
      url: '/api/users',
      method: 'POST',
      data: { name, email, password },
      headers
    })
    return data
  } catch (e) {
    const message =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message
    throw new Error(message)
  }
}

export const requestUserUpdate = async ({ name, email, password }, token) => {
  const { data } = await axios({
    url: '/api/users/profile',
    method: 'PUT',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    data: { name, email, password }
  })
  return data
}

export const requestPasswordVerificaton = async (password, token) => {
  const { data } = await axios({
    url: '/api/users/verify',
    method: 'POST',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    data: password
  })
  return data
}