package com.yash.leetcode.judge;

import com.yash.leetcode.entity.Submission;

/**
 * Strategy interface: one judging algorithm per language, all interchangeable
 * behind this single method. Adding a new language means adding a new class
 * that implements this interface — nothing here, or in JudgeFactory's callers,
 * has to change.
 */
public interface Judge {

    boolean evaluate(Submission submission);
}
