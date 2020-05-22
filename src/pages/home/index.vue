<template>
  <div class="pages-home">
    <el-button type="primary" @click="openDialog">添加</el-button>
    <Models
      :status="status"
      :dialogVisible="dialogVisible"
      @handleOK="handleOK"
      @handleClose="handleClose"
    />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编码" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Models from './model';
import "./style.less";
export default {
  created() {
    this.$store.dispatch("FETACH_TABLE_DATA");
  },

  data() {
    return {
      dialogVisible: false,
      status: ""
    };
  },

  computed: {
    ...mapState(["tableData"])
  },

  methods: {
    openDialog() {
      this.status = '添加';
      this.dialogVisible = true;
    },

    handleOK(value) {
      if (value.status) {
        this.$store.dispatch("FETACH_TABLE_EDIT", value);
      } else {
        this.$store.dispatch("FETACH_TABLE_ADD", value);
      }
      this.status = "";
      this.dialogVisible = false;
      this.$store.dispatch("FETACH_EDIT_DATA", []);
    },

    handleClose() {
      this.dialogVisible = false;
      this.$store.dispatch("FETACH_EDIT_DATA", []);
    },

    handleDelete(row) {
      this.$store.dispatch("FETACH_TABLE_DELETE", row.id);
    },

    handleEdit(row) {
      this.status = '修改';
      this.dialogVisible = true;
      this.$store.dispatch("FETACH_EDIT_DATA", row);
    }
  },

  components: {
    Models
  }
};
</script>