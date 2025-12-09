// وقتی صفحه کاملاً لود شد
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. آپلود عکس پروفایل
    const profileImage = document.getElementById('profileImage');
    const uploadHint = document.querySelector('.upload-hint');
    
    profileImage.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                // بررسی سایز فایل (حداکثر 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('حجم فایل باید کمتر از 5 مگابایت باشد.');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    // نمایش عکس جدید
                    profileImage.src = e.target.result;
                    
                    // ذخیره در localStorage
                    localStorage.setItem('taahaaProfileImage', e.target.result);
                    
                    // نمایش پیام موفقیت
                    showNotification('عکس پروفایل با موفقیت تغییر کرد!', 'success');
                    
                    // پنهان کردن راهنمای آپلود
                    uploadHint.style.opacity = '0.5';
                    setTimeout(() => {
                        uploadHint.style.display = 'none';
                    }, 1000);
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });
    
    // 2. بارگذاری عکس ذخیره شده
    const savedImage = localStorage.getItem('taahaaProfileImage');
    if (savedImage) {
        profileImage.src = savedImage;
        uploadHint.style.display = 'none';
    }
    
    // 3. افکت‌های کارت‌های اجتماعی
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        // افکت هنگام هاور
        card.addEventListener('mouseenter', function() {
            const type = this.getAttribute('data-social');
            
            // ایجاد ذرات نورانی
            createSparkles(this, type);
            
            // افزایش سرعت انیمیشن حلقه
            const rotatingRing = document.querySelector('.rotating-ring');
            rotatingRing.style.animationDuration = '2s';
        });
        
        card.addEventListener('mouseleave', function() {
            // بازگشت به سرعت عادی
            const rotatingRing = document.querySelector('.rotating-ring');
            rotatingRing.style.animationDuration = '4s';
        });
        
        // کلیک روی کارت
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('social-link')) {
                const link = this.querySelector('.social-link');
                if (link) {
                    // باز کردن لینک در تب جدید
                    window.open(link.href, '_blank');
                    
                    // ثبت کلیک در localStorage (برای آمار)
                    let clicks = localStorage.getItem('socialClicks') || 0;
                    clicks = parseInt(clicks) + 1;
                    localStorage.setItem('socialClicks', clicks);
                }
            }
        });
    });
    
    // 4. ایجاد ذرات نورانی
    function createSparkles(element, type) {
        const colors = {
            instagram: ['#E4405F', '#F77737', '#FFDC80'],
            telegram: ['#0088CC', '#24A1DE', '#5BC0FF']
        };
        
        const sparkleCount = 8;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // موقعیت تصادفی
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // رنگ تصادفی از آرایه رنگ‌ها
            const color = colors[type][Math.floor(Math.random() * colors[type].length)];
            
            sparkle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                pointer-events: none;
                z-index: 10;
                animation: sparkleMove 1s ease-out forwards;
            `;
            
            element.appendChild(sparkle);
            
            // حذف بعد از انیمیشن
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }
    
    // 5. انیمیشن تایپ کردن در عنوان (افکت تایپ نویسی)
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            title.textContent = originalText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // شروع افکت تایپ بعد از 1 ثانیه
    setTimeout(() => {
        title.textContent = '';
        charIndex = 0;
        typeWriter();
    }, 1000);
    
    // 6. نمایش نوتیفیکیشن
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#FF6B8B'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // 7. اضافه کردن CSS برای انیمیشن‌های جدید
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleMove {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(180deg) translateY(-20px);
                opacity: 0;
            }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // 8. نمایش تعداد بازدید از شبکه‌های اجتماعی در کنسول
    console.log('%c👋 سلام! به صفحه taahaa خوش آمدید!', 'color: #ff6b8b; font-size: 16px; font-weight: bold;');
    console.log('%c📱 شبکه‌های اجتماعی من:', 'color: #118ab2;');
    console.log('- اینستاگرام: https://instagram.com/rav_en20_10');
    console.log('- تلگرام: https://t.me/LORD012120');
    
    // 9. ردیابی اسکرول برای افکت پارالاکس
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const profileContainer = document.querySelector('.profile-container');
        
        if (profileContainer) {
            const rate = scrolled * -0.5;
            profileContainer.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // 10. تشخیص زمان بازدید
    const visitTime = new Date().toLocaleString('fa-IR');
    localStorage.setItem('lastVisit', visitTime);
    
    // نمایش پیام خوش‌آمدگویی در اولین بازدید
    if (!localStorage.getItem('firstVisit')) {
        setTimeout(() => {
            showNotification('🎉 اولین بار است که از صفحه taahaa بازدید می‌کنید! خوش آمدید!', 'success');
            localStorage.setItem('firstVisit', 'true');
        }, 2000);
    }
});

// 11. انیمیشن‌های اضافی برای حلقه‌ها
function addRingAnimations() {
    const rotatingRing = document.querySelector('.rotating-ring');
    const rings = [rotatingRing];
    
    // اضافه کردن حلقه‌های بیشتر
    for (let i = 0; i < 2; i++) {
        const newRing = rotatingRing.cloneNode();
        newRing.style.width = `${115 + (i * 10)}%`;
        newRing.style.height = `${115 + (i * 10)}%`;
        newRing.style.animationDuration = `${4 + i * 2}s`;
        newRing.style.opacity = `${0.5 - (i * 0.2)}`;
        newRing.style.filter = 'blur(8px)';
        rotatingRing.parentNode.insertBefore(newRing, rotatingRing);
        rings.push(newRing);
    }
}

// اجرا بعد از لود کامل صفحه
window.onload = function() {
    addRingAnimations();
};