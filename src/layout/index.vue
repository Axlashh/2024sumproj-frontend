<template>
  <div :class="classObj" class="app-wrapper">
    <div class="img-crt">
      <canvas id="my-cvs" width="250" height="100" />
    </div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import { getToken } from '@/utils/auth'
import { Navbar, Sidebar } from './components'
import { mapState } from 'vuex'
import AppMain from "@/layout/components/AppMain.vue";

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  data() {
    return {
      token: getToken(),
      userInfo: ''
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    }
  },
  created() {
    getInfo(this.token).then(response => {
      console.log('getInfo', response)
      this.userInfo = response.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss">
.el-table{
  background-color: transparent
}
.el-table tr{
  background-color: transparent
}
</style>
<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .img-crt {
      position: absolute;
      z-index: 10;
      top: 100;
      left: 0;
      visibility: hidden;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }

    .sidebar-container {
      transition: width 0.28s;
      width: $sideBarWidth !important;
      background-color: $menuBg;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;

      // reset element-ui css
      .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
      }

      .scrollbar-wrapper {
        overflow-x: hidden !important;
      }

      .el-scrollbar__bar.is-vertical {
        right: 0px;
      }

      .el-scrollbar {
        height: 100%;
      }

      &.has-logo {
        .el-scrollbar {
          height: calc(100% - 50px);
        }
      }

      .is-horizontal {
        display: none;
      }

      a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
      }

      .svg-icon {
        margin-right: 16px;
      }

      .sub-el-icon {
        margin-right: 12px;
        margin-left: -2px;
      }

      .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
      }

      // menu hover
      .submenu-title-noDropdown,
      .el-submenu__title {
        &:hover {
          background-color: $menuHover !important;
        }
      }

      .is-active>.el-submenu__title {
        color: $subMenuActiveText !important;
      }

      & .nest-menu .el-submenu>.el-submenu__title,
      & .el-submenu .el-menu-item {
        min-width: $sideBarWidth !important;
        background-color: $subMenuBg !important;

        &:hover {
          background-color: $subMenuHover !important;
        }
      }
    }

    .main-container {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: $sideBarWidth;
      position: relative;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .hideSidebar {
    .sidebar-container {
      width: 54px !important;
    }

    .main-container {
      margin-left: 54px;
    }
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
