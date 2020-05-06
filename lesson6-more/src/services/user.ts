import request from '@/utils/request';

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}
