<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteExampleTableApi,
  getExampleTableApi,
  saveExampleTableApi,
} from '#/api';

import SharedDataDemo from './detail-model.vue';

interface RowType {
  email: string;
  id: string;
  name: string;
}
const [SharedDataModal, sharedModalApi] = useVbenModal({
  connectedComponent: SharedDataDemo,
});
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
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
};

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { title: 'No.', type: 'seq', width: 50 },
    {
      editRender: { name: 'input' },
      field: 'name',
      title: 'Name',
    },
    { editRender: { name: 'input' }, field: 'email', title: 'Email' },
    {
      field: 'registration_date',
      formatter: 'formatDateTime',
      title: 'Date',
    },
    { slots: { default: 'action' }, title: 'Action' },
  ],
  editConfig: {
    mode: 'row',
    trigger: 'click',
  },
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        // message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await getExampleTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
function hasEditStatus(row: RowType) {
  return gridApi.grid?.isEditByRow(row);
}

function editRowEvent(row: RowType) {
  gridApi.grid?.setEditRow(row);
}
async function deleteRowEvent(row: RowType) {
  gridApi.setLoading(true);
  await deleteExampleTableApi({
    id: row.id,
  });
  message.success(`Success`);
  // Fetch fresh data
  gridApi.reload();
  gridApi.setLoading(false);
}
async function saveRowEvent(row: RowType) {
  await gridApi.grid?.clearEdit();

  gridApi.setLoading(true);
  await saveExampleTableApi({
    email: row.email,
    id: row.id,
    name: row.name,
  });
  setTimeout(() => {
    gridApi.setLoading(false);
    message.success({
      content: `Success`,
    });
  }, 100);
}

const cancelRowEvent = (_row: RowType) => {
  gridApi.grid?.clearEdit();
};

function openModal(_row: RowType) {
  sharedModalApi.setData({
    id: _row.id,
  });
  sharedModalApi.open();
}
</script>

<template>
  <Page auto-content-height>
    <SharedDataModal />
    <Grid>
      <template #action="{ row }">
        <template v-if="hasEditStatus(row)">
          <Button type="link" @click="saveRowEvent(row)">Save</Button>
          <Button type="link" @click="cancelRowEvent(row)">Cancel</Button>
        </template>
        <template v-else>
          <Button type="link" @click="editRowEvent(row)">Edit</Button>
          <Button type="dashed" @click="deleteRowEvent(row)">Delete</Button>
          <Button type="primary" @click="openModal(row)">Detail</Button>
        </template>
      </template>
    </Grid>
  </Page>
</template>
