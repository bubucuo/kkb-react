// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'xiaoming',
    img: 'https://tva1.sinaimg.cn/large/00831rSTly1gdnkzoz2rwj309a0fi44m.jpg',
    userid: '123',
    email: 'nonono@kkb.com',
    role: 'vip',
  },
};
