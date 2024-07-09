---
title: 诸葛亮的空城计 - 代理模式
urlname: vpb2ynhhocz1pgy6
date: '2024-07-05 11:02:00'
updated: '2024-07-07 22:36:38'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/aaf83d97a5e5ed845c5091cfbdd48179.svg'
description: 定场诗"无形之中蕴含至理，虚实相生方见大道。"在三国演义中，诸葛亮的空城计可谓神来之笔。这看似冒险的策略，实则蕴含深意。今天，我们将透过空城计，一窥软件设计中代理模式的奥秘。西城无人旦夕危，诸葛单骑解危机。虚张声势胜千军，代理模式妙无比。空城妙计蜀汉建兴七年，诸葛亮率军北伐，屯兵祁山。一日，探...
---
## 定场诗
"无形之中蕴含至理，虚实相生方见大道。"
在三国演义中，诸葛亮的空城计可谓神来之笔。这看似冒险的策略，实则蕴含深意。今天，我们将透过空城计，一窥软件设计中代理模式的奥秘。
> 西城无人旦夕危，
诸葛单骑解危机。
虚张声势胜千军，
代理模式妙无比。

## 空城妙计
蜀汉建兴七年，诸葛亮率军北伐，屯兵祁山。

一日，探马来报："司马懿亲率大军来袭，我军主力已退至剑阁，只有少量兵力驻守西城！"

诸葛亮闻言，不慌不忙，吩咐道："打开城门，除去城上旌旗，每门只留二十个老弱兵丁。"
众将惊愕，马谡问道："军师，这是为何？"
诸葛亮笑道："兵法云：'出其不意，攻其不备'。司马懿素知我谨慎，若见城门大开，必疑有伏兵。我们以逸待劳，反而能退敌。"
说罢，诸葛亮命人在城楼上设下桌案，焚香鼓琴，悠然自得。
不多时，司马懿率军来到城下。见此情景，司马懿大惊："诸葛亮用兵如神，此必有诈！全军撤退！"
待司马懿退军后，诸葛亮才道出实情："我军中只有两千五百人，若非用此计，难逃一劫。"
## 代理模式解析
> 代理模式为其他对象提供一种代理以控制对这个对象的访问。

诸葛亮的空城计与代理模式有异曲同工之妙：

- 诸葛亮代表了真实对象（实际上防守薄弱的城池）
- 空城计就是一个代理，它呈现出一种强大防御的假象
- 司马懿是客户端，他通过观察这个代理（空城计）来判断是否进攻

让我们用类图来理解代理模式的结构：
![](https://oss1.aistar.cool/elog-offer-now/bcd13d8bcea3f6c94aee189384e98439.svg)## 代码实现
让我们用 Java 来实现这个空城计系统：
```java
// 防御接口
interface CityDefense {
    void defend();
}

// 真实对象：实际的城池防御
class ActualCityDefense implements CityDefense {
    private int soldiers;

    public ActualCityDefense(int soldiers) {
        this.soldiers = soldiers;
    }

    @Override
    public void defend() {
        System.out.println("城中有" + soldiers + "名士兵准备战斗！");
    }
}

// 代理对象：诸葛亮的空城计
class EmptyCityStrategy implements CityDefense {
    private ActualCityDefense realDefense;

    public EmptyCityStrategy(int soldiers) {
        this.realDefense = new ActualCityDefense(soldiers);
    }

    @Override
    public void defend() {
        if (shouldUseStrategy()) {
            System.out.println("诸葛亮施展空城计：城门大开，琴声悠扬。");
        } else {
            realDefense.defend();
        }
    }

    private boolean shouldUseStrategy() {
        // 模拟诸葛亮的判断
        return Math.random() > 0.5;
    }
}

// 司马懿
class SimaYi {
    public void attack(CityDefense city) {
        System.out.println("司马懿来袭...");
        city.defend();
        // 司马懿的反应
        if (Math.random() > 0.5) {
            System.out.println("司马懿：此必有诈，全军撤退！");
        } else {
            System.out.println("司马懿：发起进攻！");
        }
    }
}

// 主类
public class ProxyPatternDemo {
    public static void main(String[] args) {
        CityDefense xiCity = new EmptyCityStrategy(2500);
        SimaYi simaYi = new SimaYi();

        simaYi.attack(xiCity);
    }
}
```
## 运行结果
```
司马懿来袭...
诸葛亮施展空城计：城门大开，琴声悠扬。
司马懿：此必有诈，全军撤退！
```
## 代理模式的妙用
通过诸葛亮的空城计，我们可以看到代理模式的几个关键优点：

1. **控制访问**：代理可以控制对真实对象的访问，就像空城计控制了司马懿对城池真实防御情况的认知。
2. **延迟加载**：代理可以延迟创建开销大的对象，直到真正需要时才创建。
3. **添加额外功能**：代理可以在不改变原对象的情况下，添加额外的功能，如日志记录、访问控制等。
4. **远程代理**：可以为远程对象提供本地代表。
## 结语
诸葛亮的空城计不仅展现了其高超的军事才能和心理洞察力，也为我们揭示了代理模式的精髓。在软件开发中，代理模式被广泛应用于远程方法调用、虚拟代理、保护代理等多个领域，为系统提供了更大的灵活性和安全性。
正如诸葛亮以虚势退敌，我们也可以通过代理模式巧妙地控制对象的访问，增强系统的安全性和灵活性。掌握这种设计模式，我们就能在软件架构中运筹帷幄，决胜千里之外。
