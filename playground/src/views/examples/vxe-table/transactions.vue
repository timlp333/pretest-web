<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getCustomerTransApi } from '#/api';

interface RowType {
  email: string;
  id: string;
  name: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: 'Name',
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: 'Email',
    },
    {
      component: 'DatePicker',
      fieldName: 'startDate',
      label: 'Start Date',
    },
    {
      component: 'DatePicker',
      fieldName: 'endDate',
      label: 'End Date',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
};

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { title: 'No.', type: 'seq', width: 50 },
    {
      field: 'name',
      title: 'Name',
    },
    // { field: 'email', title: 'Email' },
    // {
    //   field: 'registration_date',
    //   formatter: 'formatDateTime',
    //   title: 'Registration Date',
    // },
    { field: 'amount', title: 'Amount' },
    {
      field: 'transaction_date',
      formatter: 'formatDateTime',
      title: 'Transactions Date',
    },
    {
      field: 'transaction_number',
      title: 'Times',
    },
  ],
  // height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        // message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await getCustomerTransApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    isHover: true,
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Page auto-content-height>
    <Grid />
  </Page>
</template>
