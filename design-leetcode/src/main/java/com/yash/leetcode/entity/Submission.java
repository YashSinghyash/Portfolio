package com.yash.leetcode.entity;

/**
 * A single code submission awaiting judgement. Deliberately dumb — it holds
 * data, not judging logic, so it stays valid no matter how many languages
 * or judging strategies get added later (see judge.Judge).
 */
public class Submission {

    private final String userId;
    private final String problemId;
    private final String code;
    private final String language;
    private boolean passed;

    public Submission(String userId, String problemId, String code, String language) {
        this.userId = userId;
        this.problemId = problemId;
        this.code = code;
        this.language = language;
    }

    public String getUserId() {
        return userId;
    }

    public String getProblemId() {
        return problemId;
    }

    public String getCode() {
        return code;
    }

    public String getLanguage() {
        return language;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    @Override
    public String toString() {
        return "Submission{user=%s, problem=%s, lang=%s, passed=%s}"
                .formatted(userId, problemId, language, passed);
    }
}
