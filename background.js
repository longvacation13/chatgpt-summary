chrome.runtime.onInstalled.addListener(() => {
    console.log("ChatGPT 목차 확장 프로그램이 설치되었습니다.");
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            console.log("ChatGPT 확장 프로그램이 실행됨.");
            window.location.reload();
        }
    }).catch(err => console.error("스크립트 실행 오류:", err));
});
