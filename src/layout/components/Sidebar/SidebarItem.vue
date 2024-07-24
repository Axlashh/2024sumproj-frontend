<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && lwkk(!onlyOneChild.children)">
      <router-link v-if="lwkk(onlyOneChild.meta) && onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </router-link>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script>
import Item from './Item'
import path from "path";

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      console.log('dsasad', parent)
      const showingChildren = children.filter(item => {
        console.log(item)
        if (item.hidden) {
          console.log(1)
          return false
        } else {
          console.log(2)
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          console.log(this.onlyOneChild)
          console.log(this.onlyOneChild.meta)
          return true
        }
      })

      console.log("showing", showingChildren)

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        console.log(3)
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        console.log(4)
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      console.log("resolvePath", routePath)
      return `${this.basePath}/${routePath}`;
    },
    lwkk(q) {
      console.log("lwkk", q)
      return true
    }
  }
}
</script>
