<template>
   <div>
     <el-dialog
        :title="status"
        :visible="dialogVisible"
        
        :before-close="handleClose"
        :close-on-click-modal="false"
     >
      <span>
     
        <el-form :model="form" ref="numberValidateForm" label-width="100px" >
            <el-form-item label="名字" prop="name" >
              <el-input type="text" v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age" >
              <el-input type="text" v-model="form.age" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleOK('numberValidateForm')">提交</el-button>
              <el-button @click="handleClose">取消</el-button>
            </el-form-item>
        </el-form>
      </span>
    </el-dialog>
   
   </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props:['dialogVisible', 'status'],

    data() {
      return {
        form: {
          name: '',
          age: '',
        }
      };
    },

    updated () {
      this.form = this.editData
    },

    computed: {
      ...mapState(['editData'])
    },

    methods: {
      handleOK(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('handleOK', this.form)
            this.form = ''
          } else {
            return false;
          }
        })
      },
      handleClose () {
        this.$emit('handleClose')
      }
    }
  }

</script>