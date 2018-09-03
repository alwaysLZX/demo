<template>
    <div>
        <Modal
            v-model="currentValue"
            title="修改头像" 
            class-name="modal-profile-photo"
            width="800"
            :mask-closable="false"
        >
            <div class="profile-photo">
                <div class="profile-photo-content cropper-bg">
                    <img id="profilePhoto" alt="">
                </div>
                <div class="profile-photo-tool">
                    <div class="preview cropper-bg" id="profilePhotoPreview"></div>
                    <div class="center marginTop20">
                        <input 
                            type="file" 
                            accept="image/png, image/jpeg, image/gif, image/jpg" 
                            @change="handleChange" 
                            id="fileinputProfilePhoto" 
                            class="file-input" 
                        />
                        <label class="file-label" for="fileinputProfilePhoto" style="width:100px;">
                            <Icon type="image"></Icon>&nbsp;选择图片
                        </label>
                    </div>
                    <div class="center marginTop20">
                        <Button
                            @click="handleView"
                            type="primary" 
                            style="width:100px;"
                            icon="see"
                        >预览</Button>
                    </div>
                    <div class="center marginTop20">
                        <Button 
                            :loading="reClick.save" 
                            @click="handleCrop" 
                            type="primary" 
                            style="width:100px;" 
                            icon="crop"
                        >保存</Button>
                    </div>
                </div>
            </div>
        </Modal>
        <Modal 
            v-model="preView.modal"
            title="预览"
        >
        <img :src="preView.src" style="width: 100%" alt="预览">
        </Modal>
    </div>
</template>
<script>
import Cropper from 'cropperjs'
import '@/styles/cropperjs/cropper.css'

// 修改头像
export default {
    name: 'ProfilePhoto',
    props: {
        value: {
            type: Boolean,
            default:false
        }
    },
    data() {
        return {
            cropper: {},
            file: {
                type: 'image/jpeg',
                name: ''
            },
            reClick:{
                save:false
            },
            preView: {
                modal: false,
                src: ''
            }
        };
    },
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
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
            aspectRatio: 1 / 1, // 框高比
            toggleDragModeOnDblclick: false
        });
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

            this.file.type = file.type;
            this.file.name = file.name;

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

            if(this.reClick.save){
                return;
            }
            this.reClick.save = true;            
            this.cropper.getCroppedCanvas().toBlob(blob => {
                this.reClick.save = false;
            }, this.file.type);
        },
        handleView() {
            let croppedCanvas = this.cropper.getCroppedCanvas();
            if(croppedCanvas===null){
                this.$Notice.warning({
                    title: '选择文件',
                    desc: '请选择文件'
                });
                return;
            }
            this.preView.src = this.cropper.getCroppedCanvas().toDataURL();
            this.preView.modal = true;
        },
        getFileSizeOfM(size) {
            return ((size / 1024) / 1014).toFixed(2);
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '【' + file.name + '】文件太大，不超过2M.'
            });
        }
    }
}
</script>
<style lang="less">
.modal-profile-photo {
    .ivu-modal {
        .ivu-modal-footer {
            display: none;
        }
    }    
}
.center{
    text-align: center;
}
.marginTop20{
    margin-top: 20px;
}
</style>
<style lang="less" scoped>
.modal-profile-photo {
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
            .file-input {
                display: none;
            }
            .file-label {
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
}
</style>