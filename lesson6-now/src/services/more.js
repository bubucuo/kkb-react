import request from '@/utils/request';

export async function getChannelData(params) {
  return request('/api/getChannelData', {
    data: params,
    method: 'post',
  });
}
// export async function getChannelDataBySearch(params) {
//   return request('/api/getChannelDataBySearch', {
//     method: 'post',
//     data: params,
//   });
// }
