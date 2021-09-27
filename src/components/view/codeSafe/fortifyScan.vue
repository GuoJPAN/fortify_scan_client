<template>
  <div class="sysOnline">
    <div style="margin: 10px 0 5px 0">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="drawer = true"
        size="mini"
        >新建扫描</el-button
      >
      <el-input
        placeholder="请输入搜索关键词"
        v-model="search_keyword"
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
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      border
      size="mini"
      @cell-click="cellClick"
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
        prop="name"
        label="项目名称"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="git"
        label="git地址"
        align="left"
        max-width="800"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="扫描时间"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="total"
        label="漏洞数量"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100"
        align="center"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div id="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
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
        <div>
          <el-row :gutter="12">
            <el-col :span="24">
              <el-card shadow="never">
                <label for="" class="labelword"> 请输入gitlab地址： </label>
                <el-input
                  placeholder="请输入gitlab地址"
                  v-model="git_path"
                  clearable
                  class="inputword"
                >
                </el-input>
                <label for="" class="labelword"> 请输入gitlab用户名： </label>
                <el-input
                  placeholder="请输入gitlab用户名"
                  v-model="git_user"
                  clearable
                  class="inputword"
                >
                </el-input>
                <label for="" class="labelword"> 请输入gitlab密码 </label>
                ：
                <el-input
                  placeholder="请输入gitlab密码"
                  v-model="git_pwd"
                  clearable
                  class="inputword"
                >
                </el-input>
                <div id="startscan">
                  <el-button type="primary" @click="git_start_scan"
                    >开始扫描</el-button
                  >
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      // 搜索关键词
      search_keyword: '',
      // 总数据
      tableData: [],
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      labelPosition: 'left',
      "git_path": '',
      "git_user": '',
      "git_pwd": ''
    }
  },
  methods: {
    // 将页码，及每页显示的条数以参数传递提交给后台
    getData () {
      // 这里使用axios，使用时请提前引入
      this.http.getProjectDetail().then(res => {
        this.tableData = res.data.data
      }).catch()
    },
    // 新建fortify扫描
    git_start_scan () {
      let data = {
        "git_path": this.git_path,
        "git_user": this.git_user,
        "git_pwd": this.git_pwd,
        "type": "1"
      }
      this.http.gitStartScan(data).then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
      }).catch(
      )
    },
    // 分页
    // 分页 每页多少条
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
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
    cellClick (row, column, cell, event) {
      //   console.log(row, column.index, cell, event)
      if (column.index === 2) {
        // this.drawer = true
        var projectID = row.id
        this.$router.push({ path: "/projectDatail", query: { projectID: projectID } })
        console.log(row.id)
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
      if (row.status === "已完成" && columnIndex === 7) {
        return { "color": "blue", "font-weight": "800" }
      } else if (row.status === "进行中" && columnIndex === 7) {
        return { "color": "green", "font-weight": "800" }
      }
    }
  },
  created: function () {
    // this.getData(this.PageSize, this.currentPage)
  },
  mounted: function () {
    this.getData()
  },
  watch: {

  }

}
</script>

<style scoped>
.sysOnline {
  margin: 5px;
}
#needDrawer {
  padding: 8px;
}
.handleData {
  cursor: pointer;
  transition: all 0.1s;
  color: rgb(102, 177, 255);
}
.handleData:hover {
  transform: scale(1.2);
}
#kuangjia {
  padding: 5px;
}
.inputword {
  margin: 5px 0 5px 0;
}
.labelword {
  font-size: 15px;
  font-weight: 400;
}
#startscan {
  text-align: right;
  margin-top: 5px;
}
#fenye {
  float: right;
  margin-top: 10px;
}
</style>
