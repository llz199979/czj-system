<!-- 设备管理 -->
<template>
  <div class="height_100 eg1">
    <div class="buttonGroup" v-if="addVisible && updateVisible">
      <!-- 查询 -->
      <el-input
        size="small"
        v-model="page.numberingOrMacId"
        @keydown.enter.native="selectName"
        clearable
        @clear="selectName"
        placeholder="请根据设备编号查询"
        style="width: 180px; margin-right: 10px"
      ></el-input>
      <buttonList
        v-bind:permissionArr="$route.meta.arr"
        @buttonEvents="buttonEvents"
      ></buttonList>
    </div>
    <!-- 列表 -->
    <el-table
      v-if="addVisible && updateVisible"
      ref="multipleTable"
      :data="get_Equipment.records"
      tooltip-effect="dark"
      height="calc(100% - 70px)"
      style="width: 100%; margin-bottom: 6px"
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
        align="center"
        show-overflow-tooltip
        prop="numbering"
        label="设备编号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="macId"
        label="设备id"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="address"
        label="放置地址"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="commodity.name"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="commodityNumber"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="equipmentDesc"
        label="备注"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="status"
        label="设备在线状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status == "true" ? "在线" : "离线" }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        show-overflow-tooltip
        label="操作在线状态"
        prop="status"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            round
            @click="selectAssign(scope.row)"
          >
            {{ $t("m.label.details") }}
          </el-button>
          <el-switch
            v-model="scope.row.status"
            :active-value="true"
            :inactive-value="false"
            @change="changSwitch($event, scope.row, scope.$index)"
          ></el-switch>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <el-dialog
      v-el-drag-dialog
      custom-class="dialog"
      width="500px"
      top="10vh"
      :modal="false"
      :visible.sync="detailVisible"
      center
    >
      <el-form
        style="margin-left: 50px"
        class="form refuseCopy"
        size="small"
        label-position="left"
        :model="stu"
        label-width="105px"
        ref="updateStu"
      >
        <el-form-item label="设备编号" prop="numbering">
          <el-input
            clearable
            placeholder=""
            v-model="stu.numbering"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <el-switch
            v-model="stu.status"
            active-value="true"
            inactive-value="false"
          ></el-switch>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="updateStu('updateStu', stu)">
            {{ $t("m.button.confirm") }}
          </el-button>
          <el-button type="danger" @click="cancel">
            {{ $t("m.button.cancel") }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
    <labelTop
      v-if="addVisible && updateVisible"
      @sizeChange="sizeChange"
      :label-info="page"
      @currentChange="currentChange"
    ></labelTop>
    <el-card
      v-show="!addVisible || !updateVisible"
      class="box-card"
      shadow="always"
      style="height: 99%; overflow-y: auto"
    >
      <div slot="header" class="clearfix">
        <span
          class="cardHeader"
          v-text="
            addVisible ? $t('m.header.infoUpdate') : $t('m.header.roleAdd')
          "
        ></span>
        <el-switch
          v-if="!addVisible"
          style="float: right; font-size: 12px !important"
          active-color="#13ce66"
          inactive-color=""
          v-model="switchStatus"
          :active-text="$t('m.placeholder.roleName2')"
        >
        </el-switch>
      </div>

      <el-form
        style="margin-left: 60px"
        class="form refuseCopy"
        :rules="rules"
        ref="addAction"
        size="small"
        label-position="left"
        :model="order"
        label-width="100px"
      >
        <el-form-item label="设备编号" prop="numbering">
          <el-input
            clearable
            :placeholder="$t('m.rules.numbering')"
            v-model="order.numbering"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="设备id" prop="macId">
          <el-input
            clearable
            v-model="order.macId"
            class="input_260"
            autocomplete="off"
            :placeholder="$t('m.rules.id')"
          />
        </el-form-item>
        <el-form-item label="放置地址" prop="address">
          <el-input
            clearable
            v-model="order.address"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input
            clearable
            v-model="order.commodity.name"
            class="input_260"
            autocomplete="off"
            :placeholder="$t('m.rules.name')"
          />
        </el-form-item>
        <el-form-item label="商品数量" prop="commodityNumber">
          <el-input
            clearable
            v-model="order.commodityNumber"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="备注" prop="equipmentDesc">
          <el-input
            clearable
            v-model="order.equipmentDesc"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="设备是否在线" prop="status">
          <el-switch
            v-model="order.status"
            active-value="true"
            inactive-value="false"
          ></el-switch>
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
import buttonList from "../../components/table/button";
export default {
  name: "eg1",
  components: {
    labelTop, //分页组件
    buttonList, //按钮组件
  },
  data() {
    return {
      addVisible: true, // 添加框控制器
      updateVisible: true, // 修改框控制器
      detailVisible: false,
      expands: [], // el-table expands属性，暂时用不到
      selection: [], // 选中的条目
      getRowKey(row) {
        // el-table中每个隐藏内容都需要一个不重复的键值
        return row.id; // 暂时用不上
      },
      stu: {},
      page: {
        // 分页属性，供查询使用
        currentPage: 1, // 默认当前页
        pageSize: 20, // 单页默认数据条数
        numberingOrMacId: "",
        pageNum: 1,
        total: 0, // 后台传递的数据总数，默认为0，请求过后改变
      },
      switchStatus: false, // 控制持续添加框的状态值，true为持续添加，false为一次添加
      order: {
        commodity:{}
      },
      permissionArr: [], // 当前路由的增删改查权力数组
    };
  },
  computed: {
    ...mapGetters([
      //computed引入vuex getters的便捷写法，需要先引入
      "get_Equipment",
    ]),
  },
  mounted() {
    // 挂载后获取用户列表
    this.$store.dispatch("getEquipmentAll", this.page);
    // 获取当前路由下的权限 如：增、删、改、查。
    this.permissionArr = this.$route.meta.arr;
    // 权限表是否存入localStorage
    if (!localStorage.getItem("tree")) {
      this.$store.commit("treeMenu"); //同步处理
    }
    this.data = JSON.parse(localStorage.getItem("tree"));
  },
  methods: {
    select(selection, row) {
      // 单选
      this.selection = selection;
      console.log(this.selection);
    },
    selectAll(selection) {
      // 多选
      this.selection = selection;
      console.log(this.selection);
    },
    dblclick(row, cloumn, event) {},
    //翻页后序号连续
    table_index(index) {
      // el-table 默认序号不连续 每一页都是同样的序号
      return (this.page.currentPage - 1) * this.page.pageSize + index + 1;
    },
    sizeChange(val) {
      // 父子组件传值 获取分页组件的页数范围大小
      this.page.pageSize = val;
      this.selectName(); // 调用同一实例中的异步查询方法，再查一边角色列表
      console.log("sizeChange: " + val);
    },
    currentChange(val) {
      // 父子组件传值 ，获取分页组件当前的页数
      console.log("currentChage " + val);
      this.page.currentPage = val;
      this.selectName(); // 调用同一实例中的异步查询方法，再查一边角色列表
    },
    buttonEvents(operation) {
      // 子组件button触发的函数
      switch (
        operation // 根据operation判断其操作
      ) {
        case "add":
          this.addVisible = false;
          break;
        case "delete":
          this.deleteAction();
          break;
        case "update":
          this.updateAction();
          break;
        case "select":
          this.selectName();
          break;
      }
    },
    changSwitch(data, b, index) {
      this.$store.dispatch("updateStutas", b).then((response) => {
        if (response.code == 1) {
          this.$message({
            message: "状态修改成功",
            type: "success",
          });
        } else {
          let newData = b;
          newData.status = newData.status == "true" ? "false" : "true";
          this.selection[index] = newData;
        }
      });
    },
    // 添加与修改行为
    addAction(form, order) {
      // el-form 默认监测函数：
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.updateVisible) {
            //账号添加、修改判别
            this.$store.dispatch("addEquip", order).then((res) => {
              console.log("addActionSuccess");
              if (!this.switchStatus) {
                // 是否进行连续添加
                this.addVisible = true; // 否
              }
              this.order = {}; // form表单的data值
            });
          } else {
            this.$store.dispatch("updateEquip", order).then((res) => {
              this.order = {};
              this.updateVisible = true;
            });
          }
        } else {
          // 输入错误或缺漏，会显示错误提示
          return false;
        }
      });
    },
    deleteAction() {
      //删除行为
      if (this.selection.length) {
        // 之前select函数会改变this.selection的值
        console.log(this.selection);
        let arr = [];
        // 删除只需要角色Id的数组
        this.selection.forEach((v) => {
          arr.push(v.id);
        });
        this.$store.dispatch("deleteEquipment", arr).then((res) => {});
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
    // 修改行为之前的准备
    updateAction() {
      // 一次只能修改一个角色，即选中一个角色
      if (this.selection.length == 1) {
        console.log(this.selection);
        this.updateVisible = false; //显示修改框
        this.order = this.selection[0]; //获取当前角色的固有属性
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
    updateStu(formw, stu) {
      this.$refs[formw].validate((valid) => {
        if (valid) {
          this.$store.dispatch("updateStatus", stu).then((res) => {
            this.stu = {};
            this.detailVisible = false;
          });
        }
      });
    },
    // selectAssign(value) {
    //   this.stu.numbering = value.numbering;
    //   this.stu.status = value.status
    //   this.detailVisible = true;
    // },
    selectName() {
      //根据page值进行查找
      this.$store.dispatch("getEquipmentAll", this.page);
    },
    cancel() {
      this.addVisible = true;
      this.updateVisible = true;
      this.detailVisible = false;
    },
  },
};

</script>

<style scoped>
.eg1 {
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