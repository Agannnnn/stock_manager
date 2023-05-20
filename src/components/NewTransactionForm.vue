<script setup lang="ts">
import { ref } from "vue";
import { Items, Transactions } from "../../model";
import Button from "./Button.vue";
import Form from "./Form.vue";

const props = defineProps<{ item?: Items }>();
const emits = defineEmits(["closeForm"]);

const qty = ref(1);
const customerName = ref("");
const customerPhone = ref("");
const customerAddress = ref("");

const saveTransaction = async () => {
  const transaction: Transactions = {
    item: props.item!.code,
    qty: qty.value,
    cust_name: customerName.value,
    cust_phone: customerPhone.value,
    cust_address: customerAddress.value,
    type: "Sell",
  };
  await (window as any).db.saveTransaction(transaction);
  emits("closeForm");
};

if (!props.item?.code) emits("closeForm");
</script>

<template>
  <Form>
    <form
      @submit.prevent="saveTransaction"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg border-2 border-primary"
    >
      <div class="text-primary font-medium flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <label for="select-item">ITEM</label>
          <input
            type="text"
            class="border-2 border-primary rounded-md p-2 bg-gray-200 text-gray-500"
            :value="item?.code"
            readonly
            disabled
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col gap-1">
            <label for="select-item">TERSEDIA (box)</label>
            <input
              type="number"
              class="border-2 border-primary rounded-md p-2 bg-gray-200 text-gray-500"
              :value="item?.qty"
              readonly
              disabled
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="transaction-qty">JUMLAH DIBELI (box)</label>
            <input
              min="1"
              :max="item?.qty"
              type="number"
              id="transaction-qty"
              placeholder="MASUKAN JUMLAH PENJUALAN"
              class="border-2 border-primary rounded-md p-2"
              v-model="qty"
              required
            />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label for="transaction-buyer-name">NAMA PEMBELI</label>
          <input
            type="text"
            id="transaction-buyer-name"
            placeholder="MASUKAN NAMA PEMBELI"
            class="border-2 border-primary rounded-md p-2"
            v-model="customerName"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="transaction-buyer-phone">NOMOR TELEPON PEMBELI</label>
          <input
            type="tel"
            id="transaction-buyer-phone"
            placeholder="MASUKAN NOMOR TELEPON PEMBELI"
            class="border-2 border-primary rounded-md p-2"
            v-model="customerPhone"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="transaction-buyer-address">ALAMAT PEMBELI</label>
          <textarea
            rows="3"
            id="transaction-buyer-address"
            placeholder="MASUKAN ALAMAT PEMBELI"
            class="border-2 border-primary rounded-md p-2"
            v-model="customerAddress"
          ></textarea>
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
