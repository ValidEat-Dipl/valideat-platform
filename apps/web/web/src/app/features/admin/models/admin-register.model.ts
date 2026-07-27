export interface AdminRegister {
  firstName: string;
  lastName: string;
  address: string;
  department: string;
  phoneNumber: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN';
}
