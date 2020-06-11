import request from '@/utils/request';

export async function getChannelData(params?: any) {
  return request('/api/getChannelData', {
    data: params,
    method: 'post',
  });
}
