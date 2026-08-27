package com.yash.leetcode;

import com.yash.leetcode.entity.Submission;
import com.yash.leetcode.factory.JudgeFactory;
import com.yash.leetcode.judge.Judge;

import java.util.List;

/** Small runnable demo: build a few submissions, judge each through the factory. */
public class Main {

    public static void main(String[] args) {
        List<Submission> submissions = List.of(
                new Submission("u1", "two-sum", "public class Solution { ... }", "java"),
                new Submission("u2", "two-sum", "def two_sum(nums, target): ...", "python"),
                new Submission("u3", "two-sum", "#include <vector>\nint main() { ... }", "cpp"),
                new Submission("u4", "two-sum", "not really code", "python")
        );

        for (Submission submission : submissions) {
            Judge judge = JudgeFactory.getJudge(submission.getLanguage());
            submission.setPassed(judge.evaluate(submission));
            System.out.println(submission);
        }
    }
}
