// User Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });
    
    // Initialize dashboard
    initDashboard();
    
    // Load user data
    loadUserData();
    
    // Initialize charts
    initCharts();
    
    // Initialize animations
    initAnimations();
});

// Initialize Dashboard
function initDashboard() {
    // Set active section
    showSection('dashboard');
    
    // Initialize sidebar toggle for mobile
    initSidebarToggle();
    
    // Initialize search functionality
    initSearch();
}

// Load User Data
function loadUserData() {
    const userType = localStorage.getItem('userType');
    const username = localStorage.getItem('username');
    const fullName = localStorage.getItem('fullName');
    
    if (userType && username) {
        document.getElementById('userFullName').textContent = fullName || username;
        document.getElementById('userType').textContent = userType === 'admin' ? 'ادمین سیستم' : 'کاربر عضو عادی';
    } else {
        // Redirect to login if no user data
        window.location.href = '../index.html';
    }
}

// Initialize Charts
function initCharts() {
    // Activity Chart
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
        const activityChart = new Chart(activityCtx, {
            type: 'line',
            data: {
                labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
                datasets: [{
                    label: 'ساعات کاری',
                    data: [6, 8, 7, 9, 8, 5, 4],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'وظایف تکمیل شده',
                    data: [3, 5, 4, 7, 6, 3, 2],
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#b0b0b0'
                        },
                        grid: {
                            color: '#333'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#b0b0b0'
                        },
                        grid: {
                            color: '#333'
                        }
                    }
                }
            }
        });
    }
}

// Initialize Animations
function initAnimations() {
    // Animate stat numbers
    animateStatNumbers();
    
    // Initialize progress bars
    initProgressBars();
}

// Animate Stat Numbers
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Initialize Progress Bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 500);
    });
}

// Show Section
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionName);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.user-nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNav = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    // Update page title
    updatePageTitle(sectionName);
}

// Update Page Title
function updatePageTitle(sectionName) {
    const pageTitle = document.getElementById('pageTitle');
    const titles = {
        'dashboard': 'داشبورد',
        'profile': 'پروفایل',
        'projects': 'پروژه‌ها',
        'tasks': 'وظایف',
        'messages': 'پیام‌ها',
        'settings': 'تنظیمات'
    };
    
    if (pageTitle && titles[sectionName]) {
        pageTitle.textContent = titles[sectionName];
    }
}

// Initialize Sidebar Toggle
function initSidebarToggle() {
    const sidebar = document.getElementById('userSidebar');
    const toggleBtn = document.querySelector('.user-sidebar-toggle');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
}

// Toggle Sidebar (Mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('userSidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

// Initialize Search
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            // Implement search functionality here
            console.log('Searching for:', query);
        });
    }
}

// Save Profile
function saveProfile() {
    const fullName = document.getElementById('profileFullName').value;
    const username = document.getElementById('profileUsername').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    const bio = document.getElementById('profileBio').value;
    
    // Validate inputs
    if (!fullName || !username || !email) {
        showNotification('لطفاً فیلدهای ضروری را پر کنید', 'error');
        return;
    }
    
    // Simulate save
    showNotification('در حال ذخیره...', 'info');
    
    setTimeout(() => {
        // Update localStorage
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('username', username);
        
        // Update display
        document.getElementById('userFullName').textContent = fullName;
        
        showNotification('پروفایل با موفقیت ذخیره شد', 'success');
    }, 1000);
}

// Toggle Setting
function toggleSetting(toggle) {
    toggle.classList.toggle('active');
    
    const settingName = toggle.previousElementSibling.textContent;
    const isActive = toggle.classList.contains('active');
    
    showNotification(`${settingName} ${isActive ? 'فعال' : 'غیرفعال'} شد`, 'info');
}

// Logout
function logout() {
    // Clear user data
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    
    // Show logout message
    showNotification('در حال خروج...', 'info');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

// Show Notification
function showNotification(message, type = 'info') {
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

// Get Notification Icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'x-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Add notification styles if not already present
if (!document.querySelector('#notification-styles')) {
    const notificationStyles = document.createElement('style');
    notificationStyles.id = 'notification-styles';
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
}

// Export functions for global access
window.showSection = showSection;
window.toggleSidebar = toggleSidebar;
window.saveProfile = saveProfile;
window.toggleSetting = toggleSetting;
window.logout = logout;
