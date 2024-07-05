---
title: 曹操的五色棋布阵 - 工厂方法模式
urlname: dfd7a2gtvtf9mue4
date: '2024-07-05 11:01:23'
updated: '2024-07-05 11:30:21'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/2d5db1d86e3d73bd936407244ef2d204.svg'
description: 定场诗"兵无常势，水无常形，能因敌变化而取胜者，谓之神。"在三国的战场上，兵法如棋，布阵如画。曹操的五色棋布阵，不正是今日软件设计中工厂方法模式的绝妙写照吗？让我们从这个神奇的布阵之法，揭开工厂方法模式的神秘面纱。五色旗分兵布阵，八门金锁任调遣。工厂方法创军团，灵活多变战未然。五色棋布阵建安十...
---
## 定场诗
"兵无常势，水无常形，能因敌变化而取胜者，谓之神。"
在三国的战场上，兵法如棋，布阵如画。曹操的五色棋布阵，不正是今日软件设计中工厂方法模式的绝妙写照吗？让我们从这个神奇的布阵之法，揭开工厂方法模式的神秘面纱。
> 五色旗分兵布阵，
八门金锁任调遣。
工厂方法创军团，
灵活多变战未然。

## 五色棋布阵
建安十三年，曹操与马超在渭南相持。马超骁勇善战，曹军屡战不利。一日，曹操独坐帐中，面对沙盘冥思苦想。
"主公，可有良策？"军师荀攸问道。
曹操缓缓抬头，眼中精光闪烁："我想到了一个阵法，名为'五色棋布阵'。此阵共分五部，以五行相生相克之理布置。"
荀攸好奇道："请主公明示。"
曹操取出五色棋子，在沙盘上摆布起来："金、木、水、火、土，五行相生相克。每种颜色的棋子代表一种兵种，可随时变换位置。敌人看到的永远是变化的阵型，却难觉其中玄机。"
荀攸恍然大悟："妙哉！这五种兵种如同五个工厂，随时可以生产出我们需要的兵力。"
曹操点头："正是。金主杀伐，木主生发，水主智谋，火主威猛，土主防守。临阵之时，可随机应变，因敌制宜。"
次日，曹操摆下五色棋布阵。马超率军来攻，却见曹军阵型变幻莫测，攻之不得，守之不能，最终大败而归。
## 工厂方法模式解析
> 工厂方法模式定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类。

曹操的五色棋布阵与工厂方法模式有异曲同工之妙：

- 五种颜色的棋子相当于五个不同的工厂方法
- 每种颜色可以产生不同类型的兵种，就像工厂方法可以创建不同的产品
- 根据战况选择使用哪种颜色的棋子，就像根据需求选择使用哪个工厂方法

让我们用类图来理解工厂方法模式的结构：
![](https://oss1.aistar.cool/elog-offer-now/9b22e4445c27211e42d97f5b9d25b2b1.svg)## 代码实现
让我们用 Java 来实现这个五色棋布阵系统：
```java
// 军队单位接口
interface Unit {
    void attack();
    void defend();
}

// 军队工厂接口
interface ArmyFactory {
    Unit createUnit();
}

// 具体军队单位
class Cavalry implements Unit {
    public void attack() { System.out.println("骑兵发起冲锋！"); }
    public void defend() { System.out.println("骑兵列阵防守！"); }
}

class Archer implements Unit {
    public void attack() { System.out.println("弓箭手放箭！"); }
    public void defend() { System.out.println("弓箭手设防！"); }
}

class Scout implements Unit {
    public void attack() { System.out.println("斥候发动偷袭！"); }
    public void defend() { System.out.println("斥候隐蔽！"); }
}

class Infantry implements Unit {
    public void attack() { System.out.println("步兵发起进攻！"); }
    public void defend() { System.out.println("步兵筑起盾墙！"); }
}

class Guardian implements Unit {
    public void attack() { System.out.println("守卫进行反击！"); }
    public void defend() { System.out.println("守卫加强防御！"); }
}

// 具体军队工厂
class GoldArmyFactory implements ArmyFactory {
    public Unit createUnit() { return new Cavalry(); }
}

class WoodArmyFactory implements ArmyFactory {
    public Unit createUnit() { return new Archer(); }
}

class WaterArmyFactory implements ArmyFactory {
    public Unit createUnit() { return new Scout(); }
}

class FireArmyFactory implements ArmyFactory {
    public Unit createUnit() { return new Infantry(); }
}

class EarthArmyFactory implements ArmyFactory {
    public Unit createUnit() { return new Guardian(); }
}

// 曹操的五色棋布阵
class FiveColorChessFormation {
    private ArmyFactory[] factories;

    public FiveColorChessFormation() {
        factories = new ArmyFactory[] {
            new GoldArmyFactory(),
            new WoodArmyFactory(),
            new WaterArmyFactory(),
            new FireArmyFactory(),
            new EarthArmyFactory()
        };
    }

    public void deployTroops() {
        System.out.println("曹操：部署五色棋布阵！");
        for (ArmyFactory factory : factories) {
            Unit unit = factory.createUnit();
            unit.attack();
            unit.defend();
        }
    }
}

// 主类
public class FactoryMethodPatternDemo {
    public static void main(String[] args) {
        FiveColorChessFormation caoCaoFormation = new FiveColorChessFormation();
        caoCaoFormation.deployTroops();
    }
}
```
## 运行结果
```
曹操：部署五色棋布阵！
骑兵发起冲锋！
骑兵列阵防守！
弓箭手放箭！
弓箭手设防！
斥候发动偷袭！
斥候隐蔽！
步兵发起进攻！
步兵筑起盾墙！
守卫进行反击！
守卫加强防御！
```
## 工厂方法模式的妙用
通过曹操的五色棋布阵，我们可以看到工厂方法模式的几个关键优点：

1. **灵活性**：可以根据战况需要，灵活地创建不同类型的军队单位。
2. **可扩展性**：如果需要新增兵种，只需添加新的具体工厂和具体产品类，无需修改现有代码。
3. **解耦**：具体的军队单位创建逻辑与使用逻辑分离，提高了代码的可维护性。
4. **遵循开闭原则**：可以引入新的军队单位类型，而无需修改现有的代码。
## 结语
曹操的五色棋布阵不仅展现了其高超的军事才能，也为我们揭示了工厂方法模式的精髓。在软件开发中，工厂方法模式被广泛应用于框架设计、插件系统、可配置应用程序等多个领域。
正如曹操能够根据战况灵活调度不同兵种，我们的软件系统也能够通过工厂方法模式实现对象创建的灵活性和可扩展性。掌握这种设计模式，我们就能在软件架构的战场上，以不变应万变，立于不败之地。
