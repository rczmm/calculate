<script lang="ts" setup>
import {RouterView} from 'vue-router';
</script>

<template>
  <el-watermark :font="font" content="xf">
    <div class="text-center" id="root">
      <RouterView></RouterView>
    </div>
  </el-watermark>
</template>
