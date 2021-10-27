<template>
  <div id="vdetail">
    <div style="margin: 10px 0 5px 0">
      <el-button type="primary" @click="comeback" size="mini">返回</el-button>
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
      v-loading="loading"
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
      <el-table-column prop="id" label="详情" width="50" align="center">
        <template slot-scope="scope">
          <i class="el-icon-view handleData"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="vid"
        label="ID"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="vtoken"
        label="ID"
        width="50"
        align="center"
        v-if="false"
      ></el-table-column>
      <el-table-column
        prop="risk"
        label="风险等级"
        align="center"
        width="120"
        :filters="[
          { text: '严重', value: 'Critical' },
          { text: '高危', value: 'High' },
          { text: '中危', value: 'Medium' },
          { text: '低危', value: 'Low' },
        ]"
        :filter-method="filterTag"
        sortable
      ></el-table-column>
      <el-table-column
        prop="title"
        label="漏洞类型"
        align="center"
        width="400"
      ></el-table-column>
      <el-table-column
        prop="FilePath"
        label="漏洞所在文件"
        align=""
        width=""
      ></el-table-column>
      <el-table-column
        prop="FileName"
        label="文件名"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="LineStart"
        label="影响行"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="extend"
        label="文件类型"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="扫描时间"
        align="center"
        width="150"
      ></el-table-column>
      <!-- <el-table-column
        prop="status"
        label="状态"
        width="100"
        align="center"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column> -->
    </el-table>
    <div id="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15, 20, 30, 50, 100]"
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
      size="55%"
      :modal="true"
    >
      <!-- :before-close="handleClose" -->
      <div id="needDrawer" style="">
        <div style="margin: 20px">
          <div class="vlabel">漏洞id:</div>
          <div>{{ vulDetail.vtoken }}</div>
          <div class="vlabel">扫描时间:</div>
          <div>{{ vulDetail.time }}</div>
          <div class="vlabel">漏洞名称:</div>
          <div>{{ vulDetail.title }}</div>
          <div class="vlabel">漏洞风险:</div>
          <div>{{ vulDetail.risk }}</div>
          <div class="vlabel">漏洞原因:</div>
          <div>{{ vulDetail.Abstract }}</div>
          <div class="vlabel">文件名:</div>
          <div>{{ vulDetail.FileName }}</div>

          <div class="vlabel">影响行:</div>
          <div>{{ vulDetail.LineStart }}</div>
          <div class="vlabel">影响行的代码:</div>
          <div v-highlight>
            <pre v-highlight><code v-html="vulDetail.Snippet"></code></pre>
          </div>
          <div class="vlabel">漏洞描述:</div>
          <div v-highlight>
            <pre v-highlight><code v-html="vulDetail.describe"></code></pre>
          </div>
          <div class="vlabel">修复建议:</div>
          <div v-highlight>
            <pre v-highlight><code v-html="vulDetail.Recommendation"></code></pre>
          </div>
          <div class="vlabel">后缀名:</div>
          <div>{{ vulDetail.extend }}</div>

          <div class="vlabel">文件位置:</div>
          <div>{{ vulDetail.FilePath }}</div>
          <div class="vlabel">完整代码:</div>
          <div v-highlight>
            <pre v-highlight><code v-html="vulDetail.full_code "></code></pre>
          </div>
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
      pageSize: 15,
      labelPosition: 'left',
      projectID: "",
      // 漏洞详情
      vulDetail: {
        vid: 1
      },
      loading: true
    }
  },
  methods: {
    // 分页 每页多少条
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    getVulData (projectID) {
      // 这里使用axios，使用时请提前引入
      let data = { "projectID": projectID }
      this.http.projectDatail(data).then(res => {
        this.tableData = res.data.data
        this.loading = false
      }).catch()
    },
    // 初始化表格索引
    getCellIndex: function ({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
      column.index = columnIndex
    },
    // 设置表字段样式，绑定方法
    cellClick (row, column, cell, event) {
      //   console.log(row, column.index, cell, event)
      console.log(column)
      console.log(row.vtoken)
      if (column.index === 0) {
        var data = { "projectID": this.projectID, "vtoken": row.vtoken }
        // 获取到数据之前显示加载按钮
        const loading = this.$loading({
          lock: true,
          text: '拼命获取数据中请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        this.http.singleVulDetail(data).then(res => {
          this.vulDetail = res.data.data[0]
          this.drawer = true
          loading.close()
        }).catch()
      }
    },
    setCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        if (row.risk === "Critical") {
          return { "color": "red" }
        } else if (row.risk === "Low") {
          return { "color": "green" }
        } else if (row.risk === "High") {
          return { "color": "orange" }
        } else {
          return { "color": "yellow" }
        }
      }
    },
    filterTag (value, row) {
      return row.risk === value
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    comeback () {
      this.$message({
        message: '回不去了...',
        type: 'success'
      })
      //   this.$router.push({ path: "/projectDatail" })
    },
    onSubmit () {
      this.$message({
        message: '恭喜发财',
        type: 'success'
      })
    }
  },
  mounted: function () {
    let projectID = this.$route.query.projectID
    this.projectID = projectID
    // this.getVulData(projectID)
    this.getVulData(projectID)
  },
  computed: {
    prop () {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        boxShadow: true // 边框
      }
      return data
    }
  },
  created: function () {

  },
  updated () {

  }
}
</script>

<style scoped>
#vdetail {
  margin: 20px 5px 0 5px;
}
#fenye {
  float: right;
  margin-top: 10px;
}
.handleData {
  cursor: pointer;
  transition: all 0.1s;
  color: rgb(102, 177, 255);
}
.handleData:hover {
  transform: scale(1.7); /*放大1.5倍*/
  transition: all 0.1s; /* 设置加载时间*/
}
#needDrawer {
  font-size: 11px;
}
.vlabel {
  margin: 5px 0;
  font-size: 14px;
  border-top: 1px solid rgb(236, 245, 255);
  color: rgb(15, 77, 192);
}
</style>
