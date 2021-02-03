<!-- 系统管理/日志管理 -->
<template>
  <div class="height_100 log">
    <div
      class="buttonGroup"
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
    >
      <el-date-picker
        size="small"
        @keydown.enter.native="selectName"
        v-model="date"
        @change="dateChange"
        style="width: 300px; margin-right: 10px"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        :start-placeholder="$t('m.placeholder.startTime')"
        :end-placeholder="$t('m.placeholder.endTime')"
      >
      </el-date-picker>

      <el-select
        clearable
        @change="getVal(page.equipmentId)"
        style="margin-right: 11px"
        size="small"
        v-model="page.equipmentId"
        filterable
        :placeholder="$t('m.placeholder.equipList')"
      >
        <el-option
          v-for="item in get_Equipment.records"
          :key="item.id"
          :label="item.numbering"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <el-button type="primary" @click="selectName" size="small">
        <i class="el-icon-search"></i>
        {{ $t("m.button.select") }}</el-button
      >
    </div>

    <el-table
      ref="multipleTable"
      :data="getInfo"
      tooltip-effect="dark"
      height="calc(100% - 70px)"
      style="width: 100%; margin-bottom: 6px"
      :row-key="getRowKey"
      :expand-row-keys="expands"
      @row-dblclick="dblclick"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column
        type="index"
        :index="table_index"
        align="center"
        width="60"
        :label="$t('m.label.orderNumber')"
      />
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="numbering"
        label="设备编号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="address"
        label="设备地址"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="money"
        label="实到账"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="refundMoney"
        label="退款金额"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="sumMoney"
        label="总收益"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import labelTop from "../../components/page/label";
export default {
  name: "tempdata",
  components: {
    labelTop,
  },
  data() {
    return {
      addVisible: true, //添加框控制器
      updateVisible: true, //修改框控制器
      expands: [],
      selection: [], //选中的条目
      tableInfo: {
        //当前组件向子组件table 传值
        addVisible: true, //添加框控制器
        updateVisible: true, //修改框控制器
        currentPage: 1,
        pageSize: 20,
        get: "get_Income", //vuex中获取当前table列表的getter函数
      },
      page: {
        equipmentId: "",
        currentPage: 1, // 默认当前页
        pageSize: 20, // 单页默认数据条数
        numberingOrMacId: "",
        pageNum: 1,
        total: 0,
        startTime:'2021-01-01',
        endTime:'2021-02-01'
      },
      date: "",
      getRowKey(row) {
        //
        return row.id;
      },
    };
  },
  computed: {
    getInfo() {
      // 获取当前路由需要展示的信息table表
      if (this.tableInfo.get) {
        return this.$store.getters[this.tableInfo.get];
      }
    },
    get_Equipment() {
      return this.$store.getters.get_Equipment;
    },
  },
  mounted() {
    this.$store.dispatch("getIncomeAll", this.page);
    this.$store.dispatch("getEquipmentAll", this.page);
  },
  methods: {
    table_index(index) {
      return (
        (this.tableInfo.currentPage - 1) * this.tableInfo.pageSize + index + 1
      );
    },
    select(selection) {
      // 单选    子组件table => 父组件传值
      this.selection = selection;
      console.log(this.selection);
    },
    selectAll(selection) {
      // 多选 子组件table => 父组件传值
      // console.log(selection)
      this.selection = selection;
      console.log(this.selection);
    },
    dblclick(row, cloumn, event) {},
    dateChange(v) {
      if (v) {
        this.page.startTime = v[0];
        this.page.endTime = v[1];
      } else {
        this.page.startTime = "";
        this.page.endTime = "";
      }
      this.selectName();
    },
    getVal(val) {
      this.$store.dispatch("getIncomeAll", this.page);
    },
    selectName() {
      this.$store.dispatch("getIncomeAll", this.page);
    },
  },
};
</script>

<style scoped>
.log {
  margin: 0 8px;
  text-align: left;

  /* background:#ffa5a5; */
}
.chest {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  position: relative;
}
.heart {
  position: absolute;
  z-index: 2;
  background: linear-gradient(-90deg, #f50a45 0%, #d5093c 40%);
  animation: beat 2s ease 0s infinite normal;
}
.heart.center {
  background: linear-gradient(-45deg, #b80734 0%, #d5093c 40%);
}
.heart.top {
  z-index: 3;
}
.sided {
  top: 100px;
  width: 220px;
  height: 220px;
  border-radius: 110px;
}
.center {
  width: 210px;
  height: 210px;
  bottom: 100px;
  left: 145px;
  transform: rotateZ(225deg);
}
.left {
  left: 62px;
}
.right {
  right: 62px;
}
@keyframes beat {
  0% {
    transform: scale(1) rotate(225deg);
    box-shadow: 0 0 40px #d5093c;
  }
  50% {
    transform: scale(1.1) rotate(225deg);
    box-shadow: 0 0 70px #d5093c;
  }
  100% {
    transform: scale(1) rotate(225deg);
    box-shadow: 0 0 40px #d5093c;
  }
}
.input_260 {
  width: 260px;
}
</style>