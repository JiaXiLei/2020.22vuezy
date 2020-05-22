<template>
  <div class="pages-login">
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="账号"
        prop="name"
        :rules="[
      { required: true, message: '年龄不能为空'},
    ]"
      >
        <el-input type="text" v-model="numberValidateForm.name" autocomplete="off" />
      </el-form-item>

      <el-form-item
        label="密码"
        prop="pass"
        :rules="[
      { required: true, message: '密码不能为空'},
      { type: 'number', message: '密码必须为数字值'}
    ]"
      >
        <el-input type="text" v-model.number="numberValidateForm.pass" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "./style.less";
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      numberValidateForm: {
        name: "",
        pass: ""
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = {
            username: this.numberValidateForm.name,
            password: this.numberValidateForm.pass
          };
          const a = this.$store.dispatch("FETCH_LOGIN", obj);
          console.log(a)
        } else {
          console.log("error!");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>