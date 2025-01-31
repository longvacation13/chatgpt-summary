// 사이드바 생성 함수
const createSidebar = () => {
    let existingSidebar = document.getElementById("chatgpt-sidebar");
    let existingButton = document.getElementById("toggle-sidebar");

    if (existingSidebar) existingSidebar.remove();
    if (existingButton) existingButton.remove();

    // ChatGPT의 왼쪽 주제 요약 가져오기
    let chatTitle = document.querySelector("h1")?.innerText || "목차"; // h1이 없으면 기본값 "목차"

    // 사이드바 컨테이너 생성
    let sidebar = document.createElement("div");
    sidebar.id = "chatgpt-sidebar";
    sidebar.innerHTML = `
        <h3 id="sidebar-title">${chatTitle}</h3>  <!-- 여기서 주제 요약 넣기 -->
        <ul id="toc"></ul>
    `;
    document.body.appendChild(sidebar);

    // 토글 버튼 생성 (사이드바 외부에 추가)
    let toggleButton = document.createElement("button");
    toggleButton.id = "toggle-sidebar";
    toggleButton.innerText = "⏪";
    document.body.appendChild(toggleButton);

    // 토글 버튼 클릭 시 사이드바 접기/펼치기
    toggleButton.addEventListener("click", () => {
        if (sidebar.classList.contains("collapsed")) {
            sidebar.classList.remove("collapsed");
            toggleButton.innerText = "⏪"; // 펼친 상태
        } else {
            sidebar.classList.add("collapsed");
            toggleButton.innerText = "⏩"; // 접힌 상태
        }
    });
};
// ChatGPT 답변에서 제목(`h1, h2, h3`)을 찾아 목차 생성
const generateToc = () => {
    let tocList = document.getElementById("toc");
    tocList.innerHTML = "";

    // ChatGPT 페이지에서 답변이 표시되는 영역 찾기
    let chatGptResponses = document.querySelectorAll(".markdown");

    if (chatGptResponses.length === 0) {
        console.warn("ChatGPT 답변을 찾을 수 없음");
        return;
    }

    let headings = [];
    
    // 모든 응답에서 제목 요소 찾기
    chatGptResponses.forEach(response => {
        let foundHeadings = response.querySelectorAll("h1, h2, h3");
        
        if (foundHeadings.length > 0) {
            foundHeadings.forEach(h => headings.push(h));
        } else {
            // 제목이 없으면 첫 문장을 가져오기
            let firstText = response.innerText.trim().split("\n")[0].substring(0, 20); // 첫 20자
            if (firstText.length > 0) {
                let pseudoHeading = document.createElement("h3");
                pseudoHeading.innerText = firstText + "..."; // 생략 부호 추가
                response.prepend(pseudoHeading); // 문단 맨 앞에 가짜 제목 추가
                headings.push(pseudoHeading);
            }
        }
    });

    // 제목이 없으면 처리 중단
    if (headings.length === 0) {
        console.warn("제목을 찾을 수 없음");
        return;
    }

    headings.forEach((heading, index) => {
        let item = document.createElement("li");
        item.innerText = heading.innerText;
        item.style.cursor = "pointer";
        item.onclick = () => heading.scrollIntoView({ behavior: "smooth", block: "start" });
        tocList.appendChild(item);
    });

    console.log("목차 생성 완료:", headings.length, "개의 제목 발견");
};

// 실행하기
window.onload = () => {
    setTimeout(() => {
        createSidebar();
        generateToc();
    }, 2000);
};
