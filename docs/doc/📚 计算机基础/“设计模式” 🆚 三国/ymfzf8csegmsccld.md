---
title: 诸葛亮的锦囊妙计 - 策略模式
urlname: ymfzf8csegmsccld
date: "2024-07-05 11:00:02"
updated: "2024-07-05 11:30:33"
cover: "https://cdn.nlark.com/yuque/__mermaid_v3/e83b3d3a6dd9f3f8fd4293cf1e31b68a.svg"
description: '"当代码如三国，智慧如孔明，何愁天下设计不归一统？"乱世之中，英雄辈出。三国的战场上，不仅刀光剑影，更有智慧的较量。诸葛亮的锦囊妙计，不正是今日软件设计中策略模式的完美写照吗？让我们穿越时空，从一场惊心动魄的草船借箭开始，揭开策略模式的神秘面纱。赤壁江边战鼓鸣，孔明妙计借东风。三个锦囊藏妙算，...'
---

> "当代码如三国，智慧如孔明，何愁天下设计不归一统？"

乱世之中，英雄辈出。三国的战场上，不仅刀光剑影，更有智慧的较量。诸葛亮的锦囊妙计，不正是今日软件设计中策略模式的完美写照吗？让我们穿越时空，从一场惊心动魄的草船借箭开始，揭开策略模式的神秘面纱。

> 赤壁江边战鼓鸣，
> 孔明妙计借东风。
> 三个锦囊藏妙算，
> 草船借箭显神通。

## 草船借箭

江面上，浓雾弥漫。一支奇怪的船队缓缓驶来，船上不见一个士兵，只有稻草扎成的人偶随风摇晃。站在船头的，是一位手摇羽扇、神情自若的年轻文士——诸葛亮。
"军师，这真的能行吗？"刘备担忧地问道。
诸葛亮微微一笑，"主公放心，三个锦囊在此，万无一失。"
第一个锦囊打开：摆草船、张白帆。
大船缓缓驶近曹营，雾气中忽隐忽现的白帆引起了曹军的注意。
"敌袭！"曹营中一片惊呼。
"放箭！"曹操一声令下，万箭齐发。
诸葛亮打开第二个锦囊：鸣锣击鼓。
船上顿时锣鼓喧天，喊杀声四起，仿佛千军万马正在进攻。曹军更加惊慌，箭如雨下。
"军师，船上的箭够多了，我们该撤了！"周瑜急切地说。
诸葛亮悠然打开第三个锦囊：快速撤退。
船队迅速掉头，在曹军还没反应过来之际，已消失在迷雾中。
当晨雾散去，刘备军的士兵们惊喜地发现，船上竟密密麻麻插满了箭，足够武装千军万马！
"妙啊！"刘备不禁赞叹，"军师这三个锦囊，真是神机妙算！"
诸葛亮捋须微笑，"主公过奖了。这不过是根据不同情况，准备了不同的策略罢了。"

## 策略模式解析

> 策略模式定义了算法族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用算法的客户。

诸葛亮的三个锦囊，正是策略模式的绝佳示例。在软件工程中，策略模式允许我们定义一系列的算法，把它们一个个封装起来，并且使它们可以互相替换。
让我们用一个类图来理解策略模式的结构：
![](https://oss1.aistar.cool/elog-offer-now/fd5d664ba00f5f83a9b85e70d0b6c379.svg)## 代码实现
让我们用 Java 来重现这个智取箭矢的场景：

```java
// 策略接口
interface BorrowArrowStrategy {
    void execute();
}

// 具体策略：摆草船、张白帆
class BoatStrategy implements BorrowArrowStrategy {
    public void execute() {
        System.out.println("摆开草船，张起白帆，静待曹军放箭。");
    }
}

// 具体策略：鸣锣击鼓
class DrumStrategy implements BorrowArrowStrategy {
    public void execute() {
        System.out.println("鸣锣击鼓，制造我军进攻的假象。");
    }
}

// 具体策略：快速撤退
class RetreatStrategy implements BorrowArrowStrategy {
    public void execute() {
        System.out.println("箭矢已满，快速撤离战场。");
    }
}

// 锦囊：策略的执行者
class StrategicPlan {
    private BorrowArrowStrategy strategy;

    public void setStrategy(BorrowArrowStrategy strategy) {
        this.strategy = strategy;
    }

    public void executeStrategy() {
        strategy.execute();
    }
}

// 诸葛亮：策略的使用者
class ZhuGeLiang {
    private StrategicPlan plan = new StrategicPlan();

    public void borrowArrows() {
        System.out.println("诸葛亮：开始执行草船借箭计划！");

        plan.setStrategy(new BoatStrategy());
        plan.executeStrategy();

        plan.setStrategy(new DrumStrategy());
        plan.executeStrategy();

        plan.setStrategy(new RetreatStrategy());
        plan.executeStrategy();

        System.out.println("诸葛亮：草船借箭计划圆满成功！");
    }
}

// 主类
public class StrategyPatternDemo {
    public static void main(String[] args) {
        ZhuGeLiang kongming = new ZhuGeLiang();
        kongming.borrowArrows();
    }
}
```

## 运行结果

```
诸葛亮：开始执行草船借箭计划！
摆开草船，张起白帆，静待曹军放箭。
鸣锣击鼓，制造我军进攻的假象。
箭矢已满，快速撤离战场。
诸葛亮：草船借箭计划圆满成功！
```

## 策略模式的妙用

通过这个例子，我们可以看到策略模式的几个关键优点：

1. **灵活性**：诸葛亮可以根据战况随时更换策略，就像我们可以轻松切换不同的算法。
2. **可扩展性**：如果有新的借箭策略，我们只需添加新的策略类，而不需要修改现有代码。
3. **简化了复杂的条件判断**：不同的策略被封装在不同的类中，避免了复杂的 if-else 结构。

## 结语

诸葛亮的锦囊妙计不仅智取了曹操的箭矢，也为我们揭示了策略模式的精髓。在软件开发中，我们同样可以像诸葛亮一样，将不同的算法封装成策略，以应对变幻莫测的需求变化。
正所谓"运筹帷幄之中，决胜千里之外"，掌握了策略模式，我们就能在软件架构的战场上，游刃有余，所向披靡。
下一章，我们将继续探索三国中的其他奇策妙计，揭示更多精彩的设计模式。敬请期待！
