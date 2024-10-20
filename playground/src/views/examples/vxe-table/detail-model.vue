<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getTransPastYearApi } from '#/api';

const data = ref();

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onConfirm() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      data.value = modalApi.getData<Record<string, any>>();
    }
  },
});
interface RowType {
  email: string;
  id: string;
  name: string;
}
const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { title: 'No.', type: 'seq', width: 50 },
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
  keepSource: true,
  pagerConfig: false,
  proxyConfig: {
    ajax: {
      query: async () => {
        return await getTransPastYearApi({
          id: data.value.id,
        });
      },
    },
    data: ref(),
  },
};
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });
</script>
<template>
  <Modal title="Transaction in one year">
    <div class="flex-col-center"></div>
    <Grid />
  </Modal>
</template>
