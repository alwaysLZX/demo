<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>首页</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="search"></Icon>
                        <span>周控件</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="settings"></Icon>
                        <span>图片裁剪插件</span>
                    </MenuItem>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-paper" />
                            内容管理
                        </template>
                        <MenuItem name="1-1">文章管理</MenuItem>
                        <MenuItem name="1-2">评论管理</MenuItem>
                        <MenuItem name="1-3">举报管理</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-people" />
                            用户管理
                        </template>
                        <MenuItem name="2-1">新增用户</MenuItem>
                        <MenuItem name="2-2">活跃用户</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-stats" />
                            统计分析
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
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>首页</BreadcrumbItem>
                        <BreadcrumbItem>自定义组件</BreadcrumbItem>
                        <BreadcrumbItem>周选择器</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div style="height: 600px">
                            这是内容
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isCollapsed: false
        };
    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.layout {
    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 120px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width 0.2s ease 0.2s;
    }
    .menu-item i {
        transform: translateX(0px);
        transition: font-size 0.2s ease, transform 0.2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span {
        width: 0px;
        transition: width 0.2s ease;
    }
    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
        vertical-align: middle;
        font-size: 22px;
    }
    
}
</style>