<template>
  <div class="test-paper-one base-box">
    <div class="left">
      <div>
        <div>几以内</div>
        <a-select v-model="max" class="select-one">
          <a-select-option value="10">10</a-select-option>
          <a-select-option value="100">100</a-select-option>
          <a-select-option value="1000">1000</a-select-option>
        </a-select>
      </div>
      <div>
        <div>运算类型</div>
        <a-select mode="multiple" v-model="ttypeValue" :options="ttype" class="select-one"></a-select>
      </div>
      <div>
        <div>连加连减</div>
        <a-select v-model="multipleValue" :options="multiple" class="select-one"></a-select>
      </div>
      <div class="btn-div">
        <a-button type="primary" @click="createSubject">生成</a-button>
      </div>
    </div>
    <div class="right">
      <div class="header">
        <div class="title-1">一年级口算比赛练习</div>
        <div class="title-2">
          <div>
            <span>班级</span>
            <span class="line"></span>
          </div>
          <div>
            <span>姓名</span>
            <span class="line"></span>
          </div>
          <div>
            <span>得分</span>
            <span class="line"></span>
          </div>
        </div>
      </div>
      <div class="paper">
        <div>
          <template v-for="(item, key) in subjectList">
            <div v-if="key <= 23" class="item" :key="key" v-html="item"></div>
          </template>
        </div>

        <div>
          <template v-for="(item, key) in subjectList">
            <div v-if="key > 23 && key <= 47" class="item" :key="key" v-html="item"></div>
          </template>
        </div>

        <div>
          <template v-for="(item, key) in subjectList">
            <div v-if="key > 47 && key <= 71" class="item" :key="key" v-html="item"></div>
          </template>
        </div>

        <div>
          <template v-for="(item, key) in subjectList">
            <div v-if="key > 71 && key <= 95" class="item" :key="key" v-html="item"></div>
          </template>
        </div>

        <div>
          <template v-for="(item, key) in subjectList">
            <div v-if="key > 95 && key <= 105" class="item" :key="key" v-html="item"></div>
          </template>
          <div class="item">
            <span class="iconfont icon-yuanquanweixuanfuben"></span>
            填&#62;、&#60;、&#61;
          </div>
          <template v-for="(item, key) in subjectList">
            <div v-if="key > 105 && key <= 119" class="item" :key="key" v-html="item"></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Select, Input, Button, Radio } from "ant-design-vue";
import AdditionAndSubtraction from "@/components/AdditionAndSubtraction.vue";
// import { RadioGroup } from "ant-design-vue/types/radio/radio-group";

@Component({
  name: "TestPaperOne",
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AdditionAndSubtraction: AdditionAndSubtraction,
    AInput: Input,
    AButton: Button,
    ARadio: Radio,
    ARadioGroup: Radio.Group
  }
})
export default class TestPaperOne extends Vue {
  /**
   * 算式类型
   * +：加法运算
   * -：减法运算
   * +-：加减混合运算
   */
  private type = ["+", "-", "+-"];

  // 加减运算
  private subjectList: string[] = [];

  // 几以内的运算
  private max = 10;

  private ttype = [
    { label: "加法", value: "+" },
    { label: "减法", value: "-" }
  ];
  private ttypeValue: string[] = ["+", "-"];

  /**
   * 是否有连加连减
   */
  private multiple = [
    { label: "没有", value: 0 },
    { label: "有", value: 1 },
    { label: "全部", value: 2 }
  ];
  private multipleValue = 1;

  created() {
    this.createSubject();
  }

  /**
   * 简单加法
   * @return {string}
   */
  addition(first?: number) {
    const a = first !== void 0 ? first : this.$utils.random(0, this.max);
    const b = this.$utils.random(0, this.max - a);
    const result = a + b;
    const random = this.$utils.random(0, 11) % 3;
    const equation = [a, "+", b, "=", result];
    const anwser = Array.from(equation);
    if (random === 0) {
      anwser[0] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    } else if (random === 1) {
      anwser[2] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    } else {
      anwser[4] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    }

    const formula = {
      number1: a,
      number2: b,
      operator: "+",
      result: result,
      formula: [a, "+", b],
      equation: equation,
      anwser: anwser
    };
    return formula;
  }

  /**
   * 简单减法，如6-3
   * @return {string}
   */
  subtraction(first?: number) {
    const [a, b] = [
      first !== void 0 ? first : this.$utils.random(0, this.max),
      this.$utils.random(0, first !== void 0 ? first : this.max)
    ];
    const [c, d] = [a > b ? a : b, a > b ? b : a];
    const result = c - d;

    const random = this.$utils.random(0, 11) % 3;
    const equation = [c, "-", d, "=", result];
    const anwser = Array.from(equation);
    if (random === 0) {
      anwser[0] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    } else if (random === 1) {
      anwser[2] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    } else {
      anwser[4] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    }

    const formula = {
      number1: a,
      number2: b,
      operator: "-",
      result: result,
      formula: [c, "-", d],
      equation: equation,
      anwser: anwser
    };
    return formula;
  }

  /**
   * 加减混合运算
   */
  mixedComputing() {
    let a: any, b: any;

    if (this.ttypeValue.length === 1) {
      if (this.ttypeValue.find(item => item === "+")) {
        a = this.addition();
        b = this.addition(a.result);
      } else {
        a = this.subtraction();
        b = this.subtraction(a.result);
      }
    } else {
      a = this.isAdditionSubject() ? this.addition() : this.subtraction();
      b = this.isAdditionSubject() ? this.addition(a.result) : this.subtraction(a.result);
    }

    const _formula = Array.from(b.formula);
    _formula.splice(0, 1, ...a.formula);

    const random = this.$utils.random(0, 11) % 4;
    const equation = [..._formula, "=", b.result];
    const anwser = Array.from(equation);
    if (random === 0) {
      anwser[0] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    } else if (random === 1) {
      anwser[2] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    } else if (random === 2) {
      anwser[4] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    } else {
      anwser[6] = "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)";
    }

    const formula = {
      number1: a.number1,
      number2: a.number2,
      number3: b.number2,
      operator: "+-",
      result: b.result,
      formula: _formula,
      equation: equation,
      anwser: anwser
    };

    return formula;
  }

  /**
   * 加减运算
   */
  subjectOne() {
    let _return = "";
    if ((this.multipleValue === 1 && this.isMultipleSubject()) || this.multipleValue === 2) {
      _return = this.mixedComputing().anwser.join("");
    } else if (this.ttypeValue.length === 1) {
      if (this.ttypeValue.find(item => item === "+")) {
        _return = this.addition().anwser.join("");
      } else {
        _return = this.subtraction().anwser.join("");
      }
    } else if (this.isAdditionSubject()) {
      _return = this.addition().anwser.join("");
    } else {
      _return = this.subtraction().anwser.join("");
    }
    return _return;
  }

  /**
   * 加减运算比大小
   */
  subjectTwo() {
    let _return = "";
    for (let i = 0; i < 2; i++) {
      if (_return) {
        _return += "&nbsp;<span class='iconfont icon-yuanquanweixuanfuben'></span>&nbsp;";
      }

      if ((this.multipleValue === 1 && this.isMultipleSubject()) || this.multipleValue === 2) {
        _return += this.mixedComputing().formula.join("");
      } else if (this.ttypeValue.length === 1) {
        if (this.ttypeValue.find(item => item === "+")) {
          _return += this.addition().formula.join("");
        } else {
          _return += this.subtraction().formula.join("");
        }
      } else if (this.isAdditionSubject()) {
        _return += this.addition().formula.join("");
      } else {
        _return += this.subtraction().formula.join("");
      }
    }

    return _return;
  }
  /**
   * 生成算式
   */
  createSubject() {
    this.subjectList = [];
    for (let i = 0; i < 106; i++) {
      this.subjectList.push(this.subjectOne());
    }

    for (let i = 0; i < 13; i++) {
      this.subjectList.push(this.subjectTwo());
    }
  }

  /**
   * 随机一个数，小于5生成加法题目，反之减法题目
   */
  isAdditionSubject() {
    const _return = this.$utils.random(0, 9);
    return _return < 5;
  }

  /**
   * 随机一个数，判断是否生成连加连减题目
   */
  isMultipleSubject() {
    const _return = this.$utils.random(0, 2);
    return _return === 2;
  }
}
</script>

<style lang="scss" scoped>
.test-paper-one {
  display: flex;
  .select-one {
    width: 100%;
  }
  .left {
    margin-right: 16px;
    padding: 8px;
    margin-top: 16px;
    border: 1px solid #666666;
    width: 230px;

    .btn-div {
      text-align: center;
    }

    & > div {
      margin-bottom: 16px;
    }
  }
  .right {
    flex: 1;
  }
  .header {
    margin-bottom: 8px;
    .title-1 {
      font-size: 26px;
      text-align: center;
      padding: 10px;
    }

    .title-2 {
      display: flex;
      justify-content: center;

      & > div {
        width: 150px;
        display: flex;
        margin-right: 48px;
      }

      .line {
        border-bottom: 1px solid #000;
        flex: 1;
      }
    }
  }

  .paper {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #333333;
    & > div {
      width: 20%;
      text-align: center;
      &:last-child {
        .item {
          border-right: 0;
        }
      }
    }
    .item {
      display: flex;
      align-items: center;
      // justify-content: center;
      padding-left: 6px;
      height: 37px;
      border-bottom: 1px solid #333333;
      border-right: 1px solid #333333;
      &:last-child {
        border-bottom: 0;
      }
    }
    ::v-deep.icon-yuanquanweixuanfuben {
      font-size: 22px;
    }
  }
}

@media print {
  .test-paper-one {
    font-size: 16px;

    .left {
      display: none;
    }

    .header {
      .title-1 {
        padding-top: 0;
      }
    }
  }
}
</style>
