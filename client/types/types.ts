type Credentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmpassword: string;
  dateofbirth: Date;
  mobilenumber: number;
};
type CustomInputProps = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  validation: any;
  name: string;
};
interface AuthData {
  isAdmin: boolean;
  id: string;
}

type Users = {
  fname: string;
  lname: string;
  email: string;
  dateofbirth: Date;
  mobilenumber: number;
};

type Shippments = {
  shipment_id: number;
  waybill: string;
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  owner_id: number;
  status: string;
  shipment_image: string;
};
