import Vue from 'vue';
import AuthTag from '@/components/Auth/AuthTag';
import StatusView from '@/components/StatusView';
import TableException from '@/components/Empty/TableException';
import NmColumn, { defaultHeadRender } from '@/components/NmColumn';

Vue.component('AuthTag', AuthTag);
Vue.component('StatusView', StatusView);
Vue.component('TableException', TableException);
Vue.component('NmColumn', NmColumn);

Vue.prototype.$defaultThead = defaultHeadRender;
