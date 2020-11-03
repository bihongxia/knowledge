<template>
  <el-dialog
    title="新增角色"
    :visible.sync="dialogVisiable"
    :loading="loading"
    @closed="onCancel(form)"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="verifyRules"
      auto-complete="on"
      label-position="right"
    >
      <el-form-item
        label="角色名"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input
          ref="name"
          v-model="form.name"
        />
      </el-form-item>
      <el-form-item
        label="展示名"
        :label-width="formLabelWidth"
      >
        <el-input
          ref="displayName"
          v-model="form.displayName"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        :label-width="formLabelWidth"
      >
        <el-radio
          v-model="form.status"
          label="1"
        >启用</el-radio>
        <el-radio
          v-model="form.status"
          label="2"
        >禁用</el-radio>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="onCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="onSubmit"
      >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { store } from '@/api/role'
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
    var validatename = (rule, value, callback) => {
      if (value.length < 1 || value.length > 64) {
        callback(new Error('用戶名格式错误(1-64位英文字符)'))
      } else {
        callback()
      }
    }
    return {
      dialogVisiable: this.dialogFormVisible,
      verifyRules: {
        name: [{ required: true, trigger: 'blur', validator: validatename }]
      },
      form: {
        name: '',
        displayName: '',
        status: '1'
      },
      formLabelWidth: '120px',
      loading: false,
      isEdit: false
    }
  },
  watch: {
    dialogFormVisible(evl, o) {
      this.dialogVisiable = evl
    },
    editRow(v) {
      if (v) {
        this.form.id = v.id
        this.form.name = v.name
        this.form.displayName = v.displayName
        this.form.status = v.status + ''
      } else {
        this.resetForm()
      }
    }
  },
  created() {
    // console.log(this.dialogFormVisible)
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          store(this.form)
            .then(response => {
              this.onCancel()
              this.loading = false
              this.$parent.getList()
              Message({
                message: '添加成功',
                type: 'success',
                duration: 5 * 1000
              })
            })
            .catch(() => {
              console.log('添加失败')
              this.loading = false
            })
        } else {
          console.log('提交失败')
          return false
        }
      })
    },
    onCancel(formName) {
      this.dialogVisiable = false
      this.$emit('childClose', false)
      if (!this.form.id) {
        this.form.name = ''
        this.form.displayName = ''
        this.form.status = '1'
      }
    },
    resetForm() {
      this.form.id = null
      this.form.name = ''
      this.form.displayName = ''
      this.form.status = '1'
    }
  }
}
</script>
