package com.yash.leetcode;

import com.yash.leetcode.entity.Submission;
import com.yash.leetcode.factory.JudgeFactory;
import com.yash.leetcode.factory.UnsupportedLanguageException;
import com.yash.leetcode.judge.CppJudge;
import com.yash.leetcode.judge.JavaJudge;
import com.yash.leetcode.judge.Judge;
import com.yash.leetcode.judge.PythonJudge;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JudgeFactoryTest {

    @Test
    void returnsTheRightJudgeTypePerLanguage() {
        assertInstanceOf(JavaJudge.class, JudgeFactory.getJudge("java"));
        assertInstanceOf(PythonJudge.class, JudgeFactory.getJudge("Python"));
        assertInstanceOf(CppJudge.class, JudgeFactory.getJudge("CPP"));
    }

    @Test
    void throwsForAnUnknownLanguage() {
        assertThrows(UnsupportedLanguageException.class, () -> JudgeFactory.getJudge("ruby"));
    }

    @Test
    void evaluatesAPassingJavaSubmissionAsPassed() {
        Submission submission = new Submission("u1", "two-sum", "public class Solution {}", "java");
        Judge judge = JudgeFactory.getJudge(submission.getLanguage());
        assertTrue(judge.evaluate(submission));
    }

    @Test
    void evaluatesAMalformedSubmissionAsFailed() {
        Submission submission = new Submission("u2", "two-sum", "not really code", "python");
        Judge judge = JudgeFactory.getJudge(submission.getLanguage());
        assertFalse(judge.evaluate(submission));
    }
}
