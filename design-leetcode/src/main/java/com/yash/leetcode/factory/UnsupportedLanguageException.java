package com.yash.leetcode.factory;

/** Thrown by JudgeFactory when asked for a language it has no Judge for. */
public class UnsupportedLanguageException extends RuntimeException {

    public UnsupportedLanguageException(String language) {
        super("No judge registered for language: " + language);
    }
}
