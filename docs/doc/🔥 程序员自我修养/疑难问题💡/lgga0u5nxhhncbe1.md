---
title: TCC事务是什么？
urlname: lgga0u5nxhhncbe1
date: '2024-05-28 17:15:04'
updated: '2024-05-28 17:27:38'
description: 何为TCC？TCC（Try-Confirm-Cancel）即补偿型事务，是一种分布式事务解决方案。TCC 分布式事务的核心思想是先尝试改变数据库状态为中间态，如果没有问题才进行真正的修改，如果有问题则返回之前的状态。三个部分的拆解如下：Try：尝试将结果修改为中间态；Confirm：如果 Tr...
---
## 何为TCC？
TCC（Try-Confirm-Cancel）即补偿型事务，是一种分布式事务解决方案。TCC 分布式事务的核心思想是先尝试改变数据库状态为中间态，如果没有问题才进行真正的修改，如果有问题则返回之前的状态。三个部分的拆解如下：

- **Try**：尝试将结果修改为中间态；
- **Confirm**：如果 Try 成功，就真正将状态修改为已处理；
- **Cancel**：如果 Try 失败，将中间态回滚至最初状态；
## 业务场景示例

假设你现在有一个电商系统，里面有一个支付订单的场景。对一个订单支付之后，我们需要做以下步骤：

1. 更改订单的状态为“已支付”
2. 扣减商品库存
3. 给会员增加积分
4. 创建销售出库单通知仓库发货

## TCC 各阶段详解

### Try 阶段

在 Try 阶段，我们尝试将各个服务的状态修改为中间态，以下是具体的处理方式：

1. **订单服务**：将订单状态修改为 `OrderStatus.UPDATING`，表示正在修改。
2. **库存服务**：提供 `reduceStock()` 接口，不直接扣减库存，而是冻结库存。例如，将可销售的库存从 100 减少到 98，同时在一个单独的冻结库存字段中记录冻结的2个库存。
3. **积分服务**：提供 `addCredit()` 接口，不直接增加会员积分，而是先在积分表里的一个预增加积分字段中加入积分。
4. **仓储服务**：提供 `saleDelivery()` 接口，先创建一个销售出库单，但是这个销售出库单的状态是 `UNKNOWN`。

### Confirm 阶段

为了感知各个阶段的执行情况并推进下一阶段的进程，通常需要相应的框架，如 ByteTCC、himly、tcc-transaction 等。当框架感应到所有 Try 都成功了，就会进行 Confirm，将 Try 阶段的中间态修改为最终状态。具体操作如下：

1. **订单服务**：将订单状态更新为 `OrderStatus.PAID`。
2. **库存服务**：将冻结的库存真正扣减。
3. **积分服务**：将预增加的积分真正增加到用户的积分余额中。
4. **仓储服务**：将销售出库单的状态从 `UNKNOWN` 更新为 `CONFIRMED`，通知仓库发货。

如果这一阶段出现问题，要么不停重试（加上定时器），要么重试一定次数失败并记录日志。

### Cancel 阶段

如果在 Try 阶段，任何一个服务的逻辑失败，订单服务的 TCC 分布式事务框架会感知到这种情况，并与各个服务内的 TCC 分布式事务框架进行通信，然后调用各个服务的 Cancel 逻辑，将状态回滚至最初状态。具体操作如下：

1. **订单服务**：将订单状态从 `OrderStatus.UPDATING` 回滚到最初的状态。
2. **库存服务**：将冻结的库存释放，将可销售的库存恢复到 100。
3. **积分服务**：将预增加的积分字段清零，不增加实际积分。
4. **仓储服务**：将创建的销售出库单状态从 `UNKNOWN` 删除或标记为无效。

## 示例代码

以下是一个简单的示例代码，展示如何实现 TCC 分布式事务。

### 订单服务

```java
public class OrderService {
    public void tryUpdateOrderStatus(long orderId) {
        // 修改订单状态为 UPDATING
        Order order = orderRepository.findById(orderId);
        order.setStatus(OrderStatus.UPDATING);
        orderRepository.save(order);
    }

    public void confirmUpdateOrderStatus(long orderId) {
        // 修改订单状态为 PAID
        Order order = orderRepository.findById(orderId);
        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);
    }

    public void cancelUpdateOrderStatus(long orderId) {
        // 回滚订单状态
        Order order = orderRepository.findById(orderId);
        order.setStatus(OrderStatus.INITIAL);
        orderRepository.save(order);
    }
}
```

### 库存服务

```java
public class InventoryService {
    public void tryReduceStock(long productId, int amount) {
        // 冻结库存
        Product product = productRepository.findById(productId);
        product.setAvailableStock(product.getAvailableStock() - amount);
        product.setFrozenStock(product.getFrozenStock() + amount);
        productRepository.save(product);
    }

    public void confirmReduceStock(long productId, int amount) {
        // 真正扣减库存
        Product product = productRepository.findById(productId);
        product.setFrozenStock(product.getFrozenStock() - amount);
        productRepository.save(product);
    }

    public void cancelReduceStock(long productId, int amount) {
        // 释放冻结库存
        Product product = productRepository.findById(productId);
        product.setAvailableStock(product.getAvailableStock() + amount);
        product.setFrozenStock(product.getFrozenStock() - amount);
        productRepository.save(product);
    }
}
```

### 积分服务

```java
public class CreditService {
    public void tryAddCredit(long userId, int points) {
        // 预增加积分
        User user = userRepository.findById(userId);
        user.setPreCredit(user.getPreCredit() + points);
        userRepository.save(user);
    }

    public void confirmAddCredit(long userId, int points) {
        // 真正增加积分
        User user = userRepository.findById(userId);
        user.setCredit(user.getCredit() + points);
        user.setPreCredit(user.getPreCredit() - points);
        userRepository.save(user);
    }

    public void cancelAddCredit(long userId, int points) {
        // 取消预增加积分
        User user = userRepository.findById(userId);
        user.setPreCredit(user.getPreCredit() - points);
        userRepository.save(user);
    }
}
```

### 仓储服务

```java
public class DeliveryService {
    public void tryCreateDelivery(long orderId) {
        // 创建出库单，状态设为 UNKNOWN
        Delivery delivery = new Delivery();
        delivery.setOrderId(orderId);
        delivery.setStatus(DeliveryStatus.UNKNOWN);
        deliveryRepository.save(delivery);
    }

    public void confirmCreateDelivery(long orderId) {
        // 修改出库单状态为 CONFIRMED
        Delivery delivery = deliveryRepository.findByOrderId(orderId);
        delivery.setStatus(DeliveryStatus.CONFIRMED);
        deliveryRepository.save(delivery);
    }

    public void cancelCreateDelivery(long orderId) {
        // 删除或标记为无效
        Delivery delivery = deliveryRepository.findByOrderId(orderId);
        deliveryRepository.delete(delivery);
    }
}
```

## 总结
TCC 分布式事务通过 Try、Confirm、Cancel 三个阶段，实现了分布式系统中的事务一致性。Try 阶段将各个服务的状态修改为中间态，Confirm 阶段将中间态修改为最终状态，Cancel 阶段将中间态回滚至最初状态。虽然 TCC 分布式事务的实现较为复杂，但它提供了强大的分布式事务支持，适用于电商、金融等需要保证数据一致性的业务场景。
