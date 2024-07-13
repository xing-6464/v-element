<script setup>
import { reactive } from 'vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
const model = reactive({
  email: '',
  password: '',
  test: ''
})

const rules = {
  email: [
    { type: 'email', required: true, trigger: 'blur' },
    { type: 'string', required: true, trigger: 'input' }
  ],
  test: [{ type: 'string', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur', min: 3, max: 5 }]
}
</script>

<template>
  <div>
    <Form :model="model" :rules="rules">
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
        <Button type="primary">Submit</Button>
        <Button>Reset</Button>
      </div>
    </Form>
  </div>
  <p>
    form model:
    {{ model }}
  </p>
</template>
