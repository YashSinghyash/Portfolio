package com.yash.lrucache.core;

/**
 * Doubly linked list node used internally by {@link LRUCache}.
 * Package-private on purpose — it's an implementation detail, not part of the cache's API.
 */
class Node<K, V> {

    final K key;
    V value;
    Node<K, V> prev;
    Node<K, V> next;

    Node(K key, V value) {
        this.key = key;
        this.value = value;
    }
}
