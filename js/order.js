// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 初始化数量控制
    initQuantityControls();
    
    // 初始化购物车
    initCart();
    
    // 初始化表单验证
    initFormValidation();
    
    // 初始化成功弹窗
    initSuccessModal();
});

// 初始化数量控制
function initQuantityControls() {
    const controls = document.querySelectorAll('.quantity-control');
    
    controls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('.quantity-input');
        
        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value < 99) {
                input.value = value + 1;
            }
        });
        
        input.addEventListener('change', () => {
            let value = parseInt(input.value);
            if (isNaN(value) || value < 1) {
                input.value = 1;
            } else if (value > 99) {
                input.value = 99;
            }
        });
    });
}

// 初始化购物车
function initCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const price = card.querySelector('.product-price').textContent;
            const quantity = card.querySelector('.quantity-input').value;
            const config = card.querySelector('.config-select').value;
            
            // 这里可以添加购物车逻辑
            console.log('Added to cart:', {
                name,
                price,
                quantity,
                config
            });
            
            // 显示添加成功提示
            showToast('添加成功');
        });
    });
}

// 显示提示信息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 添加样式
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    
    // 添加动画
    toast.style.animation = 'fadeInUp 0.3s ease, fadeOut 0.3s ease 2.7s';
    
    // 3秒后移除
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
}

// 初始化表单验证
function initFormValidation() {
    const orderForm = document.getElementById('orderForm');
    const cooperationForm = document.getElementById('cooperationForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', validateOrderForm);
    }
    
    if (cooperationForm) {
        cooperationForm.addEventListener('submit', validateCooperationForm);
    }
}

// 验证订单表单
function validateOrderForm(e) {
    e.preventDefault();
    
    const form = e.target;
    let isValid = true;
    
    // 验证姓名
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
        showError(name, '请输入姓名');
        isValid = false;
    } else {
        clearError(name);
    }
    
    // 验证电话
    const phone = form.querySelector('#phone');
    if (!phone.value.trim()) {
        showError(phone, '请输入联系电话');
        isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone.value)) {
        showError(phone, '请输入有效的手机号码');
        isValid = false;
    } else {
        clearError(phone);
    }
    
    // 验证邮箱（如果填写）
    const email = form.querySelector('#email');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, '请输入有效的邮箱地址');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // 验证地址
    const address = form.querySelector('#address');
    if (!address.value.trim()) {
        showError(address, '请输入收货地址');
        isValid = false;
    } else {
        clearError(address);
    }
    
    // 验证支付方式
    const payment = form.querySelector('input[name="payment"]:checked');
    if (!payment) {
        showError(form.querySelector('.payment-method'), '请选择支付方式');
        isValid = false;
    } else {
        clearError(form.querySelector('.payment-method'));
    }
    
    if (isValid) {
        // 显示成功弹窗
        showSuccessModal();
        form.reset();
    }
}

// 验证合作表单
function validateCooperationForm(e) {
    e.preventDefault();
    
    const form = e.target;
    let isValid = true;
    
    // 验证公司名称
    const company = form.querySelector('#company');
    if (!company.value.trim()) {
        showError(company, '请输入公司名称');
        isValid = false;
    } else {
        clearError(company);
    }
    
    // 验证联系人
    const contact = form.querySelector('#contact');
    if (!contact.value.trim()) {
        showError(contact, '请输入联系人');
        isValid = false;
    } else {
        clearError(contact);
    }
    
    // 验证联系电话
    const contactPhone = form.querySelector('#contact-phone');
    if (!contactPhone.value.trim()) {
        showError(contactPhone, '请输入联系电话');
        isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(contactPhone.value)) {
        showError(contactPhone, '请输入有效的手机号码');
        isValid = false;
    } else {
        clearError(contactPhone);
    }
    
    // 验证合作类型
    const cooperationType = form.querySelector('#cooperation-type');
    if (!cooperationType.value) {
        showError(cooperationType, '请选择合作类型');
        isValid = false;
    } else {
        clearError(cooperationType);
    }
    
    if (isValid) {
        // 显示成功弹窗
        showSuccessModal();
        form.reset();
    }
}

// 显示错误信息
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    const errorDiv = formGroup.querySelector('.error-message');
    errorDiv.textContent = message;
}

// 清除错误信息
function clearError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    const errorDiv = formGroup.querySelector('.error-message');
    errorDiv.textContent = '';
}

// 初始化成功弹窗
function initSuccessModal() {
    const modal = document.getElementById('successModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// 显示成功弹窗
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // 添加动画
    const content = modal.querySelector('.modal-content');
    content.style.transform = 'translateY(0)';
    content.style.opacity = '1';
}

// 添加动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 