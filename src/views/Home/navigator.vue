<!-- 首页内容main -->
<template>
  <div class="title">
      欢迎来到小程序管理系统   
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import labelTop from "../../components/page/label";
import tables from "../../components/table/table";
var padaDate = function (value) {
  return value < 10 ? "0" + value : value;
};
export default {
  name: "temp1",
  components: {
    labelTop,
    tables,
  },
  data() {
    return {
     
    }
  },
  methods: {
  
  },

  computed: {
 
  },
  mounted() {
  
  },
};
</script>

<style lang="scss" scoped>
   .title{
       margin: 0 auto;
       color: #0e80f7;
       font-size: 30px;
   }
</style>