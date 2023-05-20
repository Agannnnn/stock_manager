<script setup lang="ts">
import { ref } from "vue";
import { Items } from "../../model";
import Button from "./Button.vue";
import Form from "./Form.vue";

const props = defineProps<{ item?: Items }>();
const emits = defineEmits(["closeForm"]);

const newQty = ref(1);

const restock = async () => {
  if (
    await await (window as any).db.restockItem({ ...props.item }, newQty.value)
  )
    emits("closeForm");
};

if (!props.item) emits("closeForm");
</script>

<template>
  <Form @close-form="$emit('closeForm')">
    <form
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg border-2 border-primary"
      @submit.prevent="restock"
    >
      <div class="text-primary font-medium flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <label for="select-item">ITEM</label>
          <input
            type="text"
            :value="item?.code"
            class="border-2 border-primary rounded-md p-2 bg-gray-200 text-gray-500"
            readonly
            disabled
          />
        </div>
        <div class="flex flex-row items-center gap-3">
          <div class="flex flex-col gap-1">
            <label for="item-current-qty">TERSEDIA</label>
            <input
              type="number"
              id="item-current-qty"
              :value="item?.qty"
              class="border-2 border-primary rounded-md p-2 bg-gray-200 text-gray-500"
              readonly
              disabled
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-restock-qty">MASUK</label>
            <input
              type="number"
              id="item-restock-qty"
              v-model="newQty"
              placeholder="MASUKAN QTY MASUK"
              class="border-2 border-primary rounded-md p-2"
              required
              min="1"
            />
          </div>
        </div>
        <div class="flex flex-row justify-end gap-2 mt-2">
          <Button type="reset" alert @click="$emit('closeForm')">
            BATAL
          </Button>
          <Button type="submit" warning> SIMPAN </Button>
        </div>
      </div>
    </form>
  </Form>
</template>
