---
title: "\U0001F44B Java 集合类剖析"
urlname: dw3rk59616zfltq2
date: '2024-05-24 12:50:17'
updated: '2024-06-03 15:34:50'
cover: 'https://cdn.nlark.com/yuque/0/2022/jpeg/22382235/1651227483857-b2d60627-7c5c-4894-b201-16761b2a52f8.jpeg'
description: '---nav_path: java-collections---Java集合类的主要目的是创建一个简单的、高性能的数据结构操作框架。Java的集合框架围绕一组标准接口设计，根接口是数据集合（Collection）与键值映射表（Map），并基于这两个接口派生了多个子接口，实现包括数组、哈希表、集...'
nav_path: java-collections
---
Java集合类的主要目的是创建一个简单的、高性能的数据结构操作框架。Java的集合框架围绕一组标准接口设计，根接口是数据集合（`Collection`）与键值映射表（`Map`），并基于这两个接口派生了多个子接口，实现包括数组、哈希表、集合等数据结构。
以下是`Collection`接口派生的主要集合类：

1. **容器接口**：如`Collection`、`Map`、`Set`等。
2. **实现类**：具体实现容器的数据结构，如`HashSet`、`ArrayList`等。
3. **相应算法**：配套数据结构的算法，如排序、搜索等。

![](https://oss1.aistar.cool/elog-offer-now/cc9a02b5e4f00ca179a72d3a1107df2e.jpeg)
# Collection接口

`Collection`接口主要定义了一些通用的方法，供后续数据结构实现：

```java
public interface Collection<E> extends Iterable<E> {
    int size(); // 集合内元素个数
    boolean isEmpty(); // 集合是否为空
    boolean contains(Object o); // 是否包含某个元素
    Iterator<E> iterator(); // 返回迭代器
    Object[] toArray(); // 转换为数组
    <T> T[] toArray(T[] a); // 转换为指定类型数组
    boolean add(E e); // 添加元素
    boolean remove(Object o); // 移除元素
    boolean containsAll(Collection<?> c); // 是否包含另一集合的所有元素
    boolean addAll(Collection<? extends E> c); // 添加另一集合的所有元素
    boolean removeAll(Collection<?> c); // 移除另一集合的所有元素
    default boolean removeIf(Predicate<? super E> filter) { // 条件移除
        // 实现略
    }
    boolean retainAll(Collection<?> c); // 保留另一集合的所有元素
    void clear(); // 清空集合
    boolean equals(Object o); // 判断相等
    int hashCode(); // 计算哈希码
    default Spliterator<E> spliterator() { // 分割为多个迭代器
        return Spliterators.spliterator(this, 0);
    }
    default Stream<E> stream() { // 流处理
        return StreamSupport.stream(spliterator(), false);
    }
    default Stream<E> parallelStream() { // 并行流处理
        return StreamSupport.stream(spliterator(), true);
    }
}
```

## Iterable与Iterator

### Iterable接口

`Iterable`接口主要用于遍历集合：

```java
public interface Iterable<T> {
    Iterator<T> iterator();

    default void forEach(Consumer<? super T> action) {
        Objects.requireNonNull(action);
        for (T t : this) {
            action.accept(t);
        }
    }

    default Spliterator<T> spliterator() {
        return Spliterators.spliteratorUnknownSize(iterator(), 0);
    }
}
```

### Iterator接口

`Iterator`接口有两个主要方法：`hasNext`和`next`，前者查询是否还有下一个元素，后者返回下一个元素。不同数据结构对这两个方法的实现不一致。

```java
public interface Iterator<E> {
    boolean hasNext(); // 是否有下一个元素
    E next(); // 返回下一个元素
    default void remove() { // 移除元素
        throw new UnsupportedOperationException("remove");
    }
    default void forEachRemaining(Consumer<? super E> action) { // 对剩余元素进行操作
        Objects.requireNonNull(action);
        while (hasNext()) {
            action.accept(next());
        }
    }
}
```

## Collection的三个子接口

### List接口

`List`是一个元素可重复的有序集合，可以通过下标操作集合内元素，增加了一些自定义的方法：

```java
public interface List<E> extends Collection<E> {
    void sort(Comparator<? super E> c); // 排序
    E get(int index); // 获取指定下标的元素
    E set(int index, E element); // 替换指定下标的元素
    int indexOf(Object o); // 返回第一次出现的下标
    int lastIndexOf(Object o); // 返回最后一次出现的下标
    List<E> subList(int fromIndex, int toIndex); // 提取子List
    ListIterator<E> listIterator(); // 返回迭代器
    ListIterator<E> listIterator(int index); // 返回指定位置的迭代器
}
```

### ListIterator接口

`ListIterator`继承自`Iterator`，在其基础上增加了方法，便于`List`的遍历和使用：

```java
public interface ListIterator<E> extends Iterator<E> {
    boolean hasNext(); // 是否有下一个元素
    E next(); // 返回下一个元素
    boolean hasPrevious(); // 是否有上一个元素
    E previous(); // 返回上一个元素
    int nextIndex(); // 下一个元素的索引
    int previousIndex(); // 上一个元素的索引
    void remove(); // 移除元素
    void set(E e); // 替换元素
    void add(E e); // 添加元素
}
```

### Vector类

`Vector`的底层是元素数组，具有以下重要属性：

```java
protected Object[] elementData; // 元素数组
protected int elementCount; // 当前数组中的元素个数
protected int capacityIncrement; // 扩容时容量增加数量
```

在插入元素时，先判定当前空间是否足够：

```java
public synchronized boolean add(E e) {
    modCount++;
    ensureCapacityHelper(elementCount + 1);
    elementData[elementCount++] = e;
    return true;
}
```

扩容方法：

```java
private void grow(int minCapacity) {
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + ((capacityIncrement > 0) ? capacityIncrement : oldCapacity);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

`Vector`是线程安全的，采用`sychronized`对成员函数加锁。

### Stack类

`Stack`继承自`Vector`，在基类的基础上实现了`push`、`pop`、`peek`等方法，实现了栈的功能，也是线程安全的。

```java
public class Stack<E> extends Vector<E> {
    public E push(E item) {
        addElement(item);
        return item;
    }

    public synchronized E pop() {
        E obj;
        int len = size();
        obj = peek();
        removeElementAt(len - 1);
        return obj;
    }

    public synchronized E peek() {
        int len = size();
        if (len == 0)
            throw new EmptyStackException();
        return elementAt(len - 1);
    }

    public boolean empty() {
        return size() == 0;
    }

    public synchronized int search(Object o) {
        int i = lastIndexOf(o);
        if (i >= 0) {
            return size() - i;
        }
        return -1;
    }
}
```

### ArrayList类

`ArrayList`的底层也是一个自动扩容数组，扩容为2倍（无法修改），是线程不安全的，性能较优：

```java
public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable {
    private static final int DEFAULT_CAPACITY = 10;
    private static final Object[] EMPTY_ELEMENTDATA = {};
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
    transient Object[] elementData; // non-private to simplify nested class access
    private int size;

    public boolean add(E e) {
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }
}
```

### LinkedList类

`LinkedList`是`List`接口的实现类，也实现了`Deque`接口，可以作为双端队列使用：

```java
public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, java.io.Serializable {
    transient int size = 0;
    transient Node<E> first;
    transient Node<E> last;

    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }

    public void addFirst(E e) {
        linkFirst(e);
    }

    private void linkFirst(E e) {
        final Node<E> f = first;
        final Node<E> newNode = new Node<>(null, e, f);
        first = newNode;
        if (f == null)
            last = newNode;
        else
            f.prev = newNode;
        size++;
        modCount++;
    }
}
```

### ArrayList与LinkedList性能对比

- **ArrayList**：随机访问效率高，插入、删除效率低。
- **Linked

### Set接口概述

`Set`是一个不允许重复元素的集合，接口定义与`Collection`几乎一样。其特点在于集合内部不能存在相同的元素，在第二次加入相同的元素时会提示错误。

### HashSet类

`HashSet`实质上是一个`HashMap`，在插入元素时，以元素作为键，并使用一个虚拟对象作为值：

```java
public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, java.io.Serializable {
    private transient HashMap<E,Object> map;
    private static final Object PRESENT = new Object();

    public HashSet() {
        map = new HashMap<>();
    }

    public boolean add(E e) {
        return map.put(e, PRESENT) == null;
    }
}
```

### EnumSet类

`EnumSet`是一个基于枚举类型的集合，可以通过静态工厂方法获取实例：

```java
public abstract class EnumSet<E extends Enum<E>> extends AbstractSet<E> implements Cloneable, java.io.Serializable {
    public static <E extends Enum<E>> EnumSet<E> noneOf(Class<E> elementType) {
        Enum<?>[] universe = getUniverse(elementType);
        if (universe == null)
            throw new ClassCastException(elementType + " not an enum");

        if (universe.length <= 64)
            return new RegularEnumSet<>(elementType, universe);
        else
            return new JumboEnumSet<>(elementType, universe);
    }
}
```

使用示例：

```java
public static <E extends Enum<E>> EnumSet<E> of(E e) {
    EnumSet<E> result = EnumSet.noneOf(e.getDeclaringClass());
    result.add(e);
    return result;
}
```

### TreeSet类

`TreeSet`基于`TreeMap`实现，具有排序功能。

---

## Queue接口

### Queue接口概述

`Queue`接口提供队列操作方法，包括出队和入队操作：

```java
public interface Queue<E> extends Collection<E> {
    boolean add(E e); // 将指定元素加入队列
    boolean offer(E e); // 提供元素
    E remove(); // 获取并移除队列头
    E poll(); // 获取并移除队列头，返回null如果队列为空
    E element(); // 获取队列头
    E peek(); // 获取队列头，返回null如果队列为空
}
```

### ArrayDeque类

`ArrayDeque`是基于数组实现的双端队列，扩容方法如下：

```java
private void doubleCapacity() {
    assert head == tail;
    int p = head;
    int n = elements.length;
    int r = n - p;
    int newCapacity = n << 1;
    if (newCapacity < 0)
        throw new IllegalStateException("Sorry, deque too big");
    Object[] a = new Object[newCapacity];
    System.arraycopy(elements, p, a, 0, r);
    System.arraycopy(elements, 0, a, r, p);
    elements = a;
    head = 0;
    tail = n;
}
```

### PriorityQueue类

`PriorityQueue`根据队列中元素大小进行排序，调用`peek`或`poll`时，返回最大或最小的元素。插入方法如下：

```java
private void siftUpComparable(int k, E x) {
    Comparable<? super E> key = (Comparable<? super E>) x;
    while (k > 0) {
        int parent = (k - 1) >>> 1;
        Object e = queue[parent];
        if (key.compareTo((E) e) >= 0)
            break;
        queue[k] = e;
        k = parent;
    }
    queue[k] = key;
}
```

---

# Map接口

### Map接口概述

`Map`接口提供通过键值对存储、查询和删除数据的方法：

```java
public interface Map<K,V> {
    int size();
    boolean isEmpty();
    boolean containsKey(Object key);
    boolean containsValue(Object value);
    V get(Object key);
    V put(K key, V value);
    V remove(Object key);
    void putAll(Map<? extends K, ? extends V> m);
    void clear();
    Set<K> keySet();
    Collection<V> values();
    Set<Map.Entry<K, V>> entrySet();
    default V putIfAbsent(K key, V value) { ... }
    default boolean replace(K key, V oldValue, V newValue) { ... }
    default V replace(K key, V value) { ... }
}
```

### Entry接口

在`Map`中，键值对用`Entry`对象存储：

```java
interface Entry<K,V> {
    K getKey();
    V getValue();
    V setValue(V value);
    boolean equals(Object o);
    int hashCode();
    static <K extends Comparable<? super K>, V> Comparator<Map.Entry<K,V>> comparingByKey() {
        return (Comparator<Map.Entry<K, V>> & Serializable) (c1, c2) -> c1.getKey().compareTo(c2.getKey());
    }
    static <K, V extends Comparable<? super V>> Comparator<Map.Entry<K,V>> comparingByValue() {
        return (Comparator<Map.Entry<K, V>> & Serializable) (c1, c2) -> c1.getValue().compareTo(c2.getValue());
    }
}
```

### HashMap类

`HashMap`采用数组+链表（红黑树）结构，使用哈希算法确定键值对的存放位置。以下是哈希表的插入逻辑：

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        Node<K,V> e; K k;
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    if (binCount >= TREEIFY_THRESHOLD - 1)
                        treeifyBin(tab, hash);
                    break;
                }
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        if (e != null) {
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount;
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict);
    return null;
}
```

### LinkedHashMap类

`LinkedHashMap`在`HashMap`基础上维护了一个双向链表，按插入顺序迭代：

```java
public class LinkedHashMap<K,V> extends HashMap<K,V> implements Map<K,V> {
    transient LinkedHashMap.Entry<K,V> head;
    transient LinkedHashMap.Entry<K,V> tail;

    public void afterNodeInsertion(boolean evict) {
        LinkedHashMap.Entry<K,V> first;
        if (accessOrder && (first = head) != null) {
            LinkedHashMap.Entry<K,V> last;
            LinkedHashMap.Entry<K,V> p = (LinkedHashMap.Entry<K,V>)last;
            first.before = p;
            if (p == null)
                first = p;
            else
                p.after = first;
            head = last;
            if (tail == null)
                tail = last;
        }
    }
}
```

### TreeMap类

`TreeMap`基于红黑树实现，按自然顺序或指定的`Comparator`排序：

```java
public class TreeMap<K,V> extends AbstractMap<K,V> implements NavigableMap<K,V>, Cloneable, java.io.Serializable {
    private final Comparator<? super K> comparator;
    private transient Entry<K,V> root;

    public V put(K key, V value) {
        Entry<K,V> t = root;
        if (t == null) {
            compare(key, key); // type (and possibly null) check
            root = new Entry<>(key, value, null);
            size = 1;
            modCount++;
            return null;
        }
        int cmp;
        Entry<K,V> parent;
        Comparator<? super K> cpr = comparator;
        if (cpr != null) {
            do {
                parent = t;
                cmp = cpr.compare(key, t.key);
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else
                    return t.setValue(value);
            } while (t != null);
        }
        else {
            if (key == null)
                throw new NullPointerException();
            Comparable<? super K> k = (Comparable<? super K>) key;
            do {
                parent = t;
                cmp = k.compareTo(t.key);
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else
                    return t.setValue(value);
            } while (t != null);
        }
        Entry<K,V> e = new Entry<>(key, value, parent);
        if (cmp < 0)
            parent.left = e;
        else
            parent.right = e;
        fixAfterInsertion(e);
        size++;
        modCount++;
        return null;
    }

    // 其他方法省略
}
```

### 判定相等

- **判定key相等**：通过`compareTo()`方法返回0，认为两个key相等。
- **判定value相等**：通过`equals()`方法返回true，认为两个value相等。

### TreeMap类的总结

- `TreeMap`在插入、删除和查询时的时间复杂度均为`O(log(n))`。
- 适用于需要按顺序存储键值对的场景。

---

### WeakHashMap类

`WeakHashMap`与`HashMap`相似，其特点在于`Entry`继承了`WeakReference`（弱引用），具备弱引用特性。当某个键值对不再被其他对象引用时，无论内存是否够用，GC都会对其进行回收。

```java
public class WeakHashMap<K,V> extends AbstractMap<K,V> implements Map<K,V> {
    private final Map<K,WeakReference<V>> map = new HashMap<>();

    public V put(K key, V value) {
        WeakReference<V> ref = new WeakReference<>(value);
        return map.put(key, ref);
    }

    public V get(Object key) {
        WeakReference<V> ref = map.get(key);
        return (ref == null) ? null : ref.get();
    }

    // 其他方法省略
}
```

示例：

```java
public class WeakHashMapExample {
    public static void main(String[] args) {
        String a = new String("a");
        String b = new String("b");
        Map<String, String> weakmap = new WeakHashMap<>();

        weakmap.put(a, "aaa");
        weakmap.put(b, "bbb");

        a = null;  // 将字符串对象“a”的引用取消
        System.gc();  // 触发GC

        Iterator<Map.Entry<String, String>> iter = weakmap.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry<String, String> entry = iter.next();
            System.out.println("weakmap: " + entry.getKey() + ": " + entry.getValue());
            // 只打印出 weakmap: b: bbb
        }
    }
}
```

### WeakHashMap的总结

- 适用于缓存，可以及时回收不需要的键值对。

---

### IdentityHashMap类

`IdentityHashMap`的主要区别在于：

1. **没有使用红黑树**。
2. **比较两个Key是否相同时，采用的是引用相同（reference-equality），而不是对象相同（object-equality）**。

```java
public class IdentityHashMap<K,V> extends AbstractMap<K,V> implements Map<K,V> {
    transient Object[] table;

    public V put(K key, V value) {
        int hash = System.identityHashCode(key);
        int index = hash & (table.length - 1);
        for (int i = index; i < table.length; i++) {
            if (table[i] == key || (table[i] == null && table[i + 1] == null)) {
                V oldValue = (V) table[i + 1];
                table[i + 1] = value;
                return oldValue;
            }
        }
        // 其他实现略
    }

    public V get(Object key) {
        int hash = System.identityHashCode(key);
        int index = hash & (table.length - 1);
        for (int i = index; i < table.length; i++) {
            if (table[i] == key) {
                return (V) table[i + 1];
            }
        }
        return null;
    }
}
```

### IdentityHashMap的总结

- 适用于需要引用相同的场景。
- 采用`==`进行比较，而不是`equals()`。

---

## 总结
### Map实现类的性能分析及适用场景

- **HashMap**：快速查询设计，适用于一般应用场景。
- **LinkedHashMap**：维护插入顺序，适用于需要按插入顺序遍历的场景。
- **TreeMap**：按自然顺序排序，适用于需要按顺序存储键值对的场景。
- **WeakHashMap**：具备弱引用特性，适用于缓存场景。
- **IdentityHashMap**：采用引用相同进行比较，适用于需要引用相同的场景。
### 如何选择

- **需要快速插入、删除元素**：使用`LinkedList`。
- **需要快速随机访问元素**：使用`ArrayList`。
- **单线程环境或单线程操作**：使用非同步类（如`ArrayList`）。
- **多线程环境且多个线程操作**：使用同步类（如`Vector`）。
- **需要按插入顺序遍历**：使用`LinkedHashMap`。
- **需要按自然顺序存储键值对**：使用`TreeMap`。
