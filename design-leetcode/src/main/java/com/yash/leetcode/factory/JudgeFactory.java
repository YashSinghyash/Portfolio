package com.yash.leetcode.factory;

import com.yash.leetcode.judge.CppJudge;
import com.yash.leetcode.judge.JavaJudge;
import com.yash.leetcode.judge.Judge;
import com.yash.leetcode.judge.PythonJudge;

import java.util.Locale;
import java.util.Map;
import java.util.function.Supplier;

/**
 * Centralizes "which Judge for which language" so that decision lives in
 * exactly one place. Callers never see the concrete Judge classes — they ask
 * for a language and get back a Judge, which is all the Strategy interface
 * requires of them.
 *
 * A new Judge instance is handed out per call (they're stateless and cheap);
 * if that ever changes, this is also the one place that would need to start
 * caching/reusing instances.
 */
public final class JudgeFactory {

    private static final Map<String, Supplier<Judge>> JUDGES = Map.of(
            "java", JavaJudge::new,
            "python", PythonJudge::new,
            "cpp", CppJudge::new
    );

    private JudgeFactory() {
    }

    public static Judge getJudge(String language) {
        Supplier<Judge> supplier = JUDGES.get(language.toLowerCase(Locale.ROOT));
        if (supplier == null) {
            throw new UnsupportedLanguageException(language);
        }
        return supplier.get();
    }
}
