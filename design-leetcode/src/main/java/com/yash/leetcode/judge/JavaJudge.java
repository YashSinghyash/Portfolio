package com.yash.leetcode.judge;

import com.yash.leetcode.entity.Submission;

/**
 * Stands in for a real Java compile-and-run pipeline (javac -> java -> diff
 * output). The actual sandboxed execution is out of scope for this design
 * exercise; the heuristic below just needs to be deterministic so the demo
 * in Main is reproducible.
 */
public class JavaJudge implements Judge {

    @Override
    public boolean evaluate(Submission submission) {
        System.out.println("[JavaJudge] compiling with javac, running on JVM...");
        return submission.getCode() != null && submission.getCode().contains("class");
    }
}
