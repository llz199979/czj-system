<!-- 商品管理 -->
<template>
  <div class="height_100 manage">
    <div
      class="buttonGroup"
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
    >
      <el-input
        size="small"
        v-model="page.name"
        @keydown.enter.native="selectName"
        clearable
        @clear="selectName"
        placeholder="请输入商品名称"
        style="width: 180px; margin-right: 10px"
      ></el-input>

      <el-button type="primary" @click="selectName" size="small">
        <i class="el-icon-search"></i>
        查询</el-button
      >
      <el-button
        type="success"
        @click="tableInfo.addVisible = false"
        size="small"
      >
        <i class="el-icon-circle-plus-outline"></i>
        添加</el-button
      >
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
        :data="get_Rcoder.records"
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
          label="商品id"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="name"
          label="商品名称"
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
          prop="commodityDesc"
          label="商品备注"
        >
        </el-table-column>
        <!-- <el-table-column
          align="center"
          show-overflow-tooltip
          prop="pictureId"
          label="照片id"
        >
        </el-table-column> -->

       <el-table-column
          align="center"
          :label="$t('m.label.picture')"
          prop="pictureUrl"
        >
          <template slot-scope="scope">
            <viewer>
              <img
                :src="scope.row.pictureUrl"
                style="width: 50px; height: 50px"
                srcset
              />
            </viewer>
          </template>
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
      style="height: 129%;position:relative"
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
        :rules="rules"
        ref="addAction"
        size="small"
        label-position="left"
        :model="order"
        label-width="80px"
      >
        <el-form-item label="商品id" prop="id">
          <el-input
            clearable
            :autofocus="true"
            v-model="order.id"
            class="input_260"
            autocomplete="off"
            :placeholder="$t('m.rules.id')"
          />
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input
            clearable
            :autofocus="true"
            v-model="order.name"
            class="input_260"
            autocomplete="off"
            :placeholder="$t('m.rules.name')"
          />
        </el-form-item>
        <el-form-item label="价格" prop="money">
          <el-input
            clearable
            v-model="order.money"
            class="input_260"
            autocomplete="off"
            :placeholder="$t('m.rules.money')"
          />
        </el-form-item>
        <el-form-item label="商品备注" prop="commodityDesc">
          <el-input
            clearable
            v-model="order.commodityDesc"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
       
        <el-form-item
          prop="pictureUrl"
          style="position: absolute; top: 81px; left: 461px"
        >
          <el-upload
            class="input_260"
            action="https://pay.mjktech.com.cn/media/uploadImage"
            :headers="header"
            :on-remove="handleRemove"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-exceed="uploadExceed"
            :limit="1"
            accept="image/png,image/jpg,image/jpeg"
            list-type="picture"
          >
            <el-button size="small" type="primary">{{
              $t("m.label.uploadImg")
            }}</el-button>
            <div slot="tip" class="el-upload__tip" style="font-size: 13px">
              {{ $t("m.label.uploadMessage") }}
            </div>
          </el-upload>
          <div v-show="order.pictureUrl">
            <p
              style="
                transition: all 0.5s linear;
                color: #42b9a0;
                font-size: 13px;
                margin-top: 20px;
              "
            >
              当前照片
            </p>
            <img class="originalPicture" :src="order.pictureUrl" />
          </div>
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
      fileList: [],
      permissionArr: [],
      page: {
        pageNum: 1,
        pageSize: 20,
        name: "",
        total: 0,
      },
      header: {
        Authorization: localStorage.getItem("token"),
      },
      switchStatus: false,
      order: {},
      getRowKey(row) {
        //
        return row.id;
      },
    };
  },
  computed: {
    ...mapGetters([
      //computed引入vuex getters的便捷写法，需要先引入
      "get_Rcoder",
    ]),
  },
  mounted() {
    this.$store.dispatch("getRcoderAll", this.page);
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
            this.$store.dispatch("updateRcoder", order).then((res) => {
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
        this.$store.dispatch("deleteRcoder", arr).then((res) => {});
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
      this.$store.dispatch("getRcoderAll", this.page);
    },

    cancel() {
      if (!this.tableInfo.updateVisible) {
        this.order = {};
        this.selection = [];
      }
      this.tableInfo.addVisible = true;
      this.tableInfo.updateVisible = true;
    },

    handleRemove(file, fileList) {
      this.fileList = [];
      if (this.order.pictureId) {
        this.$store.dispatch("delPicture", this.order);
        this.order.pictureId = "";
      }
    },
    beforeUpload(file) {
      var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type);
      const isLt4M = file.size / 1024 / 1024 <= 4; //图片大小不超过2MB
      if (!testmsg) {
        this.$message.error("上传图片格式不对!");
        return;
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 4M!");
        return;
      }
      return testmsg && isLt4M;
    },
    uploadSuccess(res, file, fileList) {
      //上传图片成功的回调(UI内置)
      console.log(res);
      this.order.pictureId = res.data;
      console.log(file);
      console.log(fileList);
      if (res.code) {
        this.$message.success("上传成功");
      } else {
        this.$message.error("上传失败");
        this.fileList = [];
      }
    },
    uploadError(error, file, fileList) {
      //上传图片失败的回调(UI内置)
      this.$message.error("图片上传失败");
      this.fileList = [];
    },
    uploadExceed(file, fileList) {
      //图片上传超出数量限制
      this.$message.error("请先删除之前上传的图片");
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
.originalPicture {
  max-width: 260px;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px #999;
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