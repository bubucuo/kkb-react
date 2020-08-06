const productTableData = [];
for (let i = 0; i < 10; i++) {
  productTableData.push({
    id: i,
    name: '名字' + i,
    age: i,
    city: '城市' + i,
  });
}

let total = 101;
function searchProductData({ name = '', ...pagination }) {
  console.log('哈哈哈😁', name, pagination); //sy-log
  const res = [];

  let pageSize = pagination.pageSize || 10;
  let current = pagination.current || 1;

  for (let i = 0; i < pageSize; i++) {
    let realIndex = i + (current - 1) * pageSize;
    let tem = {
      id: realIndex,
      name: '名字' + realIndex,
      age: i,
      city: '城市' + realIndex,
    };
    if (tem.name.indexOf(name) > -1) {
      res.push(tem);
    }
  }
  return { data: res, ...pagination, total };
}
export default {
  'POST /api/getProductData': (req, res) => {
    //搜索
    console.log('hahha', req.body); //sy-log
    res.send({
      status: 'ok',
      ...searchProductData(req.body),
    });
  },
};
