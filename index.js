        // Counter animation for stats
        function animateCounter(element, target) {
            let count = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(count);
                }
            }, 40);
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.1s';
                    entry.target.classList.add('fade-in');
                    
                    // Animate counters when stats section is visible
                    if (entry.target.classList.contains('stat-card')) {
                        const numberElement = entry.target.querySelector('.stat-number');
                        const target = parseInt(numberElement.dataset.target);
                        animateCounter(numberElement, target);
                    }
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        document.querySelectorAll('.stat-card').forEach(el => observer.observe(el));

        // Smooth scrolling for navigation links
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

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
                header.style.backdropFilter = 'blur(20px)';
            }
        });

        // Energy savings calculator
        function calculateSavings() {
            const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
            const squareFeet = parseFloat(document.getElementById('squareFeet').value);
            
            if (!monthlyBill || !squareFeet) {
                alert('Please enter both your monthly bill and property size.');
                return;
            }

            // Calculate potential savings (estimated 20-40% savings)
            const savingsPercentage = Math.min(40, Math.max(20, (squareFeet / 100) + 15));
            const monthlySavings = monthlyBill * (savingsPercentage / 100);
            const annualSavings = monthlySavings * 12;

            document.getElementById('savingsAmount').textContent = 
                `Monthly Savings: $${monthlySavings.toFixed(2)} (${savingsPercentage.toFixed(1)}%)`;
            document.getElementById('annualSavings').textContent = 
                `Annual Savings: $${annualSavings.toFixed(2)}`;
            document.getElementById('calcResult').style.display = 'block';
        }

        // Contact form handler
        function handleSubmit(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = event.target.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your interest! We will contact you within 24 hours to schedule your free consultation.');
                event.target.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        // Add loading animation to page
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
  