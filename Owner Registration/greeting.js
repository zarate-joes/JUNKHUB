document.addEventListener('DOMContentLoaded', function() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'welcome-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const logo = document.createElement('img');
    logo.src = 'https://c.animaapp.com/X9op69Wd/img/teallogo-2@2x.png';
    logo.alt = 'JunkHUB Logo';
    logo.className = 'modal-logo';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Welcome to JunkHUB!';
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    const welcomeMessage = document.createElement('p');
    welcomeMessage.innerHTML = 'Thank you for choosing to join our community of eco-conscious businesses. Setting up your shop on JunkHUB will help connect you with customers looking for recyclable materials.';
    
    const stepsTitle = document.createElement('h3');
    stepsTitle.textContent = 'Quick Setup Guide:';
    
    const stepsList = document.createElement('ol');
    const steps = [
        'Fill in your shop details on this page',
        'Add the materials you collect or sell',
        'Review your information and launch your shop!'
    ];
    
    steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
    });
    
    const supportMessage = document.createElement('p');
    supportMessage.innerHTML = 'Need help? Contact our support team at <strong>support@junkhub.com</strong>';
    
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    
    const getStartedBtn = document.createElement('button');
    getStartedBtn.className = 'get-started-btn';
    getStartedBtn.textContent = 'Let\'s Get Started!';
    
    // Assemble the modal
    modalHeader.appendChild(logo);
    modalHeader.appendChild(modalTitle);
    
    modalBody.appendChild(welcomeMessage);
    modalBody.appendChild(stepsTitle);
    modalBody.appendChild(stepsList);
    modalBody.appendChild(supportMessage);
    
    modalFooter.appendChild(getStartedBtn);
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    
    modal.appendChild(modalContent);
    
    // Add the modal to the body
    document.body.appendChild(modal);
    
    // Show modal when page loads
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 500);
    
    // Close modal when user clicks close button or outside the modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    getStartedBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .welcome-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            width: 90%;
            max-width: 500px;
            padding: 2rem;
            position: relative;
            animation: slideDown 0.4s ease;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            color: #666;
            transition: color 0.3s ease;
        }
        
        .close-modal:hover {
            color: #000;
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #FFE664;
            padding-bottom: 1rem;
        }
        
        .modal-logo {
            width: 60px;
            height: 60px;
            margin-right: 1rem;
        }
        
        .modal-header h2 {
            color: #000;
            margin: 0;
            font-size: 1.8rem;
        }
        
        .modal-body {
            margin-bottom: 1.5rem;
        }
        
        .modal-body p {
            margin-bottom: 1rem;
            line-height: 1.6;
            color: #333;
        }
        
        .modal-body h3 {
            color: #000;
            margin: 1.5rem 0 0.75rem;
            font-size: 1.2rem;
        }
        
        .modal-body ol {
            margin-left: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .modal-body li {
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .modal-footer {
            display: flex;
            justify-content: center;
        }
        
        .get-started-btn {
            background-color: #FFE664;
            color: #000;
            border: none;
            border-radius: 4px;
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Poppins', sans-serif;
        }
        
        .get-started-btn:hover {
            background-color: #FFD700;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideDown {
            from { 
                opacity: 0;
                transform: translateY(-30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                padding: 1.5rem;
            }
            
            .modal-header {
                flex-direction: column;
                text-align: center;
            }
            
            .modal-logo {
                margin-right: 0;
                margin-bottom: 0.5rem;
            }
            
            .modal-header h2 {
                font-size: 1.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
});

document.getElementById('shopLogo').addEventListener('change', function(e) {
        const fileName = e.target.files[0]?.name || 'No file selected';
        document.getElementById('fileNameDisplay').textContent = fileName;
    });