<template>
  <div class="test-paper-one base-box">
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
    <div class="left"></div>
    <div class="right">
      <div class="paper">
        <!-- <div v-for="(item, key) in subjectOneList" :key="key" v-html="item"></div> -->

        <div>
          <div class="item" v-for="i in 24" :key="i" v-html="subjectOne()"></div>
        </div>
        <div>
          <div class="item" v-for="i in 24" :key="i" v-html="subjectOne()"></div>
        </div>
        <div>
          <div class="item" v-for="i in 24" :key="i" v-html="subjectOne()"></div>
        </div>
        <div>
          <div class="item" v-for="i in 24" :key="i" v-html="subjectOne()"></div>
        </div>
        <div>
          <div class="item" v-for="i in 10" :key="i" v-html="subjectOne()"></div>
          <div class="item">
            <span class="iconfont icon-yuanquanweixuanfuben"></span>
            填&#62;、&#60;、&#61;
          </div>
          <div class="item" v-for="i in 13" :key="i" v-html="subjectTwo()"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Select } from "ant-design-vue";
import AdditionAndSubtraction from "@/components/AdditionAndSubtraction.vue";

@Component({
  name: "TestPaperOne",
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AdditionAndSubtraction: AdditionAndSubtraction
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
  private subjectOneList: string[] = [];

  // 几以内的运算
  private max = 10;

  created() {
    // this.generate();
    this.subjectOne();
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
    // console.log("+++++++++++");
    // console.log(formula);
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
    // console.log("---------");
    // console.log(formula);
    return formula;
  }

  /**
   * 加减混合运算
   */
  mixedComputing() {
    // 第一个运算符
    const operatorA = this.type[this.$utils.random(0, 1)];
    const a = operatorA === "+" ? this.addition() : this.subtraction();

    // 第二个运算符
    const operatorB = this.type[this.$utils.random(0, 1)];
    const b = operatorB === "+" ? this.addition(a.result) : this.subtraction(a.result);

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
    console.log(a, b);

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
    const typeIndex: number = this.$utils.random(0, 2);
    switch (this.type[typeIndex]) {
      case "+":
        _return = this.addition().anwser.join("");
        break;
      case "-":
        _return = this.subtraction().anwser.join("");
        break;
      case "+-":
        _return = this.mixedComputing().anwser.join("");
        break;
    }
    return _return;
  }

  /**
   * 加减运算比大小
   */
  subjectTwo() {
    let _return = "";
    let typeIndex: number;
    for (let i = 0; i < 2; i++) {
      typeIndex = this.$utils.random(0, 2);
      if (_return) {
        _return += "&nbsp;<span class='iconfont icon-yuanquanweixuanfuben'></span>&nbsp;";
      }
      switch (this.type[typeIndex]) {
        case "+":
          _return += this.addition().formula.join("");
          break;
        case "-":
          _return += this.subtraction().formula.join("");
          break;
        case "+-":
          _return += this.mixedComputing().formula.join("");
          break;
      }
    }

    return _return;
  }
  /**
   * 生成算式
   */
  generate() {
    let n: number;
    let log: any;

    for (let j = 0; j < 100; j++) {
      log = {};
      for (let i = 0; i < 100; i++) {
        n = this.$utils.random(0, 2);

        log[n] = log[n] ? log[n] + 1 : 1;
      }
      console.log(log);
    }
  }
}
</script>

<style lang="scss" scoped>
.test-paper-one {
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
      height: 39px;
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
    font-size: 17px;

    .header {
      .title-1 {
        // padding-top: 0;
      }
    }
  }
}
</style>
