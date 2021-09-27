<template>
  <div id="codeScan">
    <div style="margin: 40px 0 5px 0">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="drawer = true"
        size="mini"
        >新建需求</el-button
      >
      <el-input
        placeholder="请输入搜索关键词"
        class="input-with-select"
        style="float: right; width: 50%"
        size="mini"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          type="primary"
        ></el-button>
      </el-input>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      border
      size="mini"
      @cell-click="handleRow"
      :cell-class-name="getCellIndex"
      :cell-style="setCellStyle"
    >
      <el-table-column prop="id" label="操作" width="50" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete handleData" @click="onSubmit"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="modular"
        label="模块"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="assembly"
        label="组件名称"
        align="center"
        width=""
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="codeUrl"
        label="代码仓地址"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="branch"
        label="分支"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="language"
        label="语言"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span style="color: green">{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="virusCunt"
        label="漏洞数量"
        width="100"
        align="center"
        sortable
      >
        <template slot-scope="scope">
          <span style="color: orange">{{ scope.row.virusCunt }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="tabListPage" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="45%"
    >
      <!-- :before-close="handleClose" -->
      <div id="needDrawer" style="">
        <div style="margin: 20px"></div>
        <el-input :v-model="clean"></el-input>
        <el-input :v-model="build"></el-input>
        <el-input :v-model="scan"></el-input>
        <el-input :v-model="report"></el-input>
      </div>
    </el-drawer>
    <!-- 漏洞详情抽屉 -->
    <el-drawer
      :visible.sync="drawerBugDetail"
      direction="ttb"
      :before-close="handleClose"
    >
      <div style="margin: 10px 5px">
        <span>我来啦!</span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      // 漏洞详情抽屉
      drawerBugDetail: false,
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30, 40],
      // 默认每页显示的条数（可修改）
      PageSize: 1,
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        slected: '',
        resource: ""
      },
      fortifyJson: {
        clean: '',
        build: '',
        scan: '',
        report: ''
      }
    }
  },
  methods: {
    // 将页码，及每页显示的条数以参数传递提交给后台
    getData (n1, n2) {
      // 这里使用axios，使用时请提前引入
      this.http.getCodeScanList().then(res => {
        console.log(res.data.data.tableData.length)
        this.tableData = res.data.data.tableData
        this.totalCount = res.data.data.totalCount
        this.currentPage = res.data.data.currentPage
        // console.log(this._data)
      }).catch(console.log)
    },
    // 分页
    // 每页显示的条数
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 点击每页显示的条数时，显示第一页
      this.getData(val, 1)
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val
      // 切换页码时，要获取每页显示的条数
      this.getData(this.PageSize, (val) * (this.pageSize))
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    onSubmit () {
      this.$message({
        message: '恭喜发财',
        type: 'success'
      })
    },
    handleRow (row, column, cell, event) {
      //   console.log(row, column.index, cell, event)
      console.log(column)
      if (column.index === 2) {
        this.drawer = true
      }
      if (column.index === 8) {
        this.drawerBugDetail = true
      }
    },
    getCellIndex: function ({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
      column.index = columnIndex
    },
    setCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === this.rowIndex && columnIndex === this.columnIndex) {
        return { "background-color": "#009221" }
      }
      if (columnIndex === 2) {
        return { "color": "blue", "cursor": "pointer" }
      }
    }
  },
  created: function () {
    this.getData(this.PageSize, this.currentPage)
  },
  mounted: function () {
    // this.getData(this.PageSize, this.currentPage)
  }

}
</script>

<style scoped>

.handleData {
  cursor: pointer;
  transition: all 0.1s;
  color: rgb(102, 177, 255);
}
.handleData:hover {
  transform: scale(1.2);
}
/* 解决抽屉点击后会有边框的bug */
#codeScan >>> .el-tabs__item:focus.is-active.is-focus {
  box-shadow: none;
}
/* 解决抽屉点击title后会有边框的bug */
#codeScan >>> :focus {
  outline: 0;
}
</style>
