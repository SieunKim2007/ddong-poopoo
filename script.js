// 🍎 과일 종류 정의 (일반 + 희귀)
const fruits = [
  { emoji: "💩", weight: 120 },
  { emoji: "🟤", weight: 100 },
  { emoji: "🟫", weight: 90 },
  { emoji: "🤎", weight: 110 },
  { emoji: "🖤", weight: 80 },
  // 희귀 과일 (확률 낮음)
  { emoji: "💎", weight: 200, rare: true, special: true },
  { emoji: "🌟", weight: 250, rare: true, special: true },
  { emoji: "💨", weight: 0, rare: true, special: true } // 초희귀
];

let totalWeight = 0;

// 🍓 과일 떨어뜨리기 버튼
document.getElementById("dropBtn").addEventListener("click", dropFruit);

function dropFruit() {
  // 1. 랜덤 과일 선택
  const isRare = Math.random() < 0.05; // 10% 확률로 희귀
  const fruitList = isRare 
    ? fruits.filter(f => f.rare === true)
    : fruits.filter(f => !f.rare);
  const fruit = fruitList[Math.floor(Math.random() * fruitList.length)];

  // 2. 새 과일 요소 생성
  const fruitEl = document.createElement("div");
  fruitEl.className = "fruit";
  fruitEl.textContent = fruit.emoji;

  // 3. 초기 위치: 화면 위쪽 랜덤 X 좌표
  const sky = document.getElementById("sky");
  const startX = Math.random() * (sky.clientWidth - 40);
  fruitEl.style.left = `${startX}px`;
  fruitEl.style.top = `-50px`;
  sky.appendChild(fruitEl);

  // 4. 떨어지는 애니메이션
  const groundY = sky.clientHeight - 30;
  fruitEl.style.transition = "transform 1.5s linear";
  fruitEl.style.transform = `translateY(${groundY}px)`;

  // 5. 쌓이기 + 카운트 업데이트
  setTimeout(() => {
    // 스페셜 과일이면 별도 처리
    if (fruit.special) {
      showSpecialPopup(fruit);
      fruitEl.remove();
    } else {
      fruitEl.style.transition = "none";         // 애니메이션 종료
      fruitEl.style.transform = `translateY(${groundY}px)`; // 최종 위치 유지
      totalWeight += fruit.weight;
      updateWeight();
    }
  }, 1500);
}

// 💎 스페셜 과일 팝업 (버리기 / 간직하기)
function showSpecialPopup(fruit) {
  const choice = confirm(`${fruit.emoji} 희귀 아이템 등장!\n간직하시겠어요?`);
  if (choice) {
    alert(`${fruit.emoji}를 간직했습니다!`);
  } else {
    alert(`${fruit.emoji}를 버렸습니다...`);
  }
}

// ⚖️ 무게 업데이트
function updateWeight() {
  document.getElementById("weight").textContent = `총 무게: ${totalWeight.toLocaleString()} g`;
}

#ground { z-index: 1; }
.fruit { z-index: 2; }
