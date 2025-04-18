// 恋爱计时器
const startDate = new Date("2025-02-04T00:00:00");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  document.getElementById("days").textContent = days.toString().padStart(2, '0');
  document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();

// 创建爱心飘落效果
function createHearts() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤";
  
  heart.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 20 + 10;
  heart.style.fontSize = size + "px";
  const duration = Math.random() * 5 + 5;
  heart.style.animationDuration = duration + "s";
  const opacity = Math.random() * 0.5 + 0.3;
  heart.style.opacity = opacity;
  const rotation = Math.random() * 360;
  heart.style.transform = `rotate(${rotation}deg)`;
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// 初始创建一些爱心
for (let i = 0; i < 20; i++) {
  setTimeout(createHearts, i * 300);
}

// 持续创建爱心
setInterval(createHearts, 800);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 导航栏高亮（方案三增强版）
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const navLink = document.querySelector(`.navbar-link[href="#${id}"]`);
    
    if (entry.isIntersecting) {
      document.querySelectorAll('.navbar-link').forEach(link => {
        link.classList.remove('active');
      });
      if (navLink) navLink.classList.add('active');
    }
  });
}, { 
  threshold: 0.6,
  rootMargin: '0px 0px -30% 0px' 
});

// 观察所有section
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// 默认高亮首页
if (window.location.hash) {
  const navLink = document.querySelector(`.navbar-link[href="${window.location.hash}"]`);
  if (navLink) navLink.classList.add('active');
} else {
  document.querySelector('.navbar-link[href="#home"]')?.classList.add('active');
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    document.querySelector('nav').classList.add('scrolled');
  } else {
    document.querySelector('nav').classList.remove('scrolled');
  }
});

// 图片模态框功能
function openModal(imgSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = 'block';
  modalImg.src = imgSrc;
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// 移动端触控反馈
document.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('touchstart', () => {
    link.style.transform = 'scale(0.95)';
  });
  link.addEventListener('touchend', () => {
    link.style.transform = '';
  });
});