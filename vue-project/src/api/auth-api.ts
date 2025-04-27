export class AuthApi {
  static async login(email: string, password: string): Promise<Response> {
    const response = await fetch("http://localhost/api/auth/login", {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(email + ":" + password)}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
  }
}