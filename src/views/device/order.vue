<!-- 商品管理 -->
<template>
  <div class="height_100 manage">
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
        @keydown.enter.native="selectName"
        @change="getVal(page.orderStatus)"
        style="margin-right: 11px"
        size="small"
        v-model="page.orderStatus"
        filterable
        placeholder="请输入支付状态"
      >
        <el-option
          v-for="item in status"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <el-button type="primary" @click="selectName" size="small">
        <i class="el-icon-search"></i>
        查询</el-button
      >
      <!-- <el-button
        type="success"
        @click="tableInfo.addVisible = false"
        size="small"
      >
        <i class="el-icon-circle-plus-outline"></i>
        添加</el-button
      > -->
      <el-button type="warning" @click="updateAction" size="small">
        <i class="el-icon-edit"></i>
        修改</el-button
      >
      <el-button type="danger" @click="deleteAction" size="small">
        <i class="el-icon-delete"></i>
        删除</el-button
      >
    </div>
    <div
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
      id="tableComponent"
      class="refuseCopy"
    >
      <el-table
        ref="multipleTable"
        :data="get_Order.records"
        tooltip-effect="dark"
        height="100%"
        style="width: 100%"
        :row-key="getRowKey"
        :expand-row-keys="expands"
        @row-dblclick="dblclick"
        @select="select"
        @select-all="selectAll"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          type="index"
          :index="table_index"
          align="center"
          width="60"
          :label="$t('m.label.orderNumber')"
        />
        <el-table-column
          v-if="show"
          align="center"
          show-overflow-tooltip
          prop="id"
          label="订单id"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="openId"
          label="openId"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="userNickname"
          label="用户昵称"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="money"
          label="价格"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="orderEndTime"
          label="订单时间"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="equipmentAddress"
          label="购买地址"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="orderStatus"
          label="订单状态"
        >
          <template slot-scope="scope">
           {{scope.row.orderStatus=='0'?'未支付':scope.row.orderStatus==1?'已支付':scope.row.orderStatus==2?'未出货':'已退款'}}
        </template>
        </el-table-column>
       

        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="wxOrderNumber"
          label="订单编号"
        >
        </el-table-column>
      </el-table>
    </div>
    <labelTop
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
      :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    ></labelTop>

    <el-card
      v-show="!tableInfo.addVisible || !tableInfo.updateVisible"
      class="box-card"
      shadow="always"
      style="height: 129%"
    >
      <!-- <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div> -->
      <div slot="header" class="clearfix">
        <span
          class="cardHeader"
          v-text="
            tableInfo.addVisible
              ? $t('m.header.infoUpdate')
              : $t('m.header.companyAdd')
          "
        ></span>
        <el-switch
          v-if="!tableInfo.addVisible"
          style="float: right; font-size: 12px !important"
          active-color="#13ce66"
          inactive-color=""
          v-model="switchStatus"
          :active-text="$t('m.header.addContinue')"
        >
        </el-switch>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">
      <i class="el-icon-turn-off"></i>
      操作按钮</el-button> -->
      </div>
      <el-form
        style="margin-left: 60px"
        class="form refuseCopy"
        ref="addAction"
        size="small"
        label-position="left"
        :model="order"
        label-width="80px"
      >
        <el-form-item label="订单id" prop="id">
          <el-input
            clearable
            :autofocus="true"
            v-model="order.id"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="openId" prop="openId">
          <el-input
            clearable
            :autofocus="true"
            v-model="order.openId"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="用户昵称" prop="userNickname">
          <el-input
            clearable
            v-model="order.userNickname"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="价格" prop="money">
          <el-input
            clearable
            v-model="order.money"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="订单时间" prop="orderEndTime">
          <el-input
            clearable
            v-model="order.orderEndTime"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="购买地址" prop="equipmentAddress">
          <el-input
            clearable
            v-model="order.equipmentAddress"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="订单编号" prop="wxOrderNumber">
          <el-input
            clearable
            v-model="order.wxOrderNumber"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
       

        <el-form-item label="">
          <el-button type="primary" @click="addAction('addAction', order)">
            {{ $t("m.button.confirm") }}
          </el-button>
          <el-button type="danger" @click="cancel">
            {{ $t("m.button.cancel") }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import labelTop from "../../components/page/label";
export default {
  name: "manage",
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
      },
      show:false,
      permissionArr: [],
      page: {
        pageNum: 1,
        pageSize: 20,
        startTime: "2021-01-01",
        endTime: "2021-02-01",
        orderStatus: "1",
        total: 0,
      },
      switchStatus: false,
      order: {},
      date: '',
      status: [
        {
          id: "0",
          name: "未支付",
        },
        {
          id: "1",
          name: "已支付",
        },
        {
          id: "2",
          name: "未出货",
        },
        {
          id: "3",
          name: "已退款",
        },
      ],
      getRowKey(row) {
        //
        return row.id;
      },
    };
  },
  computed: {
    ...mapGetters([
      //computed引入vuex getters的便捷写法，需要先引入
      "get_Order",
    ]),
  },
  mounted() {
    this.$store.dispatch("getOrderAll", this.page);
    this.permissionArr = this.$route.meta.arr;
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
    sizeChange(val) {
      this.page.pageSize = val;
      this.tableInfo.pageSize = val;
      this.selectName();
      console.log("sizeChange: " + val);
    },
    currentChange(val) {
      console.log("currentChage " + val);
      this.page.pageNum = val;
      this.tableInfo.currentPage = val;
      this.selectName();
    },
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
      this.$store.dispatch("getOrderAll", this.page);
    },
    // 添加与修改
    addAction(form, order) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(order);
          if (this.tableInfo.updateVisible) {
            //账号添加、修改判别
            this.$store.dispatch("addRcoder", order).then((res) => {
              this.order = {};
              if (!this.switchStatus) {
                this.tableInfo.addVisible = true;
              }
            });
          } else {
            this.$store.dispatch("updateOder", order).then((res) => {
              this.selection = [];
              this.order = {};
              this.tableInfo.updateVisible = true;
            });
          }
        } else {
          return false;
        }
      });
    },
    deleteAction() {
      //删除公司
      if (this.selection.length) {
        console.log(this.selection);
        // let id = this.selection[0].userId;
        let arr = [];
        this.selection.forEach((v) => {
          arr.push(v.id);
        });
        console.log(arr);
        this.$store.dispatch("deleteOrder", arr).then((res) => {});
      } else {
        let local = this.$i18n.locale;
        this.$notify.warning({
          title:
            local === "en"
              ? "Error prompt"
              : local === "zh"
              ? "错误提示"
              : "エラーメッセージ",
          message:
            local === "en"
              ? "Please select at least one message"
              : local === "zh"
              ? "请至少选择一条信息"
              : "メッセージを少なくとも一つ選んでください。",
        });
      }
    },
    updateAction() {
      if (this.selection.length == 1) {
        console.log(this.selection);
        this.tableInfo.updateVisible = false;
        this.order = JSON.parse(JSON.stringify(this.selection[0]));
        console.log(this.selection);
        this.order.id = this.order.id;
      } else {
        let local = this.$i18n.locale;
        this.$notify.warning({
          title:
            local === "en"
              ? "Error prompt"
              : local === "zh"
              ? "错误提示"
              : "エラーメッセージ",
          message:
            local === "en"
              ? "Please select at least one message"
              : local === "zh"
              ? "请至少选择一条信息"
              : "メッセージを少なくとも一つ選んでください。",
        });
      }
    },
    selectName() {
      this.$store.dispatch("getOrderAll", this.page);
    },

    cancel() {
      if (!this.tableInfo.updateVisible) {
        this.order = {};
        this.selection = [];
      }
      this.tableInfo.addVisible = true;
      this.tableInfo.updateVisible = true;
    },
  },
};
</script>

<style scoped>
#tableComponent {
  height: calc(100% - 70px);
  margin-bottom: 6px;
}
.manage {
  margin: 0 8px;
  text-align: left;

  /* background:#ffa5a5; */
}
/* .chest {
	width:500px;
	height:500px;
	margin:0 auto;
	position:relative;
}
.heart {
	position:absolute;
	z-index:2;
	background:linear-gradient(-90deg,#F50A45 0%,#d5093c 40%);
	animation:beat 2s ease 0s infinite normal;
}
.heart.center {
	background:linear-gradient(-45deg,#B80734 0%,#d5093c 40%);
}
.heart.top {
	z-index:3;
}
.sided {
	top:100px;
	width:220px;
	height:220px;
	border-radius:110px;
}
.center {
	width:210px;
	height:210px;
	bottom:100px;
	left:145px;
	transform:rotateZ(225deg);
} 
 .left {
	left:62px;
}
.right {
	right:62px;
}
@keyframes beat {
	0% {
	transform:scale(1) rotate(225deg);
	box-shadow:0 0 40px #d5093c;
}
50% {
	transform:scale(1.1) rotate(225deg);
	box-shadow:0 0 70px #d5093c;
}
100% {
	transform:scale(1) rotate(225deg);
	box-shadow:0 0 40px #d5093c;
}
} */
.input_260 {
  width: 260px;
}
</style>