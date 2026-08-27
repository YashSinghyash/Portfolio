package com.yash.leetcode.judge;

import com.yash.leetcode.entity.Submission;

/** Stands in for a real g++ compile + binary execution + output diff. See JavaJudge. */
public class CppJudge implements Judge {

    @Override
    public boolean evaluate(Submission submission) {
        System.out.println("[CppJudge] compiling with g++, running the binary...");
        return submission.getCode() != null && submission.getCode().contains("#include");
    }
}
