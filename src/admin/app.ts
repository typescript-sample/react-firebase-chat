import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { options, storage } from 'uione';
import { MasterDataClient } from './service/client/MasterDataClient';
import { RoleClient } from './service/client/RoleClient';
import { UserClient } from './service/client/UserClient';
import { MasterDataService } from './service/MasterDataService';

const httpRequest = new HttpRequest(axios, options);
export interface Config {
  user_url: string;
  role_url: string;
  audit_log_url: string;
}
class ApplicationContext {
  private masterDataService: MasterDataService;
  private roleService: RoleClient;
  private userService: UserClient;
  getConfig(): Config {
    return storage.config();
  }
  getMasterDataService(): MasterDataService {
    if (!this.masterDataService) {
      this.masterDataService = new MasterDataClient();
    }
    return this.masterDataService;
  }
  getRoleService(): RoleClient {
    if (!this.roleService) {
      const c = this.getConfig();
      this.roleService = new RoleClient(httpRequest, c.role_url);
    }
    return this.roleService;
  }
  getUserService(): UserClient {
    if (!this.userService) {
      const c = this.getConfig();
      this.userService = new UserClient(httpRequest, c.user_url);
      console.log(c.user_url);
    }
    return this.userService;
  }
}

export const context = new ApplicationContext();
