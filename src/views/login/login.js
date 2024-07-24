import { resetPassword } from '@/api/login'

// import { queryConfigByName } from '@/api/config'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少6位！'))
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      var score = this.progressPercent()
      if (value === null || value.length < 6 || value.length > 18) {
        callback(new Error('请输入6-18位密码'))
      } else if (score === 28) {
        callback(new Error(
            '您的密码过于简单，至少在数字、大写字母、小写字母、特殊符号包含两种！'))
      } else {
        callback()
      }
    }
    const validateSecondPassword = (rule, value, callback) => {
      if (value !== this.loginForm.newPassword) {
        callback(new Error('两次密码输入不一致，请重新输入！'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误！'))
      }
    }

    return {
      codeUrl: null,
      icpNo: '',
      loginForm: {
        username: '',
        password: '',
        phone: '',
        captcha: '',
        newPassword: '',
        secondPassword: '',
        imageCaptcha: '',
        email: '',
        identity: '',
        idCardNumber: '',
        gender: '',
        title: '',
        name: '',
        department: '',
        staffId: '',
        description: '',
        uuid: null
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '请输入用户名！',
            trigger: 'blur'
          }],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }],
        newPassword: [
          {
            required: true,
            trigger: 'blur',
            validator: validateNewPassword
          }],
        secondPassword: [
          {
            required: true,
            trigger: 'blur',
            validator: validateSecondPassword
          }],
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePhone
          }],
        imageCaptcha: [
          {
            required: true,
            message: '请输入图片验证码！',
            trigger: 'change'
          }],
        captcha: [
          {
            required: true,
            message: '请输入验证码！',
            trigger: 'blur'
          }]
      },
      webType: 'login',
      passwordType: 'password',
      secondPasswordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      wait: 60,
      otherQuery: {},
      getCaptcha: '获取验证码',
      getCaptchaDisable: false,
      captchaDisable: true,
      identifyCode: '',
      charaValue:'',
      charaOptions:[
        {label:'医生',value:1},
        {label:'患者',value:2},
      ],
      gender:[
        {label:'男',value:1},
        {label:'女',value:2},
      ]
    }
  },

  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    // this.getCode()
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showSecondPwd() {
      if (this.secondPasswordType === 'password') {
        this.secondPasswordType = ''
      } else {
        this.secondPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.secondPassword.focus()
      })
    },
    progressPercent() {
      if (!this.loginForm.newPassword) return 0
      // n:数字  l:小写字母  u:大写字母  s:特殊字符
      const result = this.loginForm.newPassword
          .split('')
          .map((val) => val.charCodeAt())
          .reduce((pre, val, index) => {
            if (val < 48) {
              pre.special += 1
            } else if (val < 58) {
              pre.num += 1
            } else if (val < 65) {
              pre.special += 1
            } else if (val < 91) {
              pre.upper += 1
            } else if (val < 97) {
              pre.special += 1
            } else if (val < 123) {
              pre.lower += 1
            } else {
              pre.special += 1
            }
            return pre
          }, {
            num: 0,
            lower: 0,
            upper: 0,
            special: 0
          })

      const arr = Object.values(result)

      const len = this.loginForm.newPassword.length
      const zCount = this.zeroCount(arr)['0']

      if (len >= 6) {
        if (!zCount) {
          return 95
        } else if (zCount === 1 || zCount === 2) {
          return 50
        } else {
          return 28
        }
      } else {
        return 0
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
              .then(res => {
                this.$router.push({
                  path: '/dashboard' || '/',
                  query: this.otherQuery
                })
                this.loading = false
              })
              .catch((e) => {
                this.loading = false
              })
        } else {
          return false
        }
      })
    },
    handlePhoneLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/phoneCaptchaLogin', this.loginForm)
              .then(res => {{
                this.$router.push({
                  path: '/dashboard' || '/',
                  query: this.otherQuery
                })
                this.loading = false
              }
              })
              .catch((e) => {
                this.loading = false
              })
        } else {
          return false
        }
      })
    },
    handleForgetPassword() {
      this.webType = 'forgetPassword'
      this.resetLoginForm()
      this.$refs['loginForm'].clearValidate()
    },
    handleSignUp() {
      this.webType = 'signUp'
      this.resetLoginForm()
      this.$refs['loginForm'].clearValidate()
    },
    handlePhone() {
      this.webType = 'phoneLogin'
      this.captchaDisable = true
      this.resetLoginForm()
      this.$refs['loginForm'].clearValidate()
    },
    handleLoginBack() {
      this.webType = 'login'
      this.$refs['loginForm'].clearValidate()
    },
    handleSignUpType(){
      if(this.charaValue === 1)
        this.webType = 'doctorSign'
      else
        this.webType = 'patientSign'
    },
    handleResetPassword() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          resetPassword(this.loginForm).then(() => {
            this.$notify({
              title: '成功',
              message: '重置密码成功，您可使用新密码登录！',
              type: 'success',
              duration: 2000
            })
            this.resetLoginForm()
            this.webType = 'login'
          })
        }
      })
    },
    zeroCount(arr) {
      return arr.reduce((prev, next) => {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
    },
    resetLoginForm() {
      this.loginForm = {
        username: '',
        password: '',
        phone: '',
        captcha: '',
        newPassword: '',
        secondPassword: '',
        uuid: null,
        imageCaptcha: null
      }
      // this.getCode()
    },
    waitTime() {
      if (this.wait === 0) {
        this.getCaptcha = '获取验证码'
        this.getCaptchaDisable = false
        this.wait = 60
      } else {
        this.wait = (this.wait - 1)
        this.getCaptchaDisable = true
        this.getCaptcha = '获取验证码(' + this.wait + ')'
        setTimeout(() => {
          this.waitTime()
        }, 1000)
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
