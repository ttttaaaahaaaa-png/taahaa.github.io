// آپلود عکس
document.getElementById('profileImage').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profileImage').src = e.target.result;
                localStorage.setItem('taahaaProfileImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});

// بارگذاری عکس ذخیره شده
window.addEventListener('load', function() {
    const saved = localStorage.getItem('taahaaProfileImage');
    if (saved) {
        document.getElementById('profileImage').src = saved;
    }
});