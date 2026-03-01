export const tokenManager = {
  accessToken: null as string | null,

  setAccessToken(token: string) {
    this.accessToken = token;
  },

  getAccessToken() {
    return this.accessToken;
  },
};
