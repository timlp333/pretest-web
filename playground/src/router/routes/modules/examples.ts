import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ion:layers-outline',
      keepAlive: true,
      order: 1000,
      title: $t('page.examples.title'),
    },
    name: 'Examples',
    path: '/examples',
    children: [
      {
        name: 'VxeTableFormExample',
        path: '/examples/vxe-table/form',
        component: () => import('#/views/examples/vxe-table/form.vue'),
        meta: {
          title: $t('Customers'),
        },
      },
      {
        name: 'transactions',
        path: '/examples/vxe-table/transactions',
        component: () => import('#/views/examples/vxe-table/transactions.vue'),
        meta: {
          title: $t('Transactions'),
        },
      },
      {
        name: 'CreateCustomer',
        path: '/examples/vxe-table/createCustomer',
        component: () =>
          import('#/views/examples/vxe-table/createCustomer.vue'),
        meta: {
          title: $t('Create Customer'),
        },
      },
    ],
  },
];

export default routes;
