// Admin Dashboard JavaScript

// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Global Variables
let currentSection = 'dashboard';
let charts = {};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const contentSections = document.querySelectorAll('.content-section');

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    showSection('dashboard');
});

// Setup Event Listeners
function setupEventListeners() {
    // Sidebar toggle for mobile
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('sidebar-toggle') || 
            e.target.closest('.sidebar-toggle')) {
            toggleSidebar();
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1200 && 
            !sidebar.contains(e.target) && 
            !e.target.classList.contains('sidebar-toggle') &&
            !e.target.closest('.sidebar-toggle')) {
            closeSidebar();
        }
    });

    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Sidebar Functions
function toggleSidebar() {
    sidebar.classList.toggle('show');
}

function closeSidebar() {
    sidebar.classList.remove('show');
}

function handleResize() {
    if (window.innerWidth > 1200) {
        closeSidebar();
    }
}

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }

    // Update navigation active state
    updateNavigationActiveState(sectionId);

    // Update page title
    updatePageTitle(sectionId);

    // Initialize section specific features
    initializeSectionFeatures(sectionId);

    // Close sidebar on mobile
    if (window.innerWidth <= 1200) {
        closeSidebar();
    }
}

function updateNavigationActiveState(sectionId) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-link').forEach(link => {
        link.parentElement.classList.remove('active');
    });

    // Add active class to current nav item
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.parentElement.classList.add('active');
    }
}

function updatePageTitle(sectionId) {
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const titles = {
            'dashboard': 'داشبورد',
            'users': 'مدیریت کاربران',
            'analytics': 'تحلیل‌ها',
            'settings': 'تنظیمات',
            'reports': 'گزارشات',
            'logs': 'لاگ‌ها'
        };
        pageTitle.textContent = titles[sectionId] || 'داشبورد';
    }
}

// Initialize Charts
function initializeCharts() {
    // User Chart
    const userChartCtx = document.getElementById('userChart');
    if (userChartCtx) {
        charts.userChart = new Chart(userChartCtx, {
            type: 'line',
            data: {
                labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
                datasets: [{
                    label: 'کاربران جدید',
                    data: [65, 78, 90, 85, 95, 110],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'کاربران فعال',
                    data: [45, 52, 68, 72, 78, 85],
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
                            color: '#ffffff'
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

    // Analytics Chart
    const analyticsChartCtx = document.getElementById('analyticsChart');
    if (analyticsChartCtx) {
        charts.analyticsChart = new Chart(analyticsChartCtx, {
            type: 'bar',
            data: {
                labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
                datasets: [{
                    label: 'بازدید',
                    data: [1200, 1900, 3000, 5000, 2000, 3000, 4000],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(78, 205, 196, 0.8)',
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(156, 39, 176, 0.8)',
                        'rgba(76, 175, 80, 0.8)',
                        'rgba(255, 87, 34, 0.8)'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
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

// Initialize Section Features
function initializeSectionFeatures(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            // Refresh dashboard data
            refreshDashboardData();
            break;
        case 'users':
            // Initialize user management
            initializeUserManagement();
            break;
        case 'analytics':
            // Refresh analytics
            refreshAnalytics();
            break;
        case 'settings':
            // Load settings
            loadSettings();
            break;
        case 'reports':
            // Initialize reports
            initializeReports();
            break;
        case 'logs':
            // Load logs
            loadLogs();
            break;
    }
}

// Dashboard Functions
function refreshDashboardData() {
    // Simulate data refresh
    console.log('Refreshing dashboard data...');
    
    // Update stat numbers with animation
    animateStatNumbers();
}

function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        if (!isNaN(numericValue)) {
            animateNumber(stat, 0, numericValue, 1000);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// User Management Functions
function initializeUserManagement() {
    console.log('Initializing user management...');
    
    // Add event listeners for user actions
    document.querySelectorAll('.btn-outline-primary').forEach(btn => {
        if (btn.textContent.includes('ویرایش')) {
            btn.addEventListener('click', function() {
                showEditUserModal(this);
            });
        }
    });
    
    document.querySelectorAll('.btn-outline-danger').forEach(btn => {
        if (btn.textContent.includes('حذف')) {
            btn.addEventListener('click', function() {
                showDeleteUserModal(this);
            });
        }
    });
}

function showAddUserModal() {
    // Create and show add user modal
    const modal = `
        <div class="modal fade" id="addUserModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content dark-modal">
                    <div class="modal-header">
                        <h5 class="modal-title">افزودن کاربر جدید</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addUserForm">
                            <div class="mb-3">
                                <label class="form-label">نام کامل</label>
                                <input type="text" class="form-control dark-input" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">نام کاربری</label>
                                <input type="text" class="form-control dark-input" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ایمیل</label>
                                <input type="email" class="form-control dark-input" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">نوع کاربر</label>
                                <select class="form-select dark-input" required>
                                    <option value="">انتخاب کنید</option>
                                    <option value="admin">ادمین</option>
                                    <option value="user">کاربر</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">انصراف</button>
                        <button type="submit" form="addUserForm" class="btn btn-primary">افزودن کاربر</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('addUserModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Show modal
    const modalElement = document.getElementById('addUserModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
    
    // Handle form submission
    document.getElementById('addUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Adding new user...');
        bootstrapModal.hide();
    });
}

function showEditUserModal(button) {
    const row = button.closest('tr');
    const username = row.cells[0].textContent;
    const email = row.cells[1].textContent;
    
    alert(`ویرایش کاربر: ${username}\nایمیل: ${email}`);
}

function showDeleteUserModal(button) {
    const row = button.closest('tr');
    const username = row.cells[0].textContent;
    
    if (confirm(`آیا از حذف کاربر "${username}" اطمینان دارید؟`)) {
        // Handle delete logic here
        console.log(`Deleting user: ${username}`);
        row.remove();
    }
}

// Analytics Functions
function refreshAnalytics() {
    console.log('Refreshing analytics...');
    
    // Update charts if they exist
    if (charts.analyticsChart) {
        charts.analyticsChart.update();
    }
}

// Settings Functions
function loadSettings() {
    console.log('Loading settings...');
    
    // Load current settings from localStorage or API
    const settings = {
        systemName: 'FlexiJSON Panel',
        language: 'فارسی',
        timezone: 'Asia/Tehran'
    };
    
    // Populate form fields
    const systemNameInput = document.querySelector('input[value="FlexiJSON Panel"]');
    if (systemNameInput) {
        systemNameInput.value = settings.systemName;
    }
}

// Reports Functions
function initializeReports() {
    console.log('Initializing reports...');
    
    // Add event listeners for report downloads
    document.querySelectorAll('.report-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportType = this.closest('.report-card').querySelector('h6').textContent;
            downloadReport(reportType);
        });
    });
}

function downloadReport(reportType) {
    console.log(`Downloading report: ${reportType}`);
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${reportType}_${new Date().toISOString().split('T')[0]}.pdf`;
    link.click();
    
    // Show success message
    showNotification(`گزارش ${reportType} با موفقیت دانلود شد`, 'success');
}

// Logs Functions
function loadLogs() {
    console.log('Loading logs...');
    
    // Simulate loading logs from API
    const logs = [
        { time: '14:30:25', level: 'ERROR', message: 'خطا در اتصال به پایگاه داده' },
        { time: '14:25:10', level: 'WARNING', message: 'فضای دیسک کم است' },
        { time: '14:20:00', level: 'INFO', message: 'سیستم راه‌اندازی شد' }
    ];
    
    // Populate logs
    const logContainer = document.querySelector('.log-container');
    if (logContainer) {
        logContainer.innerHTML = logs.map(log => `
            <div class="log-entry log-${log.level.toLowerCase()}">
                <span class="log-time">${log.time}</span>
                <span class="log-level">${log.level}</span>
                <span class="log-message">${log.message}</span>
            </div>
        `).join('');
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function logout() {
    if (confirm('آیا از خروج از سیستم اطمینان دارید؟')) {
        // Clear session/localStorage
        localStorage.removeItem('adminToken');
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = '../index.html';
    }
}

// Export functions for global access
window.showSection = showSection;
window.toggleSidebar = toggleSidebar;
window.showAddUserModal = showAddUserModal;
window.logout = logout;

// Console welcome message
console.log(`
%cFlexiJSON Admin Panel
%cWelcome to the admin dashboard! 🔐
%cVersion: 1.0.0 | Built with ❤️
`, 
'color: #00d4ff; font-size: 24px; font-weight: bold;',
'color: #ffffff; font-size: 16px;',
'color: #666; font-size: 12px;'
);
