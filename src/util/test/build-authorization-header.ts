import { sign } from 'jsonwebtoken'

const key = Buffer.from(`
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDF6psBhYVC/AZz9l+voK2opRjQ+Aefzua6KQ8AnEhw6LUp51BI
ze8fPrHSFBS6Eq3l7ie9264Zvc80h83hAeqh7ROjIhlLUXlR8rvO9mHj4yLc5HHf
/j19zal+bOmZo0OwXBxDyiVUGgZSvj0i7DsnJaNIv6RdWrfXva3oA8aFhwIDAQAB
AoGBAKdQynHi2uHiBeKK6iGjiKwFxpEC3g8v7sZ6Z4Bwnp01XdJrBuhFkF2tts6O
w2b626CCUX6j9O82E7GpDVenMx7plaOS0mlZSg3q7zEE5pn6GoNQYylnPoUSE3d9
Wfrb190u386WRbV4MPXVUYwNhqV4L27jwxx294YGWGgzdTqBAkEA/3qZL2eyOTe7
ULkBmp60wEw4urxig0GMCzIY7jiDP+WCHacEk2oONDlyEU6kPrOjM6pvX2u7pcqo
Jg+IsPXC1wJBAMZR8zsiumbFtFRcdert1Ahxev06kuPyOJ5UreMB7bfpkf/afKPG
xTIfGLjfxsg0m6BnrIqOIVrvh1HWFchWrNECQCVXWwqFwpQAZF2RHP3nko3E1knc
/R0oOHrucJxpIC33ssP4xH9zce4KM3T6JKGRihokIDE3Qu8hpuAhRx5uXXMCQHDG
oV57fSx8OPPQMG4MGItEnP/rkyR01aWT2d5BdoEjHZc1E7O+kNzTuidHea7X27f3
vLJ96JHhrD3pVDG8uEECQQDIw3gABhagWtaF9FebbpzyVMrtMhXdGNKoOXq4Aqm2
7Lp4DcZVr4VzjKr4Cmklx+yx+ClOqhxnPw36KK0oeML3
-----END RSA PRIVATE KEY-----
`)

export const buildAuthorizationHeader = (payload: any): string => {
  const token = sign(payload, key, { algorithm: 'RS256' })
  return `Bearer ${token}`
}
