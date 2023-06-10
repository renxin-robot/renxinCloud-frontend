<template>
    <div class="ele-body container">
        <a-card style="border-radius: 4px;" title="基本信息" class="baseInfo">
            <div class="infoContent">
                <p>菜品名称：{{ Name }}</p>
                <p>菜谱文件编号：{{ code }}</p>
                <p>菜谱文件名称：{{ name }}</p>
                <p>份数：{{ amount }}</p>
                <p>规格：{{ guige }}</p>
                <p>下发设备数：{{ deviceTotal }}</p>
                <p>审核状态：{{ status }}</p>
                <p>备注：{{ remark }}</p>
            </div>
        </a-card>
        <a-card style="border-radius: 4px;margin-top:10px;" title="备菜流程" class="flowContainer">
            <div class="flowContent">
                <div class="flowTop">
                    图片格式为jpg、jpeg、png，建议尺寸为350 x 214，文件大小建议不超过10MB，最多上传5张；视频格式为mp4，推荐视频比例：10:6，大小不超过200M
                </div>
                <div v-for="item in menu" :key="item.id" style="margin-left: 20px;">
                    <p>{{ item.name }}</p>
                    <p style="display: flex;align-items: center;">
                        <div style="margin-right: 20px;">请选择</div>
                        <div>
                            <a-select
                                ref="select"
                                v-model:value="value1"
                                style="width: 150px;margin-right: 20px;"
                            >
                                <a-select-option value="净菜库">净菜库</a-select-option>
                                <a-select-option value="预处理原料">预处理原料</a-select-option>
                            </a-select>
                        </div>
                        <div>
                            <a-select
                                ref="select"
                                v-model:value="item.type"
                                show-search
                                placeholder="请选择净菜库名称"
                                style="width: 190px;margin-right: 20px;"
                            >
                                <a-select-option v-for="item in selectData" :key="item.id" :value="item.name">{{ item.name }}</a-select-option>
                            </a-select>
                        </div>
                        <div>
                            <a-button type="primary">确定</a-button>
                        </div>
                    </p>
                    <p style="display: flex;align-items: center;">
                        <div style="margin-right:10px;">
                            <a-upload
                                list-type="picture-card"
                                v-model:file-list="fileList"
                                @preview="handlePreview"
                            >
                                <div v-if="fileList.length < 8">
                                    <plus-outlined />
                                    <div class="ant-upload-text">上传图片</div>
                                </div>
                            </a-upload>
                            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="width: 100%" :src="previewImage" />
                            </a-modal>
                        </div>
                        <div>
                            <a-upload
                                list-type="picture-card"
                                v-model:file-list="fileList"
                                @preview="handlePreview"
                            >
                                <div v-if="fileList.length < 8">
                                    <plus-outlined />
                                    <div class="ant-upload-text">上传视频</div>
                                </div>
                            </a-upload>
                        </div>
                    </p>
                    <p>
                        <a-textarea v-model:value="item.des" style="border-radius: 4px;width: 90%;" placeholder="Basic usage" :rows="4" />
                    </p>
                    <p>
                        <a-divider />
                    </p>
                </div>
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent,ref} from 'vue';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        PlusOutlined,
    },
    setup(){
        const {currentRoute}=useRouter()
        let name=currentRoute.value.query.name
        let code=currentRoute.value.query.code
        let Name=currentRoute.value.query.Name
        let amount=currentRoute.value.query.amount
        let guige=currentRoute.value.query.guige
        let deviceTotal=currentRoute.value.query.deviceTotal
        let status=currentRoute.value.query.status
        let remark=currentRoute.value.query.remark

        return{
            name,
            code,
            deviceTotal,
            Name,
            amount,
            guige,
            status,
            remark,
        }
    }
})

</script>
<style lang="less" scoped>
.container{
    .flowContainer{
        .flowContent{
            .flowTop{
                background-color: #e6f4ff;
                border: 1px solid #91caff;
                box-sizing: border-box;
                margin: 0;
                padding: 8px 12px;
                color: rgba(0, 0, 0, 0.88);
                font-size: 14px;
                line-height: 1.5714285714285714;
                list-style: none;
                font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
                position: relative;
                display: flex;
                align-items: center;
                word-wrap: break-word;
                border-radius: 8px;
                margin-bottom:20px;
            }
        }
    }
    .baseInfo{
        .infoContent{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            p{
                width: 22%;
            }
        }
    }
}
</style>