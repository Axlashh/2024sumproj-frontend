<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >


      <!-- 根据不同页面类型选择不同标题 -->
      <div class="title-container">
        <h3 v-if="webType == 'login'" class="title">
          系统登录
        </h3>
        <h3 v-if="webType == 'forgetPassword'" class="title">
          密码重置
        </h3>
        <h3 v-if="webType == 'phoneLogin'" class="title">
          手机号码登录
        </h3>
        <h3 v-if="webType == 'signUp'" class="title">
          账号注册
        </h3>
        <h3 v-if="webType == 'doctorSign'" class="title">
          医生注册
        </h3>
        <h3 v-if="webType == 'patientSign'" class="title">
          患者注册
        </h3>
        <h3 v-if="webType == 'home'" class="title">
          主页界面
        </h3>
      </div>

      <!-- 医生注册界面 -->
      <div v-if="webType == 'doctorSign'">
        <el-form-item prop="name">
          <template #prefix>
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
          <el-input
              ref="name"
              v-model="loginForm.name"
              :placeholder="'姓名'"
              name="name"
              type="text"
              tabindex="1"
              autocomplete="on"
          >
            <template #prefix>
              <el-icon><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="idCardNumber">
          <template #prefix>
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
          <el-input
              ref="idCardNumber"
              v-model="loginForm.idCardNumber"
              :placeholder="'身份证号'"
              name="idCardNumber"
              type="text"
              tabindex="1"
              autocomplete="on"
          >
            <template #prefix>
              <el-icon><Stamp /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-select
            v-model="genderValue"
            clearable
            placeholder="性别"
            style="width: 480px;margin-bottom:18px;margin-left: 30px;margin-top: 10px"
        >
          <el-option
              v-for="item in gender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-model="item.label"
          />
        </el-select>

        <el-select
            v-model="identityValue"
            clearable
            placeholder="职称"
            style="width: 480px;margin-bottom:18px;margin-left: 30px;margin-top: 10px"
        >
          <el-option
              v-for="item in identity"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-model="item.label"
          />
        </el-select>

        <el-select
            v-model="departmentValue"
            clearable
            placeholder="部门"
            style="width: 480px;margin-bottom:18px;margin-left: 30px;margin-top: 10px"
        >
          <el-option
              v-for="item in department"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-model="item.label"
          />
        </el-select>

        <el-form-item prop="staffId">
          <template #prefix>
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
          <el-input
              ref="staffId"
              v-model="loginForm.staffId"
              :placeholder="'工号'"
              name="workerID"
              type="text"
              tabindex="1"
              autocomplete="on"
          >
            <template #prefix>
              <el-icon><Avatar /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-button
            :loading="loading"
            type="primary"
            style="width:47.5%;margin-bottom:30px;"
            @click="handleLoginin"
        >
          {{ '注册' }}
        </el-button>

        <el-button
            :loading="loading"
            type="primary"
            style="width:47.5%;margin-bottom:30px;margin-left: 5%;"
            @click="handleSignBack"
        >
          {{ '返回' }}
        </el-button>
      </div>


<!--      账号注册界面-->
      <div v-if="webType == 'signUp'">
        <el-form-item prop="username">
          <template #prefix>
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
          <el-input
              ref="username"
              v-model="loginForm.username"
              :placeholder="'用户名'"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
          >
            <template #prefix>
              <el-icon><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="'密码'"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
          <span class="show-pwd" @click="showPwd">
          <el-icon v-if="passwordType !== 'password'"><View /></el-icon>
          <el-icon v-if="passwordType === 'password'"><Hide /></el-icon>
        </span>
        </el-form-item>

        <!-- 这里是下拉表 -->
        <el-select
            v-model="charaValue"
            clearable
            placeholder="身份"
            style="width: 480px;margin-bottom:18px;margin-left: 30px;margin-top: 10px"
        >
          <el-option
              v-for="item in charaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-model="item.label"
          />
        </el-select>

        <el-form-item prop="phone">
          <el-input
              v-model="loginForm.phone"
              :placeholder="'手机号'"
              name="phone"
              type="text"
              tabindex="3"
              autocomplete="on"
              maxlength="11"
          />
        </el-form-item>

        <el-button
            :loading="loading"
            type="primary"
            style="width:47.5%;margin-bottom:30px;"
            @click="handleSignUpType"
        >
          {{ '下一步' }}
        </el-button>

        <el-button
            :loading="loading"
            type="primary"
            style="width:47.5%;margin-bottom:30px;margin-left: 5%;"
            @click="handleLoginBack"
        >
          {{ '返回' }}
        </el-button>
      </div>

      <!-- 手机号和忘记密码通用的三个输入框 -->
      <div v-if="webType == 'forgetPassword' || webType == 'phoneLogin'">
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            :placeholder="'手机号'"
            name="phone"
            type="text"
            tabindex="3"
            autocomplete="on"
            maxlength="11"
          />
        </el-form-item>

        <el-form-item prop="captcha">
          <el-input
            ref="captcha"
            v-model="loginForm.captcha"
            :placeholder="'验证码'"
            name="captcha"
            tabindex="4"
            autocomplete="on"
          />
          <span class="show-pwd" :disabled="getCaptchaDisable" @click="handleGetCaptcha">
            {{ getCaptcha }}
          </span>
        </el-form-item>
      </div>  

      <!-- 忘记密码的两个输入框 -->
      <div v-if="webType == 'forgetPassword'">
        <el-form-item prop="newPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.newPassword"
            :type="passwordType"
            :placeholder="'新密码'"
            name="password"
            tabindex="5"
            autocomplete="on"
          />
          <span class="show-pwd" @click="showPwd">
            <el-icon v-if="passwordType !== 'password'"><View /></el-icon>
            <el-icon v-if="passwordType === 'password'"><Hide /></el-icon>
          </span>
        </el-form-item>
        <el-form-item prop="secondPassword">
          <el-input
            :key="secondPasswordType"
            ref="secondPassword"
            v-model="loginForm.secondPassword"
            :type="secondPasswordType"
            :placeholder="'确认密码'"
            name="secondPassword"
            tabindex="6"
            autocomplete="on"
          />
          <span class="show-pwd" @click="showSecondPwd">
            <el-icon v-if="passwordType !== 'password'"><View /></el-icon>
            <el-icon v-if="passwordType === 'password'"><Hide /></el-icon>
          </span>
        </el-form-item>
      </div>
      
      <!-- 登录页面的组件 -->
      <div v-if="webType == 'login'">
        <el-form-item prop="username">
          <template #prefix>
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
          <el-input
            ref="username"
            v-model="loginForm.username"
            :placeholder="'用户名'"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          >
            <template #prefix>
              <el-icon><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>


      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="'密码'"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
        <span class="show-pwd" @click="showPwd">
          <el-icon v-if="passwordType !== 'password'"><View /></el-icon>
          <el-icon v-if="passwordType === 'password'"><Hide /></el-icon>
        </span>
      </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:47.5%;margin-bottom:30px;"
          @click="handleLogin"
        >
          {{ '登录' }}
        </el-button>
        <el-button 
          type="primary" 
          style="width:47.5%;margin-bottom:30px;margin-left: 5%;" 
          @click="handlePhone"
        >
          {{ '手机号登录' }}
        </el-button>
        
        <el-button
          v-if="webType == 'login'"
          type="primary"
          style="width:47.5%;margin-bottom:30px;margin-left: 0%;"
          @click="handleSignUp"
        >
          {{ '注册' }}
        </el-button>
        
        <el-button
          v-if="webType == 'login'"
          type="primary"
          style="width:47.5%;margin-bottom:30px;margin-left: 5%;"
          @click="handleForgetPassword"
        >
          {{ '忘记密码' }}
        </el-button>
      </div>

      <el-button
        v-if="webType == 'phoneLogin'"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handlePhoneLogin"
      >
        {{ '登录' }}
      </el-button>
      <el-button
        v-if="webType == 'forgetPassword'"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="handleResetPassword"
      >
        {{ '重置' }}
      </el-button>
      <el-button
        v-if="webType == 'forgetPassword' || webType == 'phoneLogin'"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="handleLoginBack"
      >
        {{ '返回' }}
      </el-button>
    </el-form>
    <el-col>
      <el-row class="bottom_layer">922106840225 黄子昕</el-row>
      <el-row class="bottom_layer">922106840212 曾俊杰</el-row>
      <el-row class="bottom_layer">922106840223 何奕宁</el-row>
    </el-col>
  </div>
</template>


<script>
import login from './login.js'

export default login
</script>

<style lang="scss">

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.bottom_layer {
  width: 100%;
  font-size: 10px;
  text-align: center;
  margin-bottom: 0px;
  color: #d9d9d9;
  display: block;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

</style>
<style lang="scss" scoped>
$bg: #172c3c;
$dark_gray: #5d93b8;
$light_gray: #eee;

/** 默认样式 */
:deep(.el-input){
  border:none;
}
/** el-input disabled时的文字颜色*/
.el-input.is-disabled .el-input__inner{
  color:#d61616;
}
/** el-input disabled时的背景和边框*/
.el-input.is-disabled{
  background:#dbdada;
  border: 1px solid #868686;
}

:deep(.el-input__inner) {
  background-color: transparent !important;
  color: $light_gray;
  border: none;
  border-bottom: 1px solid #eee;
  &:hover{
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #eee;
  }
  &:focus{
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #eee;
  }
}

:deep(.el-input__wrapper){
  background-color:transparent;
  border: none;
  box-shadow: none;
}

:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: none;
    &:hover{
    box-shadow: none;
    border: none;
  } 
  &:focus{
    box-shadow: none;
    border: none;
  }
}

//历史记录后自动补充的颜色
:deep(input:-webkit-autofill) {
  -webkit-text-fill-color: $light_gray;
  transition: background-color 5000s ease-out 0.5s;
}

.login-container {
  min-height: 100%;
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: relative;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }

  .code {
    // margin: 400px auto;
    width: 114px;
    height: 40px;
    border: 1px solid red;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

.login-code {
  padding: 6px 5px 6px;
  width: 200px;
  height: 38px;
  float: right;
  display: inline-block;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.svg-container-code {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  width: 200px;
  height: 38px;
  display: inline-block;
}

.login-code-img {
  height: 38px;
}
</style>

