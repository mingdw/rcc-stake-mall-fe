class AuthManager {
  private static instance: AuthManager;
  private _address: string = '0x67003e9d9B26Ed30B8AfeA6da762279D7c83abC2';

  private constructor() {}

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
}

export const authManager = AuthManager.getInstance(); 