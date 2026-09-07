/* ===== 表单验证功能 ===== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('表单验证模块已加载');
    
    // 登录表单处理
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('表单提交事件触发');
            
            // 获取表单数据
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            console.log('邮箱:', email);
            console.log('密码:', password);
            
            // 简单的验证
            let isValid = true;
            
            // 验证邮箱/用户名
            const emailInput = document.getElementById('loginEmail');
            emailInput.classList.remove('is-valid', 'is-invalid');
            if (!email.trim()) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.add('is-valid');
            }
            
            // 验证密码
            const passwordInput = document.getElementById('loginPassword');
            passwordInput.classList.remove('is-valid', 'is-invalid');
            if (!password.trim()) {
                passwordInput.classList.add('is-invalid');
                isValid = false;
            } else {
                passwordInput.classList.add('is-valid');
            }
            
            if (!isValid) {
                console.log('验证失败');
                return;
            }
            
            console.log('验证通过，尝试登录');
            
            // 显示加载状态
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>登录中...';
            submitBtn.disabled = true;
            
            // 模拟登录请求
            setTimeout(function() {
                // 测试账号
                const testAccount = 'test@rnb.com';
                const testPassword = '123456';
                
                if (email === testAccount && password === testPassword) {
                    // 登录成功
                    alert('登录成功！正在跳转到首页...');
                    
                    // 保存登录状态
                    const rememberMe = document.getElementById('rememberMe').checked;
                    if (rememberMe) {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userEmail', email);
                    } else {
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('userEmail', email);
                    }
                    
                    // 跳转到首页
                    setTimeout(function() {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    // 登录失败
                    alert('登录失败：用户名或密码错误');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 1000);
        });
    }
    
    // 输入时清除验证状态
    const inputs = document.querySelectorAll('#loginEmail, #loginPassword');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid', 'is-valid');
        });
    });
});