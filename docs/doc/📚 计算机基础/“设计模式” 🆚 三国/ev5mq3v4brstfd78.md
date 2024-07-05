---
title: 诸葛亮的连环计 - 责任链模式
urlname: ev5mq3v4brstfd78
date: '2024-07-05 11:28:35'
updated: '2024-07-05 11:29:29'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/394a87161732fab246c86aac73081509.svg'
description: '"万事谋定而后动，一环扣一环，方能成大事。"在三国时期，诸葛亮以其超凡的智慧闻名天下。在他众多的计策中，有一个鲜为人知却极具智慧的连环计，完美诠释了现代软件设计中的责任链模式。让我们一同探索这个巧妙的计策，揭示责任链模式的奥秘。连环妙计出奇谋，层层推进显神通。责任传递如流水，一环扣一环成功。诸...'
---
"万事谋定而后动，一环扣一环，方能成大事。"
在三国时期，诸葛亮以其超凡的智慧闻名天下。在他众多的计策中，有一个鲜为人知却极具智慧的连环计，完美诠释了现代软件设计中的责任链模式。让我们一同探索这个巧妙的计策，揭示责任链模式的奥秘。
> 连环妙计出奇谋，
层层推进显神通。
责任传递如流水，
一环扣一环成功。

## 诸葛亮的连环计
建兴七年，诸葛亮率军北伐，欲夺取陇右。然而，魏国名将张郃据守陇右，易守难攻。诸葛亮深知强攻难下，便设计了一个巧妙的连环计。
首先，诸葛亮命令马谡佯攻秦岭，引起张郃注意。
"报！马谡将军正在进攻秦岭！"探子急匆匆地向张郃禀报。
张郃闻讯，立即调兵遣将，加强秦岭防守。
见此情景，诸葛亮微微一笑，随即下令魏延在陇西制造骚动。
不多时，又有探子来报："魏延将军正在陇西四处劫掠！"
张郃不得不分兵应对，陇右防线顿时捉襟见肘。
就在张郃疲于奔命之际，诸葛亮又命令姜维假装投降，混入魏军中。
姜维成功潜入魏营后，借机散布谣言："蜀军主力已经绕道天水，准备切断我军退路！"
张郃闻讯大惊，立刻命令大军后撤，准备迎击可能出现的蜀军主力。
就在此时，诸葛亮终于亲自率领主力军，直取陇右。
张郃猝不及防，节节败退，最终被迫放弃陇右。
事后，诸葛亮向众将解释道："此计共有四环：佯攻、骚扰、离间、主攻。每一环都有其作用，层层推进，最终达成目标。若缺一环，则难以成功。"
## 责任链模式解析
> 责任链模式为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。

诸葛亮的连环计完美地诠释了责任链模式的核心思想：

- 每一个计策（佯攻、骚扰、离间、主攻）都是链条上的一环
- 每个环节都有特定的职责，共同构成了完整的战略
- 计划的执行如同请求在责任链上的传递，每个环节都对局势进行处理并为下一环节创造条件

让我们用类图来理解责任链模式的结构：
![](https://oss1.aistar.cool/elog-offer-now/5deb466ec6556209ef3e1b307cda7e0b.svg)## 代码实现
让我们用 Java 来实现这个连环计：
```java
// 战况类
class BattleSituation {
    private int enemyMorale;
    private boolean isEnemyConfused;
    private boolean isRouteCut;

    public BattleSituation() {
        this.enemyMorale = 100;
        this.isEnemyConfused = false;
        this.isRouteCut = false;
    }

    // Getters and setters
    // ...

    @Override
    public String toString() {
        return "敌军士气: " + enemyMorale +
               ", 敌军是否混乱: " + isEnemyConfused +
               ", 敌军退路是否被切断: " + isRouteCut;
    }
}

// 战略行动接口
interface StrategicMove {
    void setNext(StrategicMove next);
    void execute(BattleSituation situation);
}

// 佯攻
class FakeAttack implements StrategicMove {
    private StrategicMove next;

    @Override
    public void setNext(StrategicMove next) {
        this.next = next;
    }

    @Override
    public void execute(BattleSituation situation) {
        System.out.println("马谡佯攻秦岭，吸引敌军注意...");
        situation.setEnemyMorale(situation.getEnemyMorale() - 10);
        if (next != null) {
            next.execute(situation);
        }
    }
}

// 骚扰
class Harassment implements StrategicMove {
    private StrategicMove next;

    @Override
    public void setNext(StrategicMove next) {
        this.next = next;
    }

    @Override
    public void execute(BattleSituation situation) {
        System.out.println("魏延在陇西制造骚动，分散敌军兵力...");
        situation.setEnemyMorale(situation.getEnemyMorale() - 20);
        if (next != null) {
            next.execute(situation);
        }
    }
}

// 离间
class Infiltration implements StrategicMove {
    private StrategicMove next;

    @Override
    public void setNext(StrategicMove next) {
        this.next = next;
    }

    @Override
    public void execute(BattleSituation situation) {
        System.out.println("姜维假装投降，散布谣言...");
        situation.setEnemyConfused(true);
        situation.setEnemyMorale(situation.getEnemyMorale() - 30);
        if (next != null) {
            next.execute(situation);
        }
    }
}

// 主攻
class MainAttack implements StrategicMove {
    @Override
    public void setNext(StrategicMove next) {
        // 主攻是最后一环，不需要设置下一个
    }

    @Override
    public void execute(BattleSituation situation) {
        System.out.println("诸葛亮率领主力军直取陇右...");
        situation.setRouteCut(true);
        situation.setEnemyMorale(0);
        System.out.println("陇右被我军占领！");
    }
}

// 诸葛亮
class ZhugeLiang {
    private StrategicMove firstMove;

    public void setStrategy(StrategicMove first) {
        this.firstMove = first;
    }

    public void executeStrategy() {
        BattleSituation situation = new BattleSituation();
        System.out.println("初始战况：" + situation);
        firstMove.execute(situation);
        System.out.println("最终战况：" + situation);
    }
}

// 主类
public class ChainOfResponsibilityDemo {
    public static void main(String[] args) {
        ZhugeLiang zhugeLiang = new ZhugeLiang();

        StrategicMove fakeAttack = new FakeAttack();
        StrategicMove harassment = new Harassment();
        StrategicMove infiltration = new Infiltration();
        StrategicMove mainAttack = new MainAttack();

        fakeAttack.setNext(harassment);
        harassment.setNext(infiltration);
        infiltration.setNext(mainAttack);

        zhugeLiang.setStrategy(fakeAttack);

        System.out.println("诸葛亮：开始执行连环计！");
        zhugeLiang.executeStrategy();
    }
}
```
## 运行结果
```
诸葛亮：开始执行连环计！
初始战况：敌军士气: 100, 敌军是否混乱: false, 敌军退路是否被切断: false
马谡佯攻秦岭，吸引敌军注意...
魏延在陇西制造骚动，分散敌军兵力...
姜威假装投降，散布谣言...
诸葛亮率领主力军直取陇右...
陇右被我军占领！
最终战况：敌军士气: 0, 敌军是否混乱: true, 敌军退路是否被切断: true
```
## 责任链模式的妙用
通过诸葛亮的连环计，我们可以看到责任链模式的几个关键优点：

1. **解耦**：每个战略行动都是独立的，它们不需要知道其他行动的存在。
2. **灵活性**：可以轻松地添加、删除或重新排序战略行动，而不影响整体结构。
3. **单一职责**：每个战略行动只负责自己的任务，使得代码更加清晰和易于维护。
4. **动态性**：可以在运行时动态地构建责任链，适应不同的战略需求。

在现代软件开发中，责任链模式有着广泛的应用：

- **请求处理**：如 HTTP 请求通过一系列的过滤器。
- **日志记录**：不同级别的日志可以由不同的处理者处理。
- **异常处理**：异常可以在不同的层级被捕获和处理。
- **工作流引擎**：业务流程中的每个步骤可以被建模为责任链中的一环。
## 结语
诸葛亮的连环计不仅展现了他高超的军事才能，也为我们诠释了责任链模式的精髓。在软件设计中，我们常常需要处理一系列复杂的步骤或决策。通过责任链模式，我们可以将这些步骤解耦，使得每个步骤都专注于自己的任务，但是又能无缝协作，最终达成目标。
正如诸葛亮的连环计层层推进，最终攻下陇右，我们在软件开发中也可以通过责任链模式，构建出灵活、可扩展、易维护的系统。让我们铭记这个智慧，在面对复杂问题时，也能运筹帷幄，决胜千里。
