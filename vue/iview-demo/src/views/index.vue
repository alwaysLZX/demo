<template>
    <Layout class="layout">
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
                <MenuItem name="1">
                <Icon type="ios-paper" /> 内容管理
                </MenuItem>
                <MenuItem name="2">
                <Icon type="ios-people" /> 用户管理
                </MenuItem>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats" /> 统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem name="4">
                <Icon type="ios-construct" /> 综合设置
                </MenuItem>
            </Menu>
        </Header>
        <Content class="layout-content">
            <Breadcrumb class="layout-content-breadcrumb" :style="{}">
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>自定义组件</BreadcrumbItem>
                <BreadcrumbItem>周控件</BreadcrumbItem>
            </Breadcrumb>
            <Card class="layout-content-main">
                <Row :gutter="10">
                    <Col span="12">
                    <WeekPicker />
                    </Col>
                    <Col span="12">
                    <Button type="success" long @click="openProfilePhotoModal">打开图片裁剪框</Button>
                    </Col>
                </Row>
                <Row :gutter="10" :style="{marginTop:'10px'}">
                    <Col span="12">
                    <Button type="success" long @click="isShow = !isShow">过渡</Button>
                    </Col>
                    <Col span="12">
                        <transition>
                            <Button type="success" long v-if="isShow">过渡主体</Button>
                        </transition>
                    </Col>
                </Row>
                <ProfilePhoto v-model="modalProfilePhotoVisible"/>
            </Card>
        </Content>
    </Layout>
</template>
<script>
import WeekPicker from '@/views/components/week-picker.vue'
import ProfilePhoto from '@/views/components/profile-photo.vue'

export default {
    name: 'Index',
    components: {
        WeekPicker,
        ProfilePhoto
    },
    data() {
        return {
            modalProfilePhotoVisible: false,
            isShow:true
        }
    },
    methods: {
        openProfilePhotoModal() {
            this.modalProfilePhotoVisible = true;
        }
    }
}
</script>
<style lang="less" scoped>
.layout {
    height: 100%;
    &-content {
        padding: 0 50px 20px;
        display: flex;
        flex-direction: column;
        &-breadcrumb {
            margin: 20px 0;
        }
        &-main {
            flex: auto;
            overflow-y: scroll;
            /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
            &::-webkit-scrollbar {
                width: 5px;
            }
        }
    }
}
.v-enter-active {
  animation: bounce-in .5s;
}
.v-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>