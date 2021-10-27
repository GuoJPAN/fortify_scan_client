<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus'

export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          index: 'index',
          title: '系统首页'
        },
        {
          icon: 'el-icon-s-promotion',
          index: '2',
          title: '代码审计',
          subs: [
            {
              index: 'codeScan',
              title: '代码扫描'
            },
            // {
            //   index: 'webScan',
            //   title: '黑盒扫描'
            // },
            // {
            //   index: 'projectDatail',
            //   title: '漏洞详情'
            // }
          ]
        },
        // {
        //   icon: 'el-icon-cpu',
        //   index: '3',
        //   title: '系统管理',
        //   subs: [
        //     {
        //       index: '3-1',
        //       title: '组件管理'
        //     },
        //     {
        //       index: '3-2',
        //       title: '用户管理'
        //     }
        //   ]
        // },
        // {
        //   icon: 'el-icon-suitcase-1',
        //   index: '4',
        //   title: '工单管理',
        //   subs: [
        //     {
        //       index: '4-1',
        //       title: '手工操作'
        //     }
        //   ]
        // },
        // {
        //   icon: 'el-icon-s-flag',
        //   index: '5',
        //   title: '帮助中心',
        //   subs: [
        //     {
        //       index: '5-1',
        //       title: '操作文档'
        //     },
        //     {
        //       index: '5-2',
        //       title: '关于我们'
        //     }
        //   ]
        // }
        // {
        //   icon: 'el-icon-lx-home',
        //   index: '5',
        //   title: 'echarts图表',
        //   subs: [
        //     {
        //       index: 'showEcharts',
        //       title: 'div多个echarts'
        //     },
        //     {
        //       index: 'showTabEcharts',
        //       title: 'tab页echarts'
        //     }
        //   ]
        // },
        // {
        //   icon: 'el-icon-lx-home',
        //   index: '6',
        //   title: '随便写写',
        //   subs: [
        //     {
        //       index: 'docIndex',
        //       title: '随便首页'
        //     },
        //     {
        //       index: 'myBoard',
        //       title: '看板'
        //     },
        //     {
        //       index: 'icon',
        //       title: '图标'
        //     }

        //   ]
        // },
        // {
        //   icon: 'el-icon-lx-copy',
        //   index: 'test001',
        //   title: '代码雨'
        // },
        // {
        //   icon: 'el-icon-lx-copy',
        //   index: 'table',
        //   title: '表格数据'
        // },
        // {
        //   icon: 'el-icon-lx-copy',
        //   index: 'test',
        //   title: '调试调试'
        // }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  height: 100%;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 160px;
}

.sidebar > ul {
  height: 100%;
}
</style>
