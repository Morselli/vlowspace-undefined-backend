interface EmployeeDto {
  userId?: string;
  fullName?: string;
  email?: string;
  emailCorp?: string;
  admissionDate?: Date;
  daysOff: number;
}

export { EmployeeDto };