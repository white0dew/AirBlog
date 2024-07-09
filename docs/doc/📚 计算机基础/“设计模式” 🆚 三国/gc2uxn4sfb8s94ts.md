---
title: 诸葛亮的七星灯阵 - 单例模式
urlname: gc2uxn4sfb8s94ts
date: '2024-07-05 11:02:44'
updated: '2024-07-08 22:39:30'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/1052bb1bd8e93fd0fc5d255a61287ba6.svg'
description: '"运筹帷幄之中，决胜千里之外。一盏明灯，照亮万里江山。"在蜀汉建兴五年，诸葛亮率军北伐，欲一举扫平魏国。然而，大军行至祁山，却遭遇了前所未有的困境。在这危急时刻，诸葛亮设下了一个神秘的阵法——七星灯阵。这个阵法不仅化解了危机，更蕴含了现代软件设计中单例模式的精髓。七星灯阵耀夜空，一盏明灯定乾坤...'
---
"运筹帷幄之中，决胜千里之外。一盏明灯，照亮万里江山。"
在蜀汉建兴五年，诸葛亮率军北伐，欲一举扫平魏国。然而，大军行至祁山，却遭遇了前所未有的困境。在这危急时刻，诸葛亮设下了一个神秘的阵法——七星灯阵。
这个阵法不仅化解了危机，更蕴含了现代软件设计中单例模式的精髓。
> 七星灯阵耀夜空，
一盏明灯定乾坤。
单例精髓藏其中，
智慧之光永不熄。

## 七星灯阵
夜幕低垂，祁山军营一片肃静。诸葛亮独自站在中军大帐前，仰望星空。
"军师，魏军已经包围我们，情况危急啊！"庞统焦急地说道。
诸葛亮微微一笑："无妨，我自有妙计。"
只见他从怀中取出一盏特制的铜灯，点燃后置于帐前。随即，他又取出六盏一模一样的灯，分别安置在军营周围的六个方位。
"这是何意？"马谡不解地问。
"此阵名为七星灯阵。"诸葛亮解释道，"中军大帐前的这盏灯代表北斗七星中的天枢星，乃阵眼所在。其余六盏灯分别代表其他六星。只要天枢灯不灭，我军就固若金汤。"
话音刚落，魏军突然发起猛攻。然而，无论他们如何冲杀，总是找不到蜀军大营的所在。每当他们接近一盏灯，就会莫名其妙地迷失方向。
经过一夜激战，魏军疲惫不堪，最终铩羽而归。
待到天明，诸葛亮召集众将，笑道："此阵利用北斗七星的方位变化，配合地形，形成一个巨大的迷阵。敌军越是进攻，就越是迷失。而我们只需守住中央的天枢灯，就能掌控全局。"
## 单例模式解析
> 单例模式确保一个类只有一个实例，并提供一个全局访问点。

诸葛亮的七星灯阵与单例模式有异曲同工之妙：

- 天枢灯就像是单例模式中的唯一实例
- 其他六盏灯依赖于天枢灯，就像程序中其他部分依赖于单例
- 只有一盏天枢灯，确保了阵法的统一性和有效性

让我们用类图来理解单例模式的结构：
![](https://oss1.aistar.cool/elog-offer-now/43d6c69c174f842a57bee55c68fbd7c7.svg)## 代码实现
让我们用 Java 来实现这个七星灯阵系统：
```java
public class SevenStarLampFormation {
    private static SevenStarLampFormation instance;
    private boolean isActivated = false;

    private SevenStarLampFormation() {}

    public static SevenStarLampFormation getInstance() {
        if (instance == null) {
            instance = new SevenStarLampFormation();
        }
        return instance;
    }

    public void activateFormation() {
        if (!isActivated) {
            System.out.println("诸葛亮点燃了七星灯阵的天枢灯！");
            isActivated = true;
        } else {
            System.out.println("七星灯阵已经被激活，无需重复点燃。");
        }
    }

    public void confuseEnemy() {
        if (isActivated) {
            System.out.println("七星灯阵发挥效果，敌军陷入迷惑！");
        } else {
            System.out.println("七星灯阵尚未激活，无法迷惑敌军。");
        }
    }
}

public class SingletonPatternDemo {
    public static void main(String[] args) {
        SevenStarLampFormation formation = SevenStarLampFormation.getInstance();
        formation.activateFormation();
        formation.confuseEnemy();

        // 尝试创建第二个实例
        SevenStarLampFormation anotherFormation = SevenStarLampFormation.getInstance();
        anotherFormation.activateFormation();

        System.out.println("两个实例是否相同：" + (formation == anotherFormation));
    }
}
```
## 运行结果
```
诸葛亮点燃了七星灯阵的天枢灯！
七星灯阵发挥效果，敌军陷入迷惑！
七星灯阵已经被激活，无需重复点燃。
两个实例是否相同：true
```
## 单例模式的妙用
通过诸葛亮的七星灯阵，我们可以看到单例模式的几个关键优点：

1. **全局唯一性**：确保系统中只有一个实例，就像只有一盏天枢灯。
2. **延迟初始化**：单例可以在第一次被需要时才创建，节省资源。
3. **全局访问点**：提供一个全局访问点，便于其他部分 of the 系统使用。
4. **状态共享**：所有使用该实例的代码都共享同一个状态，便于协调。
## 结语
诸葛亮的七星灯阵不仅展现了其高超的军事才能和对天文地理的深刻理解，也为我们揭示了单例模式的精髓。在软件开发中，单例模式被广泛应用于管理共享资源、控制并发访问、全局配置管理等多个领域，为系统提供了统一的控制点和资源协调能力。
正如七星灯阵中的天枢灯是整个阵法的核心，单例模式在软件系统中也常常扮演着关键的角色。掌握这种设计模式，我们就能在复杂的软件架构中，如同诸葛亮运筹帷幄一般，轻松应对各种挑战。
