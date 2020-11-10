const CURD = {
  data() {
    return {
      tableData: [],
      loading: false,
      current_page: 1,
      total: 0,
      pageSize: 10
    }
  },
  methods: {
    // 封装查询展示列表
    fetchData(
      searchObj = this.searchForm,
      page = this.current_page,
      pageSize = this.pageSize
    ) {
      this.loading = true
      this.curd.getList(searchObj, page, pageSize)
        .then(response => {
          // 成功执行内容
          if (typeof this.listHandle === 'function') { // 是函数    其中 FunName 为函数名称
            this.listHandle(response)
          } else { // 不是函数
            const result = response.data
            this.tableData = result
          }
          this.total = response.meta.total
          this.loading = false
        })
        .catch(err => {
          // this.tools.error(this, err.response.data);
          this.loading = false
        })
    },
    // 分页相关
    pagination(val) {
      this.current_page = val
      this.fetchData()
    },
    sizeChange(val) {
      this.pageSize = val
      this.fetchData()
    }
  }
}
export default CURD
