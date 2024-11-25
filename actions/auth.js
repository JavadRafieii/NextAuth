import login from "./login";
import signup from "./signup";

export default async function auth(mode, prevState, formData) {
    if (mode === 'login') {
      return login(prevState, formData);
    }
    return signup(prevState, formData);
  }