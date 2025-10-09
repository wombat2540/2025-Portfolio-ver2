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

// 커스텀 커서
const cursor = document.querySelector('.custom-cursor');

if (cursor) {
    let cursorX = 0;
    let cursorY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const speed = 0.15;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // 호버 요소
    const hoverElements = document.querySelectorAll('a, button, .project-item, .header span');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover'); // 클래스 추가
            cursor.style.width = '32px';
            cursor.style.height = '32px';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover'); // 클래스 제거
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        });
    });
}

const sloganWrap = document.querySelector('.slogan-wrap');
const sloganTitle = document.querySelector('.slogan-title'); // 타이틀 추가
const lines = document.querySelectorAll('.slogan .line');

if (sloganWrap && lines.length > 0) {
    window.addEventListener('scroll', () => {
        const section1 = document.getElementById('section1');
        const section1Rect = section1.getBoundingClientRect();
        
        const section1Height = section1.offsetHeight;
        const scrollInSection1 = -section1Rect.top;
        const progress = Math.max(0, Math.min(1, scrollInSection1 / section1Height));
        
        const sloganStart = 0.5;
        const sloganEnd = 0.85;
        
        if (progress >= sloganStart && progress <= sloganEnd) {
            const sloganProgress = (progress - sloganStart) / (sloganEnd - sloganStart);
            
            // 슬로건 타이틀 먼저 변경 (가장 먼저 시작)
            if (sloganTitle) {
                if (sloganProgress >= 0) {
                    sloganTitle.classList.add('active');
                } else {
                    sloganTitle.classList.remove('active');
                }
            }
            
            // 각 라인을 순차적으로 활성화
            lines.forEach((line, index) => {
                const lineThreshold = (index + 0.3) / lines.length; // 타이틀 다음에 시작
                
                if (sloganProgress >= lineThreshold) {
                    line.classList.add('active');
                } else {
                    line.classList.remove('active');
                }
            });
        } else if (progress > sloganEnd) {
            if (sloganTitle) sloganTitle.classList.add('active');
            lines.forEach(line => line.classList.add('active'));
        } else {
            if (sloganTitle) sloganTitle.classList.remove('active');
            lines.forEach(line => line.classList.remove('active'));
        }
    });
}
