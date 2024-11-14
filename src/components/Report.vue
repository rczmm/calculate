<script lang="ts" setup>
import {useRouter} from 'vue-router';

import useQuestionStore from '@/store/question';
import type {Milliseconds} from '@/util';

import QuestionDisplay from './report/QuestionDisplay.vue';

const router = useRouter();


const {
  questions,
  questionProvider,
  correctCnt,
  accumulatedDuration,
  wrongAnswerCnt
} = useQuestionStore(); // These shouldn't be changed when reporting

if (questions.length === 1) {
  go_to_main_page();
}

const
    title: string = questionProvider.get_title(),
    generatedTime: Date = new Date(),
    generatedTimeDisplay = generatedTime.toLocaleString(),
    totalQuestions: number = questions.length - 1,
    correctRate: number = correctCnt / (totalQuestions || 1),
    correctRateDisplay: string = (correctRate * 100).toFixed(1) + "%",
    avgDuration: Milliseconds = accumulatedDuration / (totalQuestions || 1);

function go_to_main_page() {
  router.push("/welcome");
}

function go_to_share() {
  router.push("/report-share");
}

</script>

<template>
  <div class=" report pt-2">
    <el-card class="my-4">
      <div class="text-2xl my-2">成绩单 - {{ title }}</div>
      <el-steps
          class="mb-4"
          style="max-width: 1000px"
          :active="1"
          align-center>
        <el-step title="生成时间" :description="generatedTimeDisplay"/>
        <el-step title="正确率(%)" :description="`${correctCnt} / ${totalQuestions} (${correctRateDisplay})`"/>
        <el-step title="错误次数(次)" :description="wrongAnswerCnt"/>
        <el-step title="总计用时(ms)" :description="accumulatedDuration"/>
        <el-step title="题均用时(ms)" :description="avgDuration"/>
      </el-steps>
    </el-card>


    <div
        class="mt-4 mx-12 flex flex-wrap content-center justify-center items-center gap-x-6 gap-y-2">
      <QuestionDisplay v-for="(question, i) in questions.slice(0,-1)" :key="i" :question="question" :i="i">
      </QuestionDisplay>
    </div>
    <div class="mt-8">
      <button class="btn bg-gray-700 mr-4" type="button" @click="go_to_main_page">返回主页</button>
      <button class="btn bg-green-500" type="button" @click="go_to_share">分享</button>
    </div>
  </div>
</template>

<style lang="scss">
.report .report-item {
  @apply w-max mx-auto bg-gray-50 text-lg flex;

  > span {
    @apply inline-block border-2 border-black -ml-0.5 -mt-0.5;

    &:nth-child(1) {
      @apply w-24;
    }

    &:nth-child(2) {
      @apply w-64 text-blue-700;
    }
  }
}
</style>