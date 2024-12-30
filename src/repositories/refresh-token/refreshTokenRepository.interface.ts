import { Repository } from "../genericRepository";
import {
  NewRefreshToken,
  RefreshToken,
  RefreshTokenUpdate,
} from "../../types/schema";

export interface IRefreshTokenRepository
  extends Repository<RefreshToken, NewRefreshToken, RefreshTokenUpdate> {
   
  }
