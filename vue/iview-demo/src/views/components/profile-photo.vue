<template>
    <Modal title="修改头像" class-name="modal-profile-photo" :mask-closable="false" :value="visible" width="800" @on-cancel="handleCancel">
        <div class="profile-photo">
            <div class="profile-photo-content cropper-bg">
                <img id="profilePhoto" alt="">
            </div>
            <div class="profile-photo-tool">
                <div class="preview cropper-bg" id="profilePhotoPreview"></div>
                <div class="choice center" style="margin-top:20px;">
                    <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange" id="fileinputProfilePhoto" class="fileinput" />
                    <label class="filelabel" for="fileinputProfilePhoto" style="width:100px;">
                        <Icon type="image"></Icon>&nbsp;选择图片</label>
                </div>
                <div class="save center" style="margin-top:20px;">
                    <Button :loading="reClick.save" @click="handleCrop" type="primary" style="width:100px;" icon="crop">保存</Button>
                </div>
            </div>
        </div>
    </Modal>
</template>
<script>
import { getToken } from "@/utils/auth";
import config from "@/utils/config.js";
import Cropper from 'cropperjs';
import "@/views/my-components/image-editor/cropper.min.css";

// 修改头像
export default {
    name: 'profile_photo',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            modalProfilePhotoVisible: false,
            cropper: {},
            fileType:"image/jpeg",
            fileName:"",
            reClick:{
                save:false
            }
        };
    },
    methods: {
        handleChange(e) {
            let file = e.target.files[0];

            if(file === null){
                return;
            }

            let size = this.getFileSizeOfM(file.size);
            if (size > 2) {
                this.handleMaxSize(file);
                return;
            }

            this.fileType = file.type;
            this.fileName = file.name;

            // 文件大小
            let reader = new FileReader();
            reader.onload = () => {
                this.cropper.replace(reader.result);
                reader.onload = null;
            };
            reader.readAsDataURL(file);
        },
        handleCrop() {
            let croppedCanvas = this.cropper.getCroppedCanvas();

            if(croppedCanvas===null){
                this.$Notice.warning({
                    title: '选择文件',
                    desc: '请选择文件'
                });
                return;
            }
            // let file = this.cropper.getCroppedCanvas().toDataURL();
            
            if(this.reClick.save){
                return;
            }
            this.reClick.save = true;
            
            this.cropper.getCroppedCanvas().toBlob(blob => {
                
                var formData = new FormData();
                formData.append("profilePhoto", blob,this.fileName);
                this.api({
                    url: "/sys/user/upload",
                    method: "post",
                    headers: {
                        Authorization: getToken()
                    },
                    data: formData
                }).then(res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.$store.commit('SET_USER_AVATAR', this.getAbsoluteUrl(res.msg.url));
                        this.handleCancel();                     
                    } else {
                        console.log(res);
                    }
                    this.reClick.save = false;
                }).catch(err => {
                    console.log(err);
                    this.reClick.save = false;
                })
            }, this.fileType);
        },
        handleCancel() {
            this.$emit('on-cancel');
        },
        getFileSizeOfM(size) {
            return ((size / 1024) / 1014).toFixed(2);
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '【' + file.name + '】文件太大，不超过2M.'
            });
        },
        // 获取绝对地址
        getAbsoluteUrl(url){
            return config.server + url;
        }
    },
    computed: {
    },
    mounted() {
        let img = document.getElementById('profilePhoto');
        this.cropper = new Cropper(img, {
            viewMode: 1,
            dragMode: 'move',
            preview: '#profilePhotoPreview',
            restore: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            minContainerWidth: 500,
            minContainerHeight: 400,
            aspectRatio: 1 / 1,            // 框高比
            toggleDragModeOnDblclick: false
        });
    },
    created() {
    }
}
</script>
<style lang="less">
.modal-profile-photo {
    .ivu-modal {
        margin: 0 auto;
        top: 100px;
    }
    .ivu-modal-footer {
        display: none;
    }
}
</style>

<style lang="less" scoped>
// 修改头像
.profile-photo {
    width: 100%;
    height: 400px;
    display: flex;
    &-content {
        width: 500px;
        height: 400px;
    }
    &-tool {
        width: 0;
        height: 400px;
        margin-left: 16px;
        flex-grow: 1;
        position: relative;
        .preview {
            width: 100px;
            height: 100px;
            border-radius: 100%;
            overflow: hidden;
            margin: 0 auto;
        }
        .choice {
            margin-top: 20px;
        }
        .save {
            margin-top: 20px;
        }
        .fileinput {
            display: none;
        }
        .filelabel {
            display: block;
            padding: 6px 15px;
            background: #2d8cf0;
            display: inline-block;
            border: 1px solid #2d8cf0;
            border-radius: 4px;
            cursor: pointer;
            color: white;
            font-size: 12px;
            text-align: center;
            transition: all 0.2s;
            &:hover {
                background: #5cadff;
                border: 1px solid #5cadff;
                transition: all 0.2s;
            }
        }
    }
}
</style>