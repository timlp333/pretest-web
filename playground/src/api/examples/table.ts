import { requestDataClient } from '#/api/request';

export namespace DemoTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
  export interface CreateCustomers {
    email: string;
    name: string;
  }
  export interface EditCustomers {
    email: string;
    id: number;
    name: string;
  }
  export interface GetCustomersTrans {
    email: string;
    endDate: Date;
    name: string;
    page: number;
    pageSize: number;
    startDate: Date;
  }
  export interface deleteCustomers {
    id: number;
  }
  export interface searchCustomersTrans {
    id: number;
  }
}

/**
 * 获取示例表格数据
 */
async function getExampleTableApi(params: DemoTableApi.PageFetchParams) {
  return requestDataClient.get('/customers', { params });
  // return requestClient.get('/table/list', { params });
}
async function saveExampleTableApi(params: DemoTableApi.EditCustomers) {
  return requestDataClient.put(`/customers/${params.id}`, { ...params });
  // return requestClient.get('/table/list', { params });
}
async function createCustomerApi(params: DemoTableApi.EditCustomers) {
  return requestDataClient.post(`/customers`, { ...params });
  // return requestClient.get('/table/list', { params });
}
async function deleteExampleTableApi(params: DemoTableApi.deleteCustomers) {
  return requestDataClient.delete(`/customers/${params.id}`);
}
async function getCustomerTransApi(params: DemoTableApi.GetCustomersTrans) {
  return requestDataClient.get('/transactions', { params });
  // return requestClient.get('/table/list', { params });
}
async function getTransPastYearApi(params: DemoTableApi.searchCustomersTrans) {
  return requestDataClient.get(`/customers/${params.id}/transactions/pastyear`);
  // return requestClient.get('/table/list', { params });
}
export {
  createCustomerApi,
  deleteExampleTableApi,
  getCustomerTransApi,
  getExampleTableApi,
  getTransPastYearApi,
  saveExampleTableApi,
};
