<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { createCustomerApi } from '#/api';

const [Form, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: 'Please enter name',
      },
      // 字段名
      fieldName: 'name',
      // 界面显示的label
      label: 'Name',
      rules: z.string().min(3, { message: 'Length need to longer than 3' }),
    },
    {
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: 'your@email.com',
      },
      // 字段名
      fieldName: 'email',
      // 界面显示的label
      label: 'Email',
      rules: z.string().email('Please enter right email format'),
    },
    // {
    //   component: 'Input',
    //   componentProps: {
    //     placeholder: '请输入',
    //   },
    //   fieldName: 'input-async',
    //   label: '异步校验',
    //   rules: z
    //     .string()
    //     .min(3, '用户名至少需要3个字符')
    //     .refine(
    //       async (username) => {
    //         // 假设这是一个异步函数，模拟检查用户名是否已存在
    //         const checkUsernameExists = async (
    //           username: string,
    //         ): Promise<boolean> => {
    //           await new Promise((resolve) => setTimeout(resolve, 1000));
    //           return username === 'existingUser';
    //         };
    //         const exists = await checkUsernameExists(username);
    //         return !exists;
    //       },
    //       {
    //         message: '用户名已存在',
    //       },
    //     ),
    // },
  ],
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

async function onSubmit(values: Record<string, any>) {
  await createCustomerApi(values);
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Page title="Create Customer">
    <Card>
      <template #extra>
        <Button @click="() => formApi.validate()">Check</Button>
        <Button class="mx-2" @click="() => formApi.resetValidate()">
          Reset
        </Button>
      </template>
      <Form />
    </Card>
  </Page>
</template>
