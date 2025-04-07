import { useAccount } from "wagmi";
import { getUserInfo, UserInfoResponse } from "../api/apiService";


class AuthManager {
  private static instance: AuthManager;
  private _address: string = '';
  private _userInfo: UserInfoResponse | null = null; 
  private _balance: string = '0';
  private _isConnected: boolean = false;
  private listeners: ((userInfo: UserInfoResponse | null) => void)[] = [];
  

  private constructor() {
    this.init();
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
    this.notifyListeners();
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

  auth(address: string, userInfo: UserInfoResponse | null, balance: string, isConnected: boolean) {
    this._address = address;
    this._userInfo = userInfo;
    this._balance = balance;
    this._isConnected = isConnected;
  }

  async init() {
    if (!this._address) {
      return;
    }
    const userInfo = await getUserInfo(this._address);
    if (userInfo) {
      this._userInfo = userInfo;
      this._balance = '';
      this._address = this._address;
    }
  }

  addListener(listener: (userInfo: UserInfoResponse | null) => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: (userInfo: UserInfoResponse | null) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this._userInfo));
  }
}
export const authManager = AuthManager.getInstance(); 