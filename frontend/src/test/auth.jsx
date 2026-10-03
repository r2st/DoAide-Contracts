import { AuthContext } from "../hooks/useAuth";

export function StubAuth({ role = "owner", user: overrides, children }) {
  const user = {
    id: "test-user-1",
    email: "test@example.com",
    name: "Test User",
    plan: "pro",
    ...overrides,
  };
  const value = {
    user,
    loading: false,
    login: () => {},
    register: () => {},
    logout: () => {},
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
