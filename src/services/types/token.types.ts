export type Payload = {
  id: string;
  role?: "operator" | "admin";
};

export interface NewTokenParams {
  expiresIn?: string;
  data: Payload;
  private_key?: string;
}

export type ValidationTokenParams = {
  token: string;
  private_key: string;
};

export interface AccessTokenParams extends NewTokenParams {
  expiresIn?: "1h";

}
