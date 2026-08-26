package com.yash.lrucache.core;

import java.util.HashMap;
import java.util.Map;

/**
 * Classic LRU cache: HashMap&lt;K, Node&gt; for O(1) lookup + a doubly linked list
 * for O(1) reordering/eviction. Most-recently-used sits right after {@code head};
 * least-recently-used sits right before {@code tail}.
 *
 * <p>Thread-safety: methods are {@code synchronized} because Spring MVC serves
 * requests on a thread pool, and this cache is shared mutable state (the map
 * and the linked list both get mutated on every get/put). A coarse lock is fine
 * for a single-instance demo; it would NOT be fine for a real distributed cache
 * — that needs sharding/partitioning across nodes and a replication or
 * consistent-hashing strategy (e.g. Redis Cluster), not just a bigger lock.
 */
public class LRUCache<K, V> {

    private final int capacity;
    private final Map<K, Node<K, V>> map;
    private final Node<K, V> head; // dummy sentinel, head.next = most recently used
    private final Node<K, V> tail; // dummy sentinel, tail.prev = least recently used

    public LRUCache(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("capacity must be > 0");
        }
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node<>(null, null);
        this.tail = new Node<>(null, null);
        head.next = tail;
        tail.prev = head;
    }

    public synchronized V get(K key) {
        Node<K, V> node = map.get(key);
        if (node == null) {
            return null;
        }
        moveToFront(node);
        return node.value;
    }

    public synchronized void put(K key, V value) {
        Node<K, V> existing = map.get(key);
        if (existing != null) {
            existing.value = value;
            moveToFront(existing);
            return;
        }

        Node<K, V> node = new Node<>(key, value);
        map.put(key, node);
        addToFront(node);

        if (map.size() > capacity) {
            Node<K, V> lru = tail.prev;
            removeNode(lru);
            map.remove(lru.key);
        }
    }

    public synchronized boolean remove(K key) {
        Node<K, V> node = map.remove(key);
        if (node == null) {
            return false;
        }
        removeNode(node);
        return true;
    }

    public synchronized int size() {
        return map.size();
    }

    public int capacity() {
        return capacity;
    }

    // --- doubly linked list helpers, all O(1) ---

    private void addToFront(Node<K, V> node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToFront(Node<K, V> node) {
        removeNode(node);
        addToFront(node);
    }
}
