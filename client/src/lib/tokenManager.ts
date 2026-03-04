// export const tokenManager = {
//   accessToken: null as string | null,

//   setAccessToken(token: string) {
//     console.log("Setting access token:", token);
//     this.accessToken = token;
//   },

//   getAccessToken() {
//     return this.accessToken;
//   },
//   clearTokens() {
//     this.accessToken = null;
//   },
// };
export const tokenManager = {
  setAccessToken(token: string) {
    console.log("Setting access token:", token);
    localStorage.setItem("accessToken", token);
  },

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },

  clearTokens() {
    localStorage.removeItem("accessToken");
  },
};
