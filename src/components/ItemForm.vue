<script setup lang="ts">
import { ref, watch } from "vue";
import { Items } from "../../model";
import Button from "./Button.vue";
import Form from "./Form.vue";

const props = defineProps<{ item?: Items }>();
const emits = defineEmits(["closeForm"]);

const inputCode = ref(props.item?.code ?? "");
const inputName = ref(props.item?.name ?? "");
const inputImage = ref<File | null>(null);
const inputQty = ref(props.item?.qty ?? 1);
const inputPrice = ref(props.item?.price ?? 1);
const inputCategories = ref(props.item?.categories ?? "");
const imagePreview = ref(props.item?.image ?? "");

watch(inputImage, (image) => {
  URL.revokeObjectURL(imagePreview.value);
  if (image) {
    imagePreview.value = URL.createObjectURL(image);
    return;
  }
  imagePreview.value = "";
});

const handleUploadFile = (e: Event) => {
  const uploadedFile = (e.target as HTMLInputElement).files;
  if (uploadedFile?.length == 0) {
    inputImage.value = null;
    return;
  }
  inputImage.value = (e.target as HTMLInputElement).files![0] as File;
};

const saveForm = async () => {
  if (props.item?.code == null) {
    const item: Items = {
      code: inputCode.value,
      name: inputName.value,
      image: inputImage.value!.name,
      qty: inputQty.value,
      price: inputPrice.value,
      categories: inputCategories.value,
    };
    if (await (window as any).db.saveItem(item, inputImage.value))
      emits("closeForm");
    return;
  }
  const item: Items = {
    code: props.item?.code,
    name: inputName.value,
    image: inputImage.value!.name,
    qty: inputQty.value,
    price: inputPrice.value,
    categories: inputCategories.value,
  };
  if (await (window as any).db.updateItem(item, inputImage.value))
    emits("closeForm");
};
</script>

<template>
  <Form @close-form="$emit('closeForm')">
    <form
      @submit.prevent="saveForm"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg border-2 border-primary"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col justify-between items-start gap-4">
          <img :src="imagePreview" class="rounded-md" />
          <input
            @change="handleUploadFile"
            required
            type="file"
            class="py-1 file:px-2 file:border-2 file:border-primary file:rounded-md file:bg-warning file:text-primary file:text-lg file:font-semibold file:hover:-translate-y-1 file:shadow-sm file:shadow-primary"
          />
        </div>
        <div class="text-primary font-medium flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <label for="item-code">KODE ITEM</label>
            <input
              v-model="inputCode"
              required
              type="text"
              id="item-code"
              placeholder="MASUKAN KODE ITEM"
              class="border-2 border-primary rounded-md p-2 read-only:bg-gray-100 read-only:text-gray-400"
              :readonly="item?.code ? true : false"
              :disabled="item?.code ? true : false"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-name">NAMA ITEM</label>
            <input
              v-model="inputName"
              required
              type="text"
              id="item-name"
              placeholder="MASUKAN NAMA ITEM"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-qty">QTY</label>
            <input
              v-model="inputQty"
              required
              type="number"
              id="item-qty"
              min="1"
              placeholder="20"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-harga">HARGA</label>
            <input
              v-model="inputPrice"
              required
              type="number"
              id="item-price"
              min="1"
              placeholder="20000"
              class="border-2 border-primary rounded-md p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="item-categories">KATEGORI ITEM</label>
            <textarea
              v-model="inputCategories"
              required
              type="text"
              id="item-categories"
              rows="2"
              placeholder="KATEGORI 1, KATEGORI 2, KATEGORI 3, ..."
              class="border-2 border-primary rounded-md p-2"
            ></textarea>
          </div>
          <div class="flex flex-row justify-end gap-2 mt-2">
            <Button alert type="reset" @click="$emit('closeForm')">
              BATAL
            </Button>
            <Button warning type="submit"> SIMPAN </Button>
          </div>
        </div>
      </div>
    </form>
  </Form>
</template>
