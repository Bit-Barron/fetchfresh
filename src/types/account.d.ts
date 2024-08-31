// types/accountTypes.ts

export type User = {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  phoneNumber?: string;
};

export type AccountInfoFormData = {
  username: string;
  email: string;
  password: string;
};

export type PersonalInfoFormData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
};

export type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type AccountInfoFormProps = {
  user: User | undefined;
  onUpdate: (data: AccountInfoFormData) => void;
};

export type PersonalInfoFormProps = {
  user: User | undefined;
  onUpdate: (data: PersonalInfoFormData) => void;
};

export type OrderSummaryProps = {
  orderCount: number;
};

export type AddressSummaryProps = {
  address?: string;
  zipCode?: string;
};
