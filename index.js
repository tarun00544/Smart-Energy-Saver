     // Create animated background particles
        function createParticles() {
            const bgAnimation = document.getElementById('bg-animation');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                bgAnimation.appendChild(particle);
            }
        }

        // Animate dashboard values
        function animateValue(element, target, suffix = '') {
            const valueEl = element.querySelector('.dashboard-value');
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    valueEl.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    valueEl.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }

        // Initialize dashboard animation on load
        function initDashboard() {
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    const value = parseInt(card.querySelector('.dashboard-value').dataset.value);
                     const suffix = index === 1 ? '%' : index === 2 ? '°F' : index === 3 ? '$' : 'kW';
                    animateValue(card, value, suffix);
                }, index * 500 + 2000);
            });
        }

        // Advanced savings calculator
        function calculateAdvancedSavings() {
            const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
            const squareFeet = parseFloat(document.getElementById('squareFeet').value);
            const propertyType = document.getElementById('propertyType').value;
            const occupants = parseInt(document.getElementById('occupants').value);
            
            if (!monthlyBill || !squareFeet) {
                alert('Please fill in all required fields for accurate calculation.');
                return;
            }

            // Advanced calculation based on multiple factors
            let baseSavings = 0.25; // 25% base savings
            
            // Property type multiplier
            const typeMultipliers = {
                'home': 1.0,
                'apartment': 0.8,
                'hostel': 1.3,
                'office': 1.1
            };
            
            // Size factor (larger properties typically have more optimization potential)
            const sizeFactor = Math.min(1.5, 1 + (squareFeet - 1000) / 10000);
            
            // Occupancy factor
            const occupancyFactor = occupants ? Math.min(1.2, 1 + (occupants - 2) * 0.05) : 1;
            
            const finalSavingsRate = baseSavings * typeMultipliers[propertyType] * sizeFactor * occupancyFactor;
            const clampedSavingsRate = Math.min(0.55, Math.max(0.15, finalSavingsRate)); // 15-55% range
            
            const monthlySavings = monthlyBill * clampedSavingsRate;
            const annualSavings = monthlySavings * 12;
            const roiMonths = Math.ceil(1500 / monthlySavings); // Assuming $1500 setup cost
            
            const resultDiv = document.getElementById('calcResult');
            const detailsDiv = document.getElementById('savingsDetails');
            
            detailsDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${monthlySavings.toFixed(0)}</div>
                        <div>Monthly Savings</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${(clampedSavingsRate * 100).toFixed(1)}%</div>
                        <div>Savings Rate</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${annualSavings.toFixed(0)}</div>
                        <div>Annual Savings</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold;">${roiMonths}</div>
                        <div>ROI (Months)</div>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 1rem; opacity: 0.9;">
                    🎯 Based on your ${propertyType} of ${squareFeet} sq ft, you could save significantly on energy costs!
                </p>
            `;
            
            resultDiv.classList.add('show');
        }

        // Interactive energy chart
        function createChart(period = 'day') {
            const chart = document.getElementById('energyChart');
            chart.innerHTML = '';
            
            const dataPoints = period === 'day' ? 24 : period === 'week' ? 7 : 30;
            const maxHeight = 250;
            
            for (let i = 0; i < dataPoints; i++) {
                const bar = document.createElement('div');
                bar.className = 'chart-line';
                
                const height = Math.random() * maxHeight + 20;
                bar.style.setProperty('--height', height + 'px');
                bar.style.left = (i * (100 / dataPoints)) + '%';
                bar.style.animationDelay = (i * 0.1) + 's';
                
                // Add hover effect
                bar.addEventListener('mouseenter', () => {
                    bar.style.background = '#ff6b6b';
                    bar.style.transform = 'scaleY(1.1)';
                });
                
                bar.addEventListener('mouseleave', () => {
                    bar.style.background = 'var(--secondary-gradient)';
                    bar.style.transform = 'scaleY(1)';
                });
                
                chart.appendChild(bar);
            }
        }

        function updateChart(period) {
            createChart(period);
        }

        // Real-time chart simulation
        function startRealTime() {
            const bars = document.querySelectorAll('.chart-line');
            
            setInterval(() => {
                bars.forEach(bar => {
                    const newHeight = Math.random() * 250 + 20;
                    bar.style.setProperty('--height', newHeight + 'px');
                    bar.style.animation = 'none';
                    setTimeout(() => {
                        bar.style.animation = 'chart-grow 0.5s ease-in-out';
                    }, 10);
                });
            }, 2000);
        }

        // Scroll reveal animation
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.scroll-reveal');
            
            reveals.forEach(reveal => {
                const windowHeight = window.innerHeight;
                const revealTop = reveal.getBoundingClientRect().top;
                const revealPoint = 150;
                
                if (revealTop < windowHeight - revealPoint) {
                    reveal.classList.add('revealed');
                }
            });
        }

        // Advanced form submission
        function handleAdvancedSubmit(event) {
            event.preventDefault();
            
            const form = event.target;
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Animate submission
            submitBtn.textContent = 'Processing...';
            submitBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = '✓ Request Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc6a)';
                
                setTimeout(() => {
                    alert('🎉 Thank you! Our energy experts will contact you within 2 hours to schedule your free consultation.');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'var(--secondary-gradient)';
                }, 2000);
            }, 3000);
        }

        // Header scroll effect with advanced styling
        function handleHeaderScroll() {
            const header = document.querySelector('header');
            const scrolled = window.scrollY > 100;
            
            if (scrolled) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.borderBottom = '1px solid rgba(102, 126, 234, 0.2)';
                header.querySelector('.logo').style.color = '#333';
                header.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '#333';
                });
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.05)';
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                header.querySelector('.logo').style.color = 'white';
                header.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = 'var(--text-light)';
                });
            }
        }

        // Smooth scrolling with easing
        function smoothScroll(target) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            createChart();
            initDashboard();
            
            // Add event listeners
            window.addEventListener('scroll', () => {
                revealOnScroll();
                handleHeaderScroll();
            });
            
            // Smooth scrolling for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    smoothScroll(this.getAttribute('href'));
                });
            });
            
            // Initial reveal check
            revealOnScroll();
        });

        // Add some interactive hover effects for feature cards
        document.addEventListener('DOMContentLoaded', () => {
            const featureCards = document.querySelectorAll('.feature-card');
            
            featureCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    // Add subtle rotation and glow effect
                    card.style.transform = 'translateY(-15px) rotateX(5deg)';
                    card.style.boxShadow = '0 40px 100px rgba(102, 126, 234, 0.2)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) rotateX(0deg)';
                    card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.08)';
                });
            });
        });
