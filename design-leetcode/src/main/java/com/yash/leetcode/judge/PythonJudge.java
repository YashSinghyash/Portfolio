package com.yash.leetcode.judge;

import com.yash.leetcode.entity.Submission;

/** Stands in for a real `python3 solution.py` run + output diff. See JavaJudge. */
public class PythonJudge implements Judge {

    @Override
    public boolean evaluate(Submission submission) {
        System.out.println("[PythonJudge] running with the CPython interpreter...");
        return submission.getCode() != null && submission.getCode().contains("def ");
    }
}
