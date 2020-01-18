<template>
    <div>
      <yd-navbar v-if="getTopNav" height="2.4rem" fontsize="1rem">
        <router-link to="#" slot="left">
          <span style="font-size:1rem;color:#000;">书虫小说网</span>
          </router-link>
          <router-link to="#" slot="right">
          <yd-icon name="search" size="1.2rem" color="#09BB07"></yd-icon>
        </router-link>
      </yd-navbar>
      <keep-alive :include="cachedViews">
        <router-view />
      </keep-alive>
       <yd-tabbar :fixed="true" fontsize="0.8rem" padding=".6rem 0" v-if="getBottomNav">
        <yd-tabbar-item title="首页" link="/" :active="activeHome">
            <yd-icon name="home" slot="icon" size="1.4rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="分类" link="/classview" :active="activeClass">
            <yd-icon name="star" slot="icon" size="1.4rem"></yd-icon>
        </yd-tabbar-item>
        <!-- <yd-tabbar-item title="排行" link="/rank" :active="activeRank">
            <yd-icon name="discount" slot="icon" size="1.4rem"></yd-icon>
        </yd-tabbar-item> -->
        <yd-tabbar-item title="个人" link="/mine" :active="activeMine">
            <yd-icon name="ucenter-outline" slot="icon" size="1.4rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  methods: {
    addViewToVisided () {
      const thisRoute = this.$route.meta.isCache ? this.$route : null
      if (thisRoute) this.$store.dispatch('views/addVisitedViews', { route: thisRoute })
    }
  },
  watch: {
    $route () {
      this.addViewToVisided()
    }
  },
  computed: {
    ...mapGetters('botNav', {
      activeHome: 'getHome',
      activeClass: 'getClass',
      activeMine: 'getMine',
      activeRank: 'getRank',
      getTopNav: 'getTopNav',
      getBottomNav: 'getBottomNav'
    }),
    ...mapGetters('views', { // views.js里面的getters
      cachedViews: 'cachedViews'
    })
  },
  mounted () {
    this.$store.state.botNav.activeHome = true
  }
}
</script>
