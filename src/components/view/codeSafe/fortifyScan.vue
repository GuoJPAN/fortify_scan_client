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
        placeholder="请输入搜索关键词（暂时不支持搜索）"
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
          <i
            class="el-icon-delete handleData"
            @click="onSubmit(scope.row.id)"
          ></i>
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
        prop="gitbranch"
        label="git分支"
        align="center"
        width="200"
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
      :visible.sync="drawer"
      :with-header="false"
      size="45%"
      :wrapperClosable="false"
      :before-close="handleClose"
      :modal="false"
    >
      <div id="needDrawer" style="">
        <div style="margin: 20px"></div>
        <div style="margin: 20px 0; text_algin: 18">
          <el-button type="primary" @click="close_drawer" icon="el-icon-close"
            >关闭</el-button
          >
        </div>
        <div>
          <el-row :gutter="12">
            <el-col :span="24">
              <el-card shadow="never">
                <label for="" class="labelword"> 仓库类型： </label>
                <div class="inputword">
                  <el-select v-model="storeHouseType" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    >
                    </el-option>
                  </el-select>
                </div>
                <label for="" class="labelword"> 请输入gitlab地址： </label>
                <el-input
                  placeholder="请输入gitlab地址(格式必须为gitlab地址：http://gitlab.tenserpay.xyz/XXXX/XXXXXX.git)"
                  v-model="git_path"
                  clearable
                  class="inputword"
                >
                </el-input>
                <label for="" class="labelword"> 请输入gitlab分支： </label>
                <el-input
                  placeholder="请输入gitlab分支(如：master/release_v1.0.0)"
                  v-model="git_branch"
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>确定删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delete_confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      dialogVisible: false,
      // 搜索关键词
      search_keyword: '',
      // 总数据
      tableData: [],
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      //   删除项目信息的projectID
      projectID: "",
      labelPosition: 'left',
      "git_path": '',
      "git_branch": 'master',
      options: [{
        value: 'Gilab',
        label: 'Gilab'
      }, {
        value: 'Github',
        label: 'Github'

      }, {
        value: 'SVN',
        label: 'SVN',
        disabled: true
      }],
      storeHouseType: 'Github'
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
        "git_branch": this.git_branch,
        "storeHouseType": this.storeHouseType,
        "type": "1"
      }
      if (!this.git_path || !this.git_branch) {
        this.$message({
          message: "Git地址或者分支不能为空",
          type: 'error'
        })
        return false
      }
      this.http.gitStartScan(data).then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.drawer = false
        setTimeout(() => {
          this.getData()
        }, 1500)
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
    // 关闭新建扫描任务前确认
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 提交删除请求弹框，初始化项目ID为下一步发送请求做准备
    onSubmit (projectID) {
      //   alert(projectID)
      this.projectID = projectID
      this.dialogVisible = true
    },
    // 提交删除确认按钮发送删除请求
    delete_confirm () {
      var data = {
        "projectID": this.projectID
      }
      this.dialogVisible = false
      this.http.deletePrj(data).then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.drawer = false
        this.getData()
      }).catch(
      )
    },
    // 绑定项目名称，以便查看扫描漏洞详情
    cellClick (row, column, cell, event) {
      //   console.log(row, column.index, cell, event)
      if (column.index === 2) {
        // this.drawer = true
        var projectID = row.id
        this.$router.push({ path: "/projectDatail", query: { projectID: projectID } })
        console.log(row.id)
      }
    },
    // 初始化表格索引
    getCellIndex: function ({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
      column.index = columnIndex
    },
    // 设置表字段样式
    setCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === this.rowIndex && columnIndex === this.columnIndex) {
        return { "background-color": "#009221" }
      }
      if (columnIndex === 2) {
        return { "color": "rgb(100, 173, 235)", "cursor": "pointer" }
      }
      if (row.status === "已完成" && columnIndex === 8) {
        return { "color": "rgb(100, 173, 235)" }
      } else if (row.status === "进行中" && columnIndex === 8) {
        return { "color": "green" }
      } else if (row.status === "扫描失败" && columnIndex === 8) {
        return { "color": "red" }
      }
    },
    // 关闭抽屉
    close_drawer () {
      this.drawer = false
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
