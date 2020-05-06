import request from '@/utils/request';

export async function getChannelData(params?: any) {
  console.log('params', params); //sy-log
  return request('/api/getChannelData', {
    data: params,
    method: 'post',
  });
}

export async function queryRule(params?: any) {
  return request('/api/rule', {
    params,
  });
}
