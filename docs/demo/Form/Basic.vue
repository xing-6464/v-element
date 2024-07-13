<script setup>
import { reactive, ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
const formRef = ref()
const model = reactive({
  email: '123',
  password: '12',
  test: ''
})

const rules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  test: [{ type: 'string', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur', min: 3, max: 5 }]
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('submit')
  } catch (e) {
    console.log('error', e)
  }
}
const reset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="the email" prop="email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem label="the testValue" prop="test">
        <template #default="{ validate }">
          <input type="text" v-model="model.test" @blur="validate" />
        </template>
      </FormItem>
      <FormItem label="the password" prop="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input type="password" v-model="model.password" />
      </FormItem>
      <div>
        <Button type="primary" @click.prevent="submit">Submit</Button>
        <Button @click.prevent="reset">Reset</Button>
      </div>
    </Form>
  </div>
  <p>
    form model:
    {{ model }}
  </p>
</template>
