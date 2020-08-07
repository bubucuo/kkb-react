const channelTableData = [];
for (let i = 0; i < 10; i++) {
  channelTableData.push({
    id: i,
    name: '名字' + i,
    age: i,
    city: '城市' + i,
  });
}

const total = 101;
function searchChannelData({ name = '', ...pagination }) {
  console.log('😁', name, pagination); //sy-log
  const res = [];
  let i = 0;
  while (i < pagination.pageSize) {
    const realIndex = i + (pagination.current - 1) * pagination.pageSize;
    if (realIndex >= total) {
      break;
    }
    const tem = {
      id: realIndex,
      name: '名字' + realIndex,
      age: i,
      city: '城市' + realIndex,
    };
    if (tem.name.indexOf(name) > -1) {
      res.push(tem);
    }
    i++;
  }

  return { data: res, ...pagination, total };
}
export default {
  // 支持值为 Object 和 Array
  // 'GET /api/getChannelData': {
  //   //查询表单数据
  //   data: [...channelTableData],
  // },
  'POST /api/getChannelData': (req, res) => {
    //搜索
    res.send({
      status: 'ok',
      ...searchChannelData(req.body),
    });
  },
};
