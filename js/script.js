const eye2 = document.querySelector('.eye2');
const eyeball = document.getElementById('eyeball');
const pupil = document.querySelector('.pupil');
const circularText = document.querySelector('.circular-text');
const eye = document.getElementById('eye');

document.addEventListener('mousemove', (e) => {
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxDistance2 = Math.min(eyeRect.width, eyeRect.height) * 0.15;
    const clampedDistance2 = Math.min(distance, maxDistance2);

    const eye2X = Math.cos(angle) * (clampedDistance2 * 0.3);
    const eye2Y = Math.sin(angle) * (clampedDistance2 * 0.3);

    eye2.style.transform = `translate(calc(-50% + ${eye2X}px), calc(-50% + ${eye2Y}px))`;

    const maxDistanceGroup = Math.min(eyeRect.width, eyeRect.height) * 0.25;
    const clampedDistanceGroup = Math.min(distance, maxDistanceGroup);

    const groupX = Math.cos(angle) * (clampedDistanceGroup * 0.45);
    const groupY = Math.sin(angle) * (clampedDistanceGroup * 0.45);

    eyeball.style.transform = `translate(calc(-50% + ${groupX}px), calc(-50% + ${groupY}px))`;

    const rotationAngle = (Date.now() / 1000 * 15);
    circularText.style.transform = `translate(calc(-50% + ${groupX}px), calc(-50% + ${groupY}px)) rotate(${rotationAngle}deg)`;

    const eyeballRect = eyeball.getBoundingClientRect();
    const eyeballCenterX = eyeballRect.left + eyeballRect.width / 2;
    const eyeballCenterY = eyeballRect.top + eyeballRect.height / 2;

    const pupilDeltaX = mouseX - eyeballCenterX;
    const pupilDeltaY = mouseY - eyeballCenterY;
    const pupilAngle = Math.atan2(pupilDeltaY, pupilDeltaX);
    const pupilDistance = Math.sqrt(pupilDeltaX * pupilDeltaX + pupilDeltaY * pupilDeltaY);

    const maxPupilDistance = (468 / 2) - (100 / 2) - 30;
    const clampedPupilDistance = Math.min(pupilDistance * 0.22, maxPupilDistance);

    const pupilX = groupX + Math.cos(pupilAngle) * clampedPupilDistance;
    const pupilY = groupY + Math.sin(pupilAngle) * clampedPupilDistance;

    pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
});

document.addEventListener('mouseleave', () => {
    eye2.style.transform = 'translate(-50%, -50%)';
    eyeball.style.transform = 'translate(-50%, -50%)';
    pupil.style.transform = 'translate(-50%, -50%)';
    circularText.style.transform = 'translate(-50%, -50%) rotate(0deg)';
});

// 네비게이션
document.querySelectorAll('.header span').forEach(navItem => {
    navItem.addEventListener('click', () => {
        const targetSection = navItem.getAttribute('data-section');
        const targetElement = document.getElementById(targetSection);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = ['section1', 'section2', 'section3'];
    const windowHeight = window.innerHeight;
    let currentSection = 'section1';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            
            // 섹션이 화면 중앙에 있으면 활성화
            if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
                currentSection = sectionId;
            }
        }
    });
    
    setActiveNav(currentSection);
});

function setActiveNav(sectionId) {
    document.querySelectorAll('.header span').forEach(item => {
        item.classList.remove('active');
    });

    const activeItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('[data-section="section1"]').classList.add('active');
});

// 모바일 가로 스크롤 차단
if (window.innerWidth <= 480) {
    window.addEventListener('scroll', () => {
        if (window.scrollX !== 0) {
            window.scrollTo(0, window.scrollY);
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (Math.abs(e.touches[0].clientX - e.touches[0].target.offsetLeft) > Math.abs(e.touches[0].clientY - e.touches[0].target.offsetTop)) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ------- 커서 요소 생성 ------- //
const mainDot = document.createElement("div");
mainDot.classList.add("custom-cursor-dot");
document.body.appendChild(mainDot);

// 꼬리 물방울 생성
const trailCount = 6;
const trails = [];
const trailPositions = [];

for (let i = 0; i < trailCount; i++) {
  const t = document.createElement("div");
  t.classList.add("custom-cursor-trail");
  document.body.appendChild(t);

  trails.push(t);
  trailPositions.push({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let lastMoveX = mouseX;
let lastMoveY = mouseY;
let lastMoveTime = performance.now();

//  호버 상태 플래그
let isHovering = false;

// 마우스 움직임
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lastMoveTime = performance.now();
});

// ─────────────────────────────
// 호버 타겟: 텍스트, 이미지, 버튼 등
// ─────────────────────────────
const hoverTargets = document.querySelectorAll(
  "a, button, span"
);

hoverTargets.forEach((el) => {
  el.addEventListener("pointerenter", () => {
    isHovering = true;
  });
  el.addEventListener("pointerleave", () => {
    isHovering = false;
  });
});

// ─────────────────────────────
// 애니메이션 루프
// ─────────────────────────────
function animate() {
  const now = performance.now();

  const dx = mouseX - lastMoveX;
  const dy = mouseY - lastMoveY;
  const speed = Math.sqrt(dx * dx + dy * dy);
  const idleTime = now - lastMoveTime;

  // ─ 메인 물방울: idle wobble ─
  let wobbleX = 0;
  let wobbleY = 0;
  let wobbleScale = 1;

  if (idleTime > 150 && speed < 0.2) {
    wobbleX = Math.sin(now / 260) * 4;
    wobbleY = Math.cos(now / 290) * 4;
    wobbleScale = 1 + Math.sin(now / 400) * 0.05;
  }

  const mainBaseX = mouseX - 14 + wobbleX; // 28 / 2
  const mainBaseY = mouseY - 14 + wobbleY;

  // 호버 시 4px 정도 커지게 (28px → 약 32px)
  const hoverScale = isHovering ? 1.15 : 1;
  const finalMainScale = wobbleScale * hoverScale;

  mainDot.style.transform = `translate3d(${mainBaseX}px, ${mainBaseY}px, 0) scale(${finalMainScale})`;

  // 호버 시 살짝 투명해지게
  mainDot.style.opacity = isHovering ? 0.4 : 1;

  // ─ 꼬리 물방울들 ─
  let prevX = mouseX;
  let prevY = mouseY;

  for (let i = 0; i < trailCount; i++) {
    const pos = trailPositions[i];

    const baseFollow = 0.4;
    const followStrength = baseFollow - i * 0.03;
    const lerp = Math.max(followStrength, 0.12);

    pos.x += (prevX - pos.x) * lerp;
    pos.y += (prevY - pos.y) * lerp;

    const trailX = pos.x - 14;
    const trailY = pos.y - 14;

    const baseScale = 1 - i * 0.05;
    const clampedScale = Math.max(baseScale, 0.65);

    // 꼬리도 호버 시 아주 살짝만 커지게
    const trailHoverScale = isHovering ? 0 : 1;
    const finalTrailScale = clampedScale * trailHoverScale;

    const baseOpacity = Math.max(0.9 - i * 0.06, 0.35);
    const finalOpacity = isHovering ? baseOpacity * 0.8 : baseOpacity;

    trails[i].style.transform = `translate3d(${trailX}px, ${trailY}px, 0) scale(${finalTrailScale})`;
    trails[i].style.opacity = finalOpacity;

    prevX = pos.x;
    prevY = pos.y;
  }

  lastMoveX = mouseX;
  lastMoveY = mouseY;

  requestAnimationFrame(animate);
}

animate();
// ------- 커서 요소 끝 ------- //

const sloganWrap = document.querySelector('.slogan-wrap');
const sloganTitle = document.querySelector('.slogan-title');
const sloganCircle = document.querySelector('.slogan-circle'); // 추가
const lines = document.querySelectorAll('.slogan .line');

if (sloganWrap && lines.length > 0) {
    window.addEventListener('scroll', () => {
        const section1 = document.getElementById('section1');
        const section1Rect = section1.getBoundingClientRect();
        
        const section1Height = section1.offsetHeight;
        const scrollInSection1 = -section1Rect.top;
        const progress = Math.max(0, Math.min(1, scrollInSection1 / section1Height));
        
        const sloganStart = 0.4;
        const sloganEnd = 0.5;
        
        if (progress >= sloganStart && progress <= sloganEnd) {
            const sloganProgress = (progress - sloganStart) / (sloganEnd - sloganStart);
            
            // 슬로건 원형 블러 나타남
            if (sloganCircle) {
                sloganCircle.classList.add('active');
            }
            
            // 슬로건 타이틀 먼저 변경
            if (sloganTitle) {
                if (sloganProgress >= 0) {
                    sloganTitle.classList.add('active');
                } else {
                    sloganTitle.classList.remove('active');
                }
            }
            
            // 각 라인을 순차적으로 활성화
            lines.forEach((line, index) => {
                const lineThreshold = (index + 0.3) / lines.length;
                
                if (sloganProgress >= lineThreshold) {
                    line.classList.add('active');
                } else {
                    line.classList.remove('active');
                }
            });
        } else if (progress > sloganEnd) {
            if (sloganCircle) sloganCircle.classList.add('active');
            if (sloganTitle) sloganTitle.classList.add('active');
            lines.forEach(line => line.classList.add('active'));
        } else {
            if (sloganCircle) sloganCircle.classList.remove('active');
            if (sloganTitle) sloganTitle.classList.remove('active');
            lines.forEach(line => line.classList.remove('active'));
        }
    });
}

// 섹션2 프로필 타이틀 페이드인
const profileTitle = document.querySelector('.profile-title');

if (profileTitle) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3 // 30% 보이면 활성화
    });
    
    observer.observe(profileTitle);
}
