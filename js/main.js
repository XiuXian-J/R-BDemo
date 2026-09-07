/**
 * R&B音乐网站 - 主JavaScript文件
 * 文件名: main.js
 * 功能: 网站交互效果和动态功能
 */

// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 回到顶部功能
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 2. 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
    
    // 注意：这里已经移除了歌曲播放按钮功能
    // 播放按钮功能由 music_player.js 中的 setupSongCardButtons() 函数处理
    
    // 4. 轮播图指示器点击效果
    const carouselIndicators = document.querySelectorAll('.carousel-indicators button');
    carouselIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            // 移除所有激活状态
            carouselIndicators.forEach(ind => ind.classList.remove('active'));
            // 添加当前激活状态
            this.classList.add('active');
        });
    });
    
    // 5. 当前年份更新
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // 6. 初始化工具提示
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// 注意：playSongPreview 函数已删除
// 歌曲播放功能由 music_player.js 处理

/**
 * 表单验证函数（通用）
 * @param {HTMLFormElement} form - 表单元素
 * @returns {boolean} 验证是否通过
 */
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

/**
 * 添加页面加载动画
 */
function addPageLoadingAnimation() {
    // 创建加载动画元素
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">加载中...</span>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(loader);
    
    // 页面加载完成后移除
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 300);
        }, 500);
    });
}

// 调用页面加载动画
addPageLoadingAnimation();