// Portfolio JavaScript - Essam Suliman
// Interactive elements and animations

// Global variables
let particles = [];
let canvas, ctx;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSkillsRadar();
    initializeProjectFilters();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeParticleBackground();
    initializeSmoothScrolling();
});

// Initialize main animations
function initializeAnimations() {
    // Hero text animations
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '#hero-name',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: 500
    })
    .add({
        targets: '#hero-title',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 200
    }, '-=800')
    .add({
        targets: '#hero-description',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: 300
    }, '-=600');

    // Animate skill icons on load
    anime({
        targets: '.skill-icon',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100, {start: 1000}),
        duration: 800,
        easing: 'easeOutQuart'
    });
}

// Initialize skills radar chart
function initializeSkillsRadar() {
    const chartDom = document.getElementById('skills-radar');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: 'Technical Skills',
            left: 'center',
            top: 0,
            textStyle: {
                color: '#ffffff',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        radar: {
            indicator: [
                { name: 'Python', max: 100 },
                { name: 'SQL', max: 100 },
                { name: 'Tableau', max: 100 },
                { name: 'Power BI', max: 100 },
                { name: 'Excel', max: 100 },
                { name: 'R Programming', max: 100 },
                { name: 'EDA', max: 100 },
                { name: 'Data Visualization', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#ffffff',
                fontSize: 12,
                fontWeight: 'bold'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(59, 130, 246, 0.3)'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: [
                        'rgba(59, 130, 246, 0.1)',
                        'rgba(59, 130, 246, 0.05)'
                    ]
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(59, 130, 246, 0.5)'
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [90, 85, 80, 75, 95, 70, 85, 88],
                name: 'Current Skills',
                areaStyle: {
                    color: 'rgba(59, 130, 246, 0.3)'
                },
                lineStyle: {
                    color: '#3b82f6',
                    width: 3
                },
                itemStyle: {
                    color: '#3b82f6',
                    borderColor: '#ffffff',
                    borderWidth: 2
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    myChart.setOption(option);
    
    // Make chart responsive
    window.addEventListener('resize', function() {
        myChart.resize();
    });
    
    // Add click interaction
    myChart.on('click', function(params) {
        if (params.componentType === 'radar') {
            filterProjectsBySkill(params.name);
        }
    });
}

// Project filtering system
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-700', 'text-gray-300');
            });
            
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-gray-700', 'text-gray-300');
            
            // Filter projects with animation
            projectItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category').split(' ');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    anime({
                        targets: item,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        translateY: [20, 0],
                        delay: index * 100,
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                    item.style.display = 'block';
                } else {
                    anime({
                        targets: item,
                        opacity: 0,
                        scale: 0.8,
                        translateY: -20,
                        duration: 300,
                        easing: 'easeInQuart',
                        complete: function() {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Filter projects by skill from radar chart
function filterProjectsBySkill(skill) {
    const skillMap = {
        'Python': 'python',
        'SQL': 'sql',
        'Tableau': 'tableau',
        'Power BI': 'tableau',
        'Excel': 'python',
        'R Programming': 'python',
        'EDA': 'eda',
        'Data Visualization': 'tableau'
    };
    
    const filter = skillMap[skill];
    if (filter) {
        const filterButton = document.querySelector(`[data-filter="${filter}"]`);
        if (filterButton) {
            filterButton.click();
            
            // Scroll to projects section
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                }
                
                // Animate skill icons
                const skillIcons = entry.target.querySelectorAll('.skill-icon');
                if (skillIcons.length > 0) {
                    anime({
                        targets: skillIcons,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        delay: anime.stagger(100),
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
                
                // Animate project cards
                const projectCards = entry.target.querySelectorAll('.project-card');
                if (projectCards.length > 0) {
                    anime({
                        targets: projectCards,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        delay: anime.stagger(150),
                        duration: 1000,
                        easing: 'easeOutQuart'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section-fade, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.id = 'mobile-menu';
                mobileMenu.className = 'md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md border-t border-gray-800';
                mobileMenu.innerHTML = `
                    <div class="px-6 py-4 space-y-4">
                        <a href="#home" class="block text-white hover:text-blue-400 py-2">Home</a>
                        <a href="#skills" class="block text-white hover:text-blue-400 py-2">Skills</a>
                        <a href="#projects" class="block text-white hover:text-blue-400 py-2">Projects</a>
                        <a href="#experience" class="block text-white hover:text-blue-400 py-2">Experience</a>
                        <a href="contact.html" class="block text-white hover:text-blue-400 py-2">Contact</a>
                    </div>
                `;
                nav.appendChild(mobileMenu);
            }
            
            // Toggle menu
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Particle background system
function initializeParticleBackground() {
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'p5-canvas';
    document.body.appendChild(canvas);
    
    // p5.js sketch for particle background
    new p5(function(p) {
        let particles = [];
        let numParticles = 50;
        
        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
            
            // Initialize particles
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle(p));
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            for (let particle of particles) {
                particle.update();
                particle.display();
                particle.connect(particles);
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
        
        // Particle class
        function Particle(p) {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
            this.size = p.random(2, 4);
            
            this.update = function() {
                this.pos.add(this.vel);
                
                // Wrap around edges
                if (this.pos.x < 0) this.pos.x = p.width;
                if (this.pos.x > p.width) this.pos.x = 0;
                if (this.pos.y < 0) this.pos.y = p.height;
                if (this.pos.y > p.height) this.pos.y = 0;
            };
            
            this.display = function() {
                p.fill(59, 130, 246, 100);
                p.noStroke();
                p.ellipse(this.pos.x, this.pos.y, this.size);
            };
            
            this.connect = function(particles) {
                for (let other of particles) {
                    let d = p5.Vector.dist(this.pos, other.pos);
                    if (d < 100) {
                        let alpha = p.map(d, 0, 100, 50, 0);
                        p.stroke(59, 130, 246, alpha);
                        p.strokeWeight(0.5);
                        p.line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
                    }
                }
            };
        }
    }, canvas);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
});

// Add click handlers for project detail buttons
/*document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.project-card button');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal or redirect to project details
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            
            // For now, show an alert - in a real implementation, this would open a modal
            alert(`Project Details: ${projectTitle}\n\nThis would open a detailed view of the project with:\n• Full project description\n• Technical implementation details\n• Data visualizations\n• Results and impact metrics\n• Code snippets and methodology`);
        });
    });
});*/

// Performance optimization - reduce particle count on mobile
function optimizeForMobile() {
    if (window.innerWidth < 768) {
        // Reduce particle count for better mobile performance
        numParticles = 25;
    }
}

// Initialize mobile optimization
window.addEventListener('resize', optimizeForMobile);
optimizeForMobile();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate page entrance
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuart'
    });
});

// Console message for developers
console.log(`
👋 Hello Developer!

Welcome to Essam Suliman's Portfolio
Built with modern web technologies:
• HTML5 & CSS3
• Tailwind CSS
• JavaScript ES6+
• Anime.js for animations
• ECharts.js for data visualization
• p5.js for creative coding

Feel free to explore the code!
`);