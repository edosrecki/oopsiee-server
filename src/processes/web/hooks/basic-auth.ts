interface BasicAuthConfig {
  username: string
  password: string
}

export const basicAuth = (config: BasicAuthConfig) => ({
  validate: async (username: string, password: string) => {
    if (username !== config.username || password !== config.password) {
      return new Error('Invalid username or password.')
    }
  }
})
