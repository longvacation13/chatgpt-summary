document.getElementById("activate").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.error("활성화된 탭을 찾을 수 없음.");
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                console.log("ChatGPT 목차 확장 프로그램 실행됨.");
                window.location.reload();
            }
        }).catch(err => console.error("스크립트 실행 오류:", err));
    });
});
