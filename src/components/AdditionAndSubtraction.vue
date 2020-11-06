<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";

export default class AdditionAndSubtraction extends Vue {
  /**
   * 是否连加连减
   * 0: 不是连加连减
   * 1: 连加连减
   * 3: 混合
   */
  @Prop({ default: 0 }) public multiple!: common.Multiple;

  // 几以内运算
  @Prop({ default: 10 }) public max!: number;

  created() {
    console.log(12);
  }
}
</script>
