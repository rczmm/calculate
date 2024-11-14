<script lang="ts" setup>
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import Message from 'vue-m-message';

import {CATEGORIES, CategoryId} from '@/question';
import useQuestionStore from '@/store/question';
import useSettingStore from '@/store/setting';

import ParamItem from './ParamItem.vue';
const
    question = useQuestionStore(),
    setting = useSettingStore();

console.log("1111")

const
    router = useRouter(),
    paramsConfig = computed(() => {
      return question.questionModule.paramsConfig;
    });

function go_to_mistakes_collection() {
  router.push("/mistakes-collection");
}

function submit_form(ev: Event): void {
  const data = new FormData(ev.target as HTMLFormElement);
  if (data.get("category") === CategoryId.Null) {
    Message.warning("请选择类别");
    return;
  }
  let params: string[] = new Array(paramsConfig.value.length);
  data.forEach((value, key) => {
    if (key.startsWith("param-"))
      params[parseInt(key.substring("param-".length))] = value as string;
  });
  router.push(`/exercise/${setting.categoryId}/${params.join(',')}/${setting.quantity}`);
}

function change_category(ev: Event) {
  setting.categoryIdManager.set((ev.target as HTMLSelectElement).value);
}

function change_quantity(ev: Event) {
  setting.quantityManager.set((ev.target as HTMLInputElement).value);
}

function change_avoid_repeat(ev: Event) {
  setting.avoidRepeatManager.set((ev.target as HTMLSelectElement).value);
}

function change_generate_at_once(ev: Event) {
  setting.generateAtOnceManager.set((ev.target as HTMLSelectElement).value);
}

</script>

<template>
  <el-watermark :font="font" content="xf">
    <div class="welcome pt-8 sm:pt-0">
      <el-button color="#626aef" :dark="isDark"
                 class=" absolute left-4 top-4"
                 @click="go_to_mistakes_collection">错题本
      </el-button>

      <h2 class="text-2xl font-bold py-4">欢迎来到口算练习</h2>
      <el-form class="w-max mx-auto text-lg" @submit.prevent="submit_form">
        <el-form-item label="类别">
          <el-select v-model="setting.categoryId" @change="change_category">
            <el-option
                v-for="category in CATEGORIES"
                :key="category.id"
                :label="category.desc"
                :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题数">
          <el-input
              v-model.number="setting.quantity"
              type="number"
              required
              min="1"
              step="1"
              placeholder="练习题数..."
              @change="change_quantity"
          ></el-input>
        </el-form-item>
        <el-form-item label="避免重复题">
          <el-select
              v-model="setting.avoidRepeat"
              @change="change_avoid_repeat"
              placeholder="尽量避免"
          >
            <el-option value="true" label="尽量避免"></el-option>
            <el-option value="false" label="不避免"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生成题目">
          <el-select v-model="setting.generateAtOnce" @change="change_generate_at_once">
            <el-option value="false" label="答题时生成"></el-option>
            <el-option value="true" label="开始时立即生成"></el-option>
          </el-select>
        </el-form-item>
        <hr class="my-2 h-1">
        <ParamItem
            v-for="(config, i) in paramsConfig"
            :key="`${setting.categoryId}-${i}`"
            :i="i"
            :config="config"
            :default="setting.params.length > i ? setting.params[i] : undefined"
        />
        <el-divider />
        <div class="text-right relative left-4 top-4">
          <el-button color="#626aef" :dark="isDark" type="primary" native-type="submit">开始练习</el-button>
        </div>
      </el-form>
    </div>
  </el-watermark>
</template>

<style lang="scss">
.welcome {
  .param-item {
    @apply w-fit;

    > label {
      @apply text-left block w-fit;
    }

    > span {
      @apply block;
    }

    input,
    select {
      @apply w-64 text-xl inline-block border border-gray-300 px-2 rounded;
    }
  }
}
</style>
