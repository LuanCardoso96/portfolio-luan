export type UserType = { id:string; name:string; email:string; role?: "admin"|"member"; };
export const User = {
  async me(): Promise<UserType|null> {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) as UserType : null;
  },
  async login(email:string, _password:string) {
    const user: UserType = { id:"local-1", name:"Luan", email, role: email.includes("admin") ? "admin" : "member" };
    localStorage.setItem("authUser", JSON.stringify(user));
    return user;
  },
  async logout(){ localStorage.removeItem("authUser"); }
}
