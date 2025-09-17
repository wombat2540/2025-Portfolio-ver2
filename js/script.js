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
    
    // eye2는 조금만 움직임 (기존 유지)
    const maxDistance2 = Math.min(eyeRect.width, eyeRect.height) * 0.15;
    const clampedDistance2 = Math.min(distance, maxDistance2);
    
    const eye2X = Math.cos(angle) * (clampedDistance2 * 0.3);
    const eye2Y = Math.sin(angle) * (clampedDistance2 * 0.3);
    
    eye2.style.transform = `translate(calc(-50% + ${eye2X}px), calc(-50% + ${eye2Y}px))`;
    
    // eyeball과 circular-text는 조금 더 움직임 (중간값으로 조정)
    const maxDistanceGroup = Math.min(eyeRect.width, eyeRect.height) * 0.25; // 0.15와 0.35의 중간
    const clampedDistanceGroup = Math.min(distance, maxDistanceGroup);
    
    const groupX = Math.cos(angle) * (clampedDistanceGroup * 0.45); // 0.3과 0.6의 중간
    const groupY = Math.sin(angle) * (clampedDistanceGroup * 0.45);
    
    eyeball.style.transform = `translate(calc(-50% + ${groupX}px), calc(-50% + ${groupY}px))`;
    
    // 원형텍스트도 eyeball과 같이 움직임
    const rotationAngle = (Date.now() / 1000 * 15); // 12와 18의 중간
    circularText.style.transform = `translate(calc(-50% + ${groupX}px), calc(-50% + ${groupY}px)) rotate(${rotationAngle}deg)`;
    
    // pupil은 eyeball 내에서 독립적으로 추가 움직임
    const eyeballRect = eyeball.getBoundingClientRect();
    const eyeballCenterX = eyeballRect.left + eyeballRect.width / 2;
    const eyeballCenterY = eyeballRect.top + eyeballRect.height / 2;
    
    const pupilDeltaX = mouseX - eyeballCenterX;
    const pupilDeltaY = mouseY - eyeballCenterY;
    const pupilAngle = Math.atan2(pupilDeltaY, pupilDeltaX);
    const pupilDistance = Math.sqrt(pupilDeltaX * pupilDeltaX + pupilDeltaY * pupilDeltaY);
    
    const maxPupilDistance = (468 / 2) - (100 / 2) - 30;
    const clampedPupilDistance = Math.min(pupilDistance * 0.22, maxPupilDistance); // 0.15와 0.3의 중간
    
    const pupilX = groupX + Math.cos(pupilAngle) * clampedPupilDistance;
    const pupilY = groupY + Math.sin(pupilAngle) * clampedPupilDistance;
    
    pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
});

// 마우스가 화면을 벗어났을 때 중앙으로 복귀
document.addEventListener('mouseleave', () => {
    eye2.style.transform = 'translate(-50%, -50%)';
    eyeball.style.transform = 'translate(-50%, -50%)';
    pupil.style.transform = 'translate(-50%, -50%)';
    circularText.style.transform = 'translate(-50%, -50%) rotate(0deg)';
});

// 네비게이션 클릭 이벤트 (가장 간단한 버전)
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

// 섹션 감지 (기존 코드 유지)
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (scrollY < windowHeight * 0.8) {
        setActiveNav('section1');
    } else if (scrollY < windowHeight * 1.8) {
        setActiveNav('section2');
    } else {
        setActiveNav('section3');
    }
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

// 페이지 로드 시 첫 번째 네비게이션 활성화
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('[data-section="section1"]').classList.add('active');

});

// 모바일에서만 가로 스크롤 차단
if (window.innerWidth <= 480) {
    let scrollPosition = 0;
    
    window.addEventListener('scroll', () => {
        if (window.scrollX !== 0) {
            window.scrollTo(0, window.scrollY);
        }
    });
    
    // 터치 이벤트로 가로 스크롤 방지
    document.addEventListener('touchmove', (e) => {
        if (Math.abs(e.touches[0].clientX - e.touches[0].target.offsetLeft) > Math.abs(e.touches[0].clientY - e.touches[0].target.offsetTop)) {
            e.preventDefault();
        }
    }, { passive: false });
}
