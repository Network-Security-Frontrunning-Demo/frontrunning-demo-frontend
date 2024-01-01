export interface DecodePasswordData {
  password: string;
}

export interface DecodePasswordResponse {
  data: DecodePasswordData | undefined;
  status: boolean;
}
