<template>
  <el-dialog
    title="新增用户"
    :visible.sync="dialogVisiable"
    @close="onCancel"
  >
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      auto-complete="on"
      label-position="right"
      size="small"
    >
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="name"
          v-model="registerForm.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="Email"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="email"
          v-model="registerForm.email"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="密码"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="password"
          v-model="registerForm.password"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="confirmPassword"
          v-model="registerForm.confirmPassword"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        :label-width="formLabelWidth"
      >
        <el-radio
          v-model="registerForm.status"
          label="2"
        >禁用</el-radio>
        <el-radio
          v-model="registerForm.status"
          label="1"
        >启用</el-radio>
      </el-form-item>
      <el-form-item
        label="角色"
        :label-width="formLabelWidth"
      >
        <el-select
          ref="roles"
          v-model="registerForm.roles"
          multiple
          size="medium"
          placeholder="请选择角色"
        >
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.displayName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="small"
        @click="onCancel()"
      >取 消</el-button>
      <el-button
        type="primary"
        size="small"
        @click="onstoreUser()"
      >提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getRoleOption } from '@/api/role'
import { store } from '@/api/user'
import { Message } from 'element-ui'
export default {
  name: 'AddUser',
  props: {
    dialogFormVisible: {
      type: Boolean
    },
    editRow: {
      type: Object,
      default: null
    }
  },
  data() {
    const validatename = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('用戶名错误'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少6位'))
      } else {
        callback()
      }
    }
    return {
      dialogVisiable: this.dialogFormVisible,
      registerRules: {
        name: [{ required: true, trigger: 'blur', validator: validatename }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      registerForm: {
        name: '',
        email: '',
        password: 'Aa123456',
        confirmPassword: 'Aa123456',
        status: '',
        roles: ''
      },
      roleOptions: [],
      formLabelWidth: '120px',
      loading: false
    }
  },
  watch: {
    dialogFormVisible(evl, o) {
      this.dialogVisiable = evl
    },
    editRow(v) {
      if (v) {
        this.registerForm = v
        console.log(this.registerForm)
        this.registerForm.status = this.registerForm.status + ''
      } else {
        this.resetForm()
      }
    }
  },
  mounted() {
    this.getRoleOption()
  },
  created() {},
  methods: {
    onstoreUser() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '正在提交...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          store(this.registerForm)
            .then(response => {
              this.onCancel()
              loading.close()
              this.$parent.getList()
              Message({
                message: '成功',
                type: 'success',
                duration: 5 * 1000
              })
            })
            .catch(() => {
              console.log('添加失败')
              loading.close()
            })
        } else {
          console.log('提交失败')
          return false
        }
      })
    },
    onCancel() {
      this.dialogVisiable = false
      this.$emit('childClose', false)
    },
    getRoleOption() {
      getRoleOption()
        .then(response => {
          this.roleOptions = response.data
        })
        .catch()
    },
    resetForm() {
      this.registerForm.name = ''
      this.registerForm.email = ''
      this.registerForm.password = ''
      this.registerForm.confirmPassword = ''
      this.registerForm.roles = ''
    }
  }
}
</script>
