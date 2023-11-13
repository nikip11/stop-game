import { FormInputs } from '@/types';
import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    fields: {}
  }),
  actions: {
    setFields(fields: FormInputs) {
      this.fields = fields;
    }
  },
  getters: {
    getFields(): FormInputs {
      return this.fields
    }
  }
});
