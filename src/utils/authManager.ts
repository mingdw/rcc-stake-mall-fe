import { useAccount } from "wagmi";
import { getUserInfo, UserInfoResponse } from "../api/apiService";

export const defaultAddress = '0x67003e9d9B26Ed30B8AfeA6da762279D7c83abC2';

class AuthManager {
  private static instance: AuthManager;
  private _address: string = '';
  private _userInfo: UserInfoResponse | null = null; 
  private _balance: string = '0';
  private _isConnected: boolean = false;
  

  private constructor() {
    
  }
  

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  get address(): string {
    return this._address;
  }

  setAddress(address: string) {
    this._address = address;
  }

  setIsConnected(isConnected: boolean) {
    this._isConnected = isConnected;
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  get userInfo(): UserInfoResponse | null {
    return this._userInfo;
  }
  async setUserInfoByAddress(address: string) {
    const userInfo = await getUserInfo(address);
    if (userInfo) {
      this._userInfo = userInfo;
    }
  }

  setUserInfo(userInfo: UserInfoResponse | null) {
    this._userInfo = userInfo;
  }

  get balance(): string {
    return this._balance;
  }

  setBalance(balance: string) {
    this._balance = balance;
  }

  clear() {
    this._address = '';
    this._userInfo = null;
    this._balance = '0';
    this._isConnected = false;
  }

  async init() {
    const userInfo = await getUserInfo(defaultAddress);
    if (userInfo) {
      this._userInfo = userInfo;
      this._balance = '123';
      this._address = defaultAddress;
    }
  }


}
export const authManager = AuthManager.getInstance(); 