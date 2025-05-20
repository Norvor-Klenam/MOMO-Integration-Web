document.addEventListener('DOMContentLoaded', function() {
    // Initialize ad containers
    initAds();
    
    // Track video views for monetization
    setupVideoTracking();
    
    // Current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Login/signup buttons
    document.querySelector('.login').addEventListener('click', function() {
        alert('Login functionality would be implemented here');
    });
    
    document.querySelector('.signup').addEventListener('click', function() {
        alert('Signup functionality would be implemented here');
    });
    
    // CTA buttons
    document.querySelector('.btn.cta').addEventListener('click', function() {
        alert('Redirect to signup page');
    });
});

function initAds() {
    // This is where you would initialize your ad network (AdSense, etc.)
    // For demonstration, we'll simulate ad loading
    
    // For horizontal ad
    const wideAd = document.getElementById('ad-wide-1');
    wideAd.innerHTML = `
        <div class="simulated-ad">
            <p>Advertisement</p>
            <div style="background:#ddd; height:90px; display:flex; align-items:center; justify-content:center;">
                <p>Horizontal Banner Ad (728x90)</p>
            </div>
        </div>
    `;
    
    // For video ads
    const videoAdContainers = document.querySelectorAll('.ad-container');
    videoAdContainers.forEach(container => {
        container.innerHTML = `
            <div class="simulated-ad">
                <p>Advertisement</p>
                <div style="background:#ddd; height:250px; display:flex; align-items:center; justify-content:center;">
                    <p>Video Ad (300x250)</p>
                </div>
            </div>
        `;
    });
}

function setupVideoTracking() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        let adShown = false;
        
        video.addEventListener('play', function() {
            // Track video play event (could send to your analytics)
            console.log('Video started playing:', video);
            
            // Show ad after 10 seconds if not shown yet
            setTimeout(() => {
                if (!adShown) {
                    showMidrollAd(video);
                    adShown = true;
                }
            }, 10000);
        });
        
        video.addEventListener('ended', function() {
            // Track video completion (could credit user's account)
            console.log('Video completed:', video);
            
            // Here you would credit the user's account
            // For example: creditUserAccount(0.05); // $0.05 per video
            alert('You earned $0.05 for watching this video!');
        });
    });
}

function showMidrollAd(video) {
    // Pause the video
    video.pause();
    
    // Create ad overlay
    const adOverlay = document.createElement('div');
    adOverlay.className = 'ad-overlay';
    adOverlay.innerHTML = `
        <div class="ad-content">
            <h3>Advertisement</h3>
            <div class="simulated-ad" style="background:#ddd; height:300px; display:flex; align-items:center; justify-content:center;">
                <p>Midroll Video Ad (300x250)</p>
            </div>
            <div class="ad-timer">Ad will end in <span class="countdown">5</span> seconds</div>
            <button class="btn skip-ad">Skip Ad</button>
        </div>
    `;
    
    // Insert before the video
    video.parentNode.insertBefore(adOverlay, video);
    
    // Countdown timer
    let seconds = 5;
    const countdown = adOverlay.querySelector('.countdown');
    const timer = setInterval(() => {
        seconds--;
        countdown.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(timer);
            closeAd();
        }
    }, 1000);
    
    // Skip button
    adOverlay.querySelector('.skip-ad').addEventListener('click', closeAd);
    
    function closeAd() {
        clearInterval(timer);
        video.parentNode.removeChild(adOverlay);
        video.play();
        
        // Here you would track that the ad was viewed
        // For example: creditUserForAdView(0.02); // $0.02 per ad view
        console.log('Ad was viewed');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('main-video');
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.time-display');
    const fullscreenBtn = document.querySelector('.fullscreen');
    const prerollAd = document.getElementById('preroll-ad');
    const skipAdBtn = document.querySelector('.skip-ad');
    const midrollAd = document.getElementById('midroll-ad');
    const countdown = document.querySelector('.countdown');
    
    let adTimer;
    let seconds = 5;
    let midrollShown = false;
    
    // Initialize ads
    initAds();
    
    // Show preroll ad
    showPrerollAd();
    
    // Play/Pause button
    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);
    
    // Progress bar
    video.addEventListener('timeupdate', updateProgressBar);
    
    // Fullscreen
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Skip ad button
    skipAdBtn.addEventListener('click', skipPrerollAd);
    
    // Video ended
    video.addEventListener('ended', videoEnded);
    
    function initAds() {
        // Load sidebar ad
        loadAd(document.getElementById('sidebar-ad'), '300x250');
        
        // Load post-video ad
        loadAd(document.getElementById('post-video-ad'), '728x90');
    }
    
    function showPrerollAd() {
        video.pause();
        prerollAd.style.display = 'flex';
        
        // Start countdown
        adTimer = setInterval(() => {
            seconds--;
            countdown.textContent = `Ad will skip in ${seconds}`;
            
            if (seconds <= 0) {
                skipPrerollAd();
            }
        }, 1000);
        
        // Load preroll ad
        loadAd(prerollAd, '300x250');
    }
    
    function skipPrerollAd() {
        clearInterval(adTimer);
        prerollAd.style.display = 'none';
        video.play();
        
        // Track ad view (you would send this to your server)
        trackAdView('preroll');
    }
    
    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶️';
        }
        
        // Check for midroll ad opportunity
        if (!video.paused && !midrollShown && video.currentTime > video.duration * 0.3) {
            showMidrollAd();
        }
    }
    
    function showMidrollAd() {
        midrollShown = true;
        video.pause();
        midrollAd.style.display = 'block';
        
        // Load midroll ad
        loadAd(midrollAd, '300x250', function() {
            // Ad loaded callback
            setTimeout(() => {
                midrollAd.style.display = 'none';
                video.play();
                trackAdView('midroll');
            }, 5000); // 5 second midroll ad
        });
    }
    
    function updateProgressBar() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.value = percent;
        
        // Update time display
        const currentMins = Math.floor(video.currentTime / 60);
        const currentSecs = Math.floor(video.currentTime % 60);
        const durationMins = Math.floor(video.duration / 60);
        const durationSecs = Math.floor(video.duration % 60);
        
        timeDisplay.textContent = 
            `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs} / ${durationMins}:${durationSecs < 10 ? '0' : ''}${durationSecs}`;
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                alert(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    function videoEnded() {
        // Credit user for watching
        creditUser(0.15); // $0.15 for this video
        
        // Show post-video recommendations
        document.querySelector('.post-video-ads').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Helper functions
    function loadAd(container, size, callback) {
        // In a real implementation, this would load an actual ad
        // For demo purposes, we'll simulate an ad
        
        const adHtml = `
            <div class="simulated-ad" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#ddd;">
                <p>Ad ${size}</p>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', adHtml);
        
        if (callback) setTimeout(callback, 1000);
    }
    
    function trackAdView(type) {
        console.log(`${type} ad viewed`);
        // In a real app, you would send this to your analytics/backend
    }
    
    function creditUser(amount) {
        console.log(`Credited user $${amount} for watching video`);
        // In a real app, you would:
        // 1. Add to user's balance in your database
        // 2. Update the UI
        const balanceEl = document.querySelector('.balance');
        const currentBalance = parseFloat(balanceEl.textContent.replace('$', ''));
        const newBalance = currentBalance + amount;
        balanceEl.textContent = `$${newBalance.toFixed(2)}`;
        
        // Show notification
        alert(`You've earned $${amount.toFixed(2)} for watching this video!`);
    }
    
    // Initialize time display
    updateProgressBar();
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize ad
    initAd();
    
    // FAQ functionality
    setupFAQ();
    
    // Withdraw button
    document.querySelector('.withdraw-btn').addEventListener('click', function() {
        const balance = parseFloat(document.querySelector('.balance').textContent.replace('$', ''));
        if (balance < 10) {
            alert(`Minimum withdrawal is $10. Your current balance is $${balance.toFixed(2)}`);
        } else {
            alert('Withdrawal request submitted! You will receive your payment within 3 business days.');
        }
    });
    
    // CTA button
    document.querySelector('.cta-btn').addEventListener('click', function() {
        window.location.href = 'signup.html';
    });
});

function initAd() {
    // In a real implementation, this would load an actual ad
    const adContainer = document.getElementById('earn-page-ad');
    adContainer.innerHTML = `
        <div class="simulated-ad" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#ddd;">
            <p>Advertisement (728x90)</p>
        </div>
    `;
}

function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    loadUserData();
    
    // Initialize payment method selection
    setupPaymentMethods();
    
    // Setup withdrawal form
    setupWithdrawalForm();
    
    // Setup referral copy button
    setupReferralCopy();
    
    // Setup social share buttons
    setupSocialShare();
});

function loadUserData() {
    // Load from localStorage or set defaults
    const balance = parseFloat(localStorage.getItem('videoEarningsBalance')) || 0;
    const videosWatched = parseInt(localStorage.getItem('videosWatched')) || 0;
    const referrals = parseInt(localStorage.getItem('referrals')) || 0;
    const referralEarnings = parseFloat(localStorage.getItem('referralEarnings')) || 0;
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // Update display
    document.getElementById('current-balance').textContent = balance.toFixed(2);
    document.getElementById('account-balance').textContent = balance.toFixed(2);
    document.getElementById('total-earned').textContent = `₵${(balance + referralEarnings).toFixed(2)}`;
    document.getElementById('videos-watched').textContent = videosWatched;
    document.getElementById('referrals').textContent = referrals;
    document.getElementById('total-referrals').textContent = referrals;
    document.getElementById('referral-earnings').textContent = `₵${referralEarnings.toFixed(2)}`;
    
    // Enable/disable withdraw button
    document.getElementById('withdraw-btn').disabled = balance < 80;
    
    // Load transactions
    loadTransactions(transactions);
    
    // Set max withdrawal amount
    const withdrawAmount = document.getElementById('withdraw-amount');
    withdrawAmount.max = balance;
    withdrawAmount.placeholder = `Max: ₵${balance.toFixed(2)}`;
}

function setupPaymentMethods() {
    const methods = document.querySelectorAll('.method-card');
    
    methods.forEach(method => {
        method.addEventListener('click', function() {
            methods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupWithdrawalForm() {
    const form = document.getElementById('withdrawal-form');
    const balance = parseFloat(localStorage.getItem('videoEarningsBalance')) || 0;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = parseFloat(document.getElementById('withdraw-amount').value);
        const phone = document.getElementById('phone-number').value;
        const method = document.querySelector('.method-card.active').dataset.method;
        
        if (amount < 80) {
            alert('Minimum withdrawal amount is ₵80');
            return;
        }
        
        if (amount > balance) {
            alert('You cannot withdraw more than your current balance');
            return;
        }
        
        if (!phone.match(/^0[245][0-9]{8}$/)) {
            alert('Please enter a valid Ghanaian mobile number');
            return;
        }
        
        // Process withdrawal
        processWithdrawal(amount, phone, method);
    });
}

function processWithdrawal(amount, phone, method) {
    // In a real app, this would send to your backend
    const balance = parseFloat(localStorage.getItem('videoEarningsBalance')) || 0;
    const newBalance = balance - amount;
    
    // Save new balance
    localStorage.setItem('videoEarningsBalance', newBalance);
    
    // Add transaction
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.unshift({
        date: new Date().toLocaleDateString(),
        description: `Withdrawal to ${method === 'momo' ? 'MTN MoMo' : 'Telecel Cash'}`,
        amount: -amount,
        status: 'pending',
        phone: phone
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Update UI
    loadUserData();
    document.getElementById('withdrawal-form').reset();
    
    alert(`Withdrawal request for ₵${amount.toFixed(2)} to ${phone} has been submitted. You will receive your payment within 3 business days.`);
}

function loadTransactions(transactions) {
    const container = document.getElementById('transaction-list');
    
    if (transactions.length === 0) {
        container.innerHTML = '<div class="no-transactions">No transactions yet</div>';
        return;
    }
    
    container.innerHTML = '';
    
    transactions.forEach(transaction => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        
        const amountClass = transaction.amount > 0 ? 'credit' : 'debit';
        const amountDisplay = transaction.amount > 0 ? 
            `+₵${Math.abs(transaction.amount).toFixed(2)}` : 
            `-₵${Math.abs(transaction.amount).toFixed(2)}`;
            
        const statusClass = `status-${transaction.status}`;
        
        item.innerHTML = `
            <div class="transaction-date">${transaction.date}</div>
            <div class="transaction-description">${transaction.description}</div>
            <div class="transaction-amount ${amountClass}">${amountDisplay}</div>
            <div class="transaction-status ${statusClass}">${transaction.status}</div>
        `;
        
        container.appendChild(item);
    });
}

function setupReferralCopy() {
    const copyBtn = document.querySelector('.copy-link');
    const referralInput = document.getElementById('referral-link');
    
    copyBtn.addEventListener('click', function() {
        referralInput.select();
        document.execCommand('copy');
        
        // Show feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}

function setupSocialShare() {
    const referralLink = document.getElementById('referral-link').value;
    const shareMessage = `Earn money by watching videos on VideoStreamPro! Use my referral link: ${referralLink}`;
    
    document.querySelector('.share-btn.facebook').addEventListener('click', function() {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
    });
    
    document.querySelector('.share-btn.whatsapp').addEventListener('click', function() {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
    
    // Form submission
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Basic validation
        if (!email) {
            showError('Please enter your email or phone number');
            return;
        }
        
        if (!password) {
            showError('Please enter your password');
            return;
        }
        
        // In a real app, you would send this to your backend
        loginUser(email, password, rememberMe);
    });
    
    // Social login buttons
    document.querySelector('.social-btn.google').addEventListener('click', function() {
        alert('Google login would be implemented here');
    });
    
    document.querySelector('.social-btn.facebook').addEventListener('click', function() {
        alert('Facebook login would be implemented here');
    });
});

function loginUser(email, password, rememberMe) {
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    
    // Simulate API call
    setTimeout(() => {
        // This is where you would handle the actual login
        // For demo purposes, we'll simulate a successful login
        
        // Save to localStorage if "Remember me" is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Redirect to account page
        window.location.href = 'account.html';
    }, 1500);
}

function showError(message) {
    // In a real app, you would show this error near the relevant field
    alert(message);
}

// Check for remembered email
window.onload = function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
};