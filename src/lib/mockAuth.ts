export type Credentials = { email: string; password: string };

const VALID_USER = {
  id: 'u_1',
  name: 'Mariana Manzo Villacaña',
  email: 'mariana.manzo@empresa.com',
};

export async function login({ email, password }: Credentials) {
  await new Promise(r => setTimeout(r, 600));
  const ok = email === 'mariana.manzo@empresa.com' && password === 'Password123!';
  if (!ok) {
    throw new Error('Correo o contraseña incorrectos');
  }
  return {
    token: 'mock-token-abc123',
    user: VALID_USER,
  };
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function getUser() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

export function setAuthData(token: string, user: typeof VALID_USER) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
