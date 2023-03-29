<template>
    <div class="ele-body">
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <lazy-tree-table />
        </a-card>
    </div>
</template>
<script>
import { defineComponent, reactive ,ref,computed,} from 'vue';
import { useI18n } from 'vue-i18n';
import LazyTreeTable from './components/lazy-tree-table.vue';

export default defineComponent({
    name: 'Channel',
    components:{LazyTreeTable},
    setup() {

        return {
        
        };
    }
});
</script>
