// ======================================
// PatternLock-v2
// auth.js Part1
// ======================================

const STORAGE_KEY = "patternLockPassword";

let firstPattern = null;

// --------------------
// 保存
// --------------------
function savePattern(pattern) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(pattern)
    );
}

// --------------------
// 読み込み
// --------------------
function loadPattern() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return null;

    return JSON.parse(data);
}

// --------------------
// 登録済みか判定
// --------------------
function hasPattern() {

    return loadPattern() !== null;
}

// --------------------
// 配列比較
// --------------------
function isSamePattern(a, b) {

    if (!a || !b) return false;

    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {

        if (a[i] !== b[i]) {
            return false;
        }

    }

    return true;
}

// ======================================
// 初回登録
// ======================================
function registerPattern(pattern) {

    // 1回目
    if (firstPattern === null) {

        firstPattern = [...pattern];

        message.style.color = "#2563eb";
        message.textContent =
            "もう一度同じパターンを入力してください";

        clearPattern();

        return;
    }

    // 2回目
    if (isSamePattern(firstPattern, pattern)) {

        savePattern(pattern);

        firstPattern = null;

        message.style.color = "#16a34a";
        message.textContent =
            "パターンを登録しました";

    } else {

        firstPattern = null;

        message.style.color = "#dc2626";
        message.textContent =
            "一致しません。最初からやり直してください";
    }

    clearPattern();
}
// ======================================
// ログイン認証
// ======================================
function loginPattern(pattern) {

    const saved = loadPattern();

    if (!saved) {

        message.style.color = "#dc2626";
        message.textContent = "登録されたパターンがありません";
        clearPattern();
        return false;
    }

    if (isSamePattern(saved, pattern)) {

        message.style.color = "#16a34a";
        message.textContent = "ログイン成功";

        // ログイン成功後の処理
        // 例:
        // window.location.href = "home.html";

        clearPattern();

        return true;

    } else {

        message.style.color = "#dc2626";
        message.textContent = "パターンが違います";

        clearPattern();

        return false;
    }
}

// ======================================
// メイン処理
// ======================================
function authenticate(pattern) {

    if (!hasPattern()) {
        registerPattern(pattern);
    } else {
        loginPattern(pattern);
    }
}
