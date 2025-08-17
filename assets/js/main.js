// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });
    
    // Initialize Canvas
    initCanvas();
    
    // Initialize form handlers
    initFormHandlers();
});

// Canvas Animation
function initCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Set canvas size to viewport
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Initial resize
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    function createParticles() {
        particles.length = 0; // Clear existing particles
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000); // Adaptive particle count
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? 'rgba(0, 212, 255, ' : 'rgba(78, 205, 196, '
            });
        }
    }
    
    // Create initial particles
    createParticles();
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw gradient background
        const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.05)');
        gradient.addColorStop(0.5, 'rgba(78, 205, 196, 0.03)');
        gradient.addColorStop(1, 'rgba(255, 107, 107, 0.02)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color + particle.opacity + ')';
            ctx.fill();
        });
        
        // Draw connections between nearby particles
        drawConnections();
        
        requestAnimationFrame(animate);
    }
    
    function drawConnections() {
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.globalAlpha = 1 - (distance / 150);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
    }
    
    animate();
}

// Modal Functions
function showLoginModal() {
    // Show a general login modal or redirect to specific ones
    showUserLoginModal();
}

function showRegisterModal() {
    // Show a general register modal or redirect to specific ones
    showUserRegisterModal();
}

function showAdminLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
    modal.show();
}

function showAdminRegisterModal() {
    const modal = new bootstrap.Modal(document.getElementById('adminRegisterModal'));
    modal.show();
}

function showUserLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('userLoginModal'));
    modal.show();
}

function showUserRegisterModal() {
    const modal = new bootstrap.Modal(document.getElementById('userRegisterModal'));
    modal.show();
}

// Form Validation and Enhanced Functionality
function initFormHandlers() {
    // Admin Login Form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
        initFormValidation(adminLoginForm);
    }
    
    // Admin Register Form
    const adminRegisterForm = document.getElementById('adminRegisterForm');
    if (adminRegisterForm) {
        adminRegisterForm.addEventListener('submit', handleAdminRegister);
        initFormValidation(adminRegisterForm);
        initPasswordStrength('adminRegisterPassword', 'adminPasswordStrength');
    }
    
    // User Login Form
    const userLoginForm = document.getElementById('userLoginForm');
    if (userLoginForm) {
        userLoginForm.addEventListener('submit', handleUserLogin);
        initFormValidation(userLoginForm);
    }
    
    // User Register Form
    const userRegisterForm = document.getElementById('userRegisterForm');
    if (userRegisterForm) {
        userRegisterForm.addEventListener('submit', handleUserRegister);
        initFormValidation(userRegisterForm);
        initPasswordStrength('userRegisterPassword', 'userPasswordStrength');
    }
}

// Form Validation Initialization
function initFormValidation(form) {
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldValidation(input));
    });
}

// Field Validation
function validateField(input) {
    const formGroup = input.closest('.form-group');
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing validation classes
    formGroup.classList.remove('has-error', 'has-success');
    
    // Check if field is empty
    if (!input.value.trim()) {
        isValid = false;
        errorMessage = getFieldErrorMessage(input);
    } else {
        // Specific validation rules
        switch (input.type) {
            case 'email':
                if (!isValidEmail(input.value)) {
                    isValid = false;
                    errorMessage = 'لطفاً ایمیل معتبر وارد کنید';
                }
                break;
            case 'password':
                if (input.value.length < 8) {
                    isValid = false;
                    errorMessage = 'رمز عبور باید حداقل 8 کاراکتر باشد';
                }
                break;
        }
        
        // Check password confirmation
        if (input.id.includes('ConfirmPassword')) {
            const passwordField = input.id.replace('ConfirmPassword', 'Password');
            const password = document.getElementById(passwordField);
            if (password && input.value !== password.value) {
                isValid = false;
                errorMessage = 'رمز عبور و تکرار آن مطابقت ندارند';
            }
        }
    }
    
    // Apply validation state
    if (isValid) {
        formGroup.classList.add('has-success');
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    } else {
        formGroup.classList.add('has-error');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        
        // Show error message
        const feedback = formGroup.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = errorMessage;
        }
    }
    
    return isValid;
}

// Clear field validation
function clearFieldValidation(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('has-error', 'has-success');
    input.classList.remove('is-valid', 'is-invalid');
}

// Get field error message
function getFieldErrorMessage(input) {
    const fieldName = input.getAttribute('placeholder') || input.previousElementSibling?.textContent || 'این فیلد';
    return `لطفاً ${fieldName} را وارد کنید`;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password Strength Checker
function initPasswordStrength(passwordFieldId, strengthIndicatorId) {
    const passwordField = document.getElementById(passwordFieldId);
    const strengthIndicator = document.getElementById(strengthIndicatorId);
    
    if (passwordField && strengthIndicator) {
        passwordField.addEventListener('input', () => {
            const strength = checkPasswordStrength(passwordField.value);
            updatePasswordStrengthIndicator(strengthIndicator, strength);
        });
    }
}

// Check password strength
function checkPasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    
    if (score <= 1) return 'weak';
    if (score <= 2) return 'medium';
    if (score <= 3) return 'strong';
    return 'very-strong';
}

// Update password strength indicator
function updatePasswordStrengthIndicator(indicator, strength) {
    indicator.className = `password-strength ${strength}`;
}

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const toggle = field.nextElementSibling;
    const icon = toggle.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.className = 'bi bi-eye-slash';
    } else {
        field.type = 'password';
        icon.className = 'bi bi-eye';
    }
}

// Enhanced Admin Login Handler
function handleAdminLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate form
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('لطفاً تمام فیلدها را به درستی پر کنید', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    
    const username = document.getElementById('adminLoginUsername').value;
    const password = document.getElementById('adminLoginPassword').value;
    
    // Simulate login process
    setTimeout(() => {
        if (username && password) {
            showNotification('ورود موفقیت‌آمیز بود!', 'success');
            
            // Store admin session
            localStorage.setItem('userType', 'admin');
            localStorage.setItem('username', username);
            
            // Redirect to admin dashboard
            setTimeout(() => {
                window.location.href = 'admin/dashboard.html';
            }, 1500);
        } else {
            showNotification('نام کاربری یا رمز عبور اشتباه است', 'error');
        }
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }, 1500);
}

// Enhanced Admin Register Handler
function handleAdminRegister(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate form
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('لطفاً تمام فیلدها را به درستی پر کنید', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    
    const formData = {
        fullName: document.getElementById('adminRegisterFullName').value,
        username: document.getElementById('adminRegisterUsername').value,
        email: document.getElementById('adminRegisterEmail').value,
        password: document.getElementById('adminRegisterPassword').value,
        confirmPassword: document.getElementById('adminRegisterConfirmPassword').value
    };
    
    // Simulate registration process
    setTimeout(() => {
        showNotification('ثبت‌نام موفقیت‌آمیز بود!', 'success');
        
        // Store admin session
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('username', formData.username);
        localStorage.setItem('fullName', formData.fullName);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('adminRegisterModal'));
        modal.hide();
        
        // Redirect to admin dashboard
        setTimeout(() => {
            window.location.href = 'admin/dashboard.html';
        }, 1500);
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }, 1500);
}

// Enhanced User Login Handler
function handleUserLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate form
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('لطفاً تمام فیلدها را به درستی پر کنید', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    
    const username = document.getElementById('userLoginUsername').value;
    const password = document.getElementById('userLoginPassword').value;
    
    // Simulate login process
    setTimeout(() => {
        if (username && password) {
            showNotification('ورود موفقیت‌آمیز بود!', 'success');
            
            // Store user session
            localStorage.setItem('userType', 'user');
            localStorage.setItem('username', username);
            
            // Redirect to user dashboard
            setTimeout(() => {
                window.location.href = 'user/dashboard.html';
            }, 1500);
        } else {
            showNotification('نام کاربری یا رمز عبور اشتباه است', 'error');
        }
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }, 1500);
}

// Enhanced User Register Handler
function handleUserRegister(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate form
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('لطفاً تمام فیلدها را به درستی پر کنید', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    
    const formData = {
        fullName: document.getElementById('userRegisterFullName').value,
        username: document.getElementById('userRegisterUsername').value,
        email: document.getElementById('userRegisterEmail').value,
        password: document.getElementById('userRegisterPassword').value,
        confirmPassword: document.getElementById('userRegisterConfirmPassword').value
    };
    
    // Simulate registration process
    setTimeout(() => {
        showNotification('ثبت‌نام موفقیت‌آمیز بود!', 'success');
        
        // Store user session
        localStorage.setItem('userType', 'user');
        localStorage.setItem('username', formData.username);
        localStorage.setItem('fullName', formData.fullName);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('userRegisterModal'));
        modal.hide();
        
        // Redirect to user dashboard
        setTimeout(() => {
            window.location.href = 'user/dashboard.html';
        }, 1500);
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${getNotificationIcon(type)} me-2"></i>
            ${message}
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'x-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 15px 20px;
        color: var(--text-primary);
        box-shadow: var(--shadow-primary);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 9999;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #28a745;
    }
    
    .notification-error {
        border-left: 4px solid #dc3545;
    }
    
    .notification-warning {
        border-left: 4px solid #ffc107;
    }
    
    .notification-info {
        border-left: 4px solid #17a2b8;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
    }
`;
document.head.appendChild(notificationStyles);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize Floating Elements Animation with Anime.js
if (typeof anime !== 'undefined') {
    anime({
        targets: '.element',
        translateY: [-20, 20],
        rotate: [0, 360],
        duration: 6000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
}

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
%cFlexiJSON Panel
%cWelcome to the admin panel! 🚀
%cVersion: 1.0.0 | Built with ❤️
`, 
'color: #00d4ff; font-size: 24px; font-weight: bold;',
'color: #ffffff; font-size: 16px;',
'color: #666; font-size: 12px;'
);

// Export functions for global access
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;