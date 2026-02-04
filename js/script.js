// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

let year = document.getElementById('year');
const agora = new Date();

const ano = agora.getFullYear();
year.textContent = ano;
// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Ativar link da navegação conforme scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animar barras de habilidades quando visíveis
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(skillBar => {
        const skillPosition = skillBar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(skillPosition < screenPosition) {
            const width = skillBar.getAttribute('data-width');
            skillBar.style.width = width + '%';
        }
    });
};

// Resetar barras de habilidades ao carregar a página
window.addEventListener('load', () => {
    skillBars.forEach(skillBar => {
        skillBar.style.width = '0%';
    });
    
    // Animar após um pequeno delay
    setTimeout(animateSkillBars, 300);
});

// Animar barras durante o scroll
window.addEventListener('scroll', animateSkillBars);

// Formulário de contato
/*const contactForm = document.getElementById('contactForm');
const form = document.getElementById("formContato");

contactForm.addEventListener('submit', function(e) {
    //e.preventDefault();
    
    // Coletar dados do formulário
    //const formData = new FormData(this);
    //const formValues = Object.fromEntries(formData);
    
    console.log('Dados do formulário:', formValues);
    Swal.fire({
      title: "Mensagem enviada! 💌",
      text: "Obrigado por entrar em contacto. Responderei em breve.",
      icon: "success",
      confirmButtonText: "Perfeito!"
    });
    
    // Mostrar mensagem de sucesso
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Mensagem Enviada!';
    submitButton.style.backgroundColor = '#4CAF50';
    
    // Resetar formulário
    this.reset();
    
    // Restaurar botão após 3 segundos
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.backgroundColor = '';
    }, 3000);
});*/

const form = document.getElementById("formContato");

async function handleSubmit(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch(event.target.action, {
        method: "post",
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok){
        console.log("Deu Tudo CERTO CRLH");
        Swal.fire({
        title: "Mensagem enviada! 💌",
        text: "Obrigado por entrar em contacto. Responderei em breve.",
        icon: "success",
        confirmButtonText: "Perfeito!"
        });
        limparCampos();
    }
    else{
        console.log("DEU ERRO!");
    }
}
form.addEventListener("submit", handleSubmit);

function limparCampos(){
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("assunto").value = "";
    document.getElementById("menssagem").value = "";
}



// Animar elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .blog-card, .work-item').forEach(el => {
    observer.observe(el);
});

// Adicionar classe de animação inicial
window.addEventListener('load', () => {
    document.querySelector('.hero-content').classList.add('animated');
    document.querySelector('.hero-image').classList.add('animated');
});

// Efeito de digitação no título (opcional)
const heroTitle = document.querySelector('.hero-title');
if(heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if(i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar efeito após um pequeno delay
    setTimeout(typeWriter, 500);
}

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-dark);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid var(--card-bg);
        border-top-color: var(--accent-gold);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    preloader.appendChild(spinner);
    document.body.appendChild(preloader);
    
    // Adicionar animação de spin
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Remover preloader após carregamento
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(preloader);
        }, 500);
    }, 1000);
});

// Alternar tema claro/escuro (opcional)
const themeToggle = document.createElement('button');
themeToggle.id = 'themeToggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--accent-gold);
    color: var(--primary-dark);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    if(document.body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.style.background = '#333';
        themeToggle.style.color = '#fff';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.background = 'var(--accent-gold)';
        themeToggle.style.color = 'var(--primary-dark)';
    }
});

// Adicionar estilo para tema claro (opcional)
const lightThemeStyles = `
    .light-theme {
        background: #f5f5f5;
        color: #333;
    }
    
    .light-theme .navbar {
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .light-theme .nav-link {
        color: #333;
    }
    
    .light-theme .section-title,
    .light-theme .hero-title,
    .light-theme h1,
    .light-theme h2,
    .light-theme h3,
    .light-theme h4 {
        color: #333;
    }
    
    .light-theme .section-subtitle,
    .light-theme .hero-text,
    .light-theme .about-text p,
    .light-theme .service-text,
    .light-theme .blog-text,
    .light-theme .contact-text,
    .light-theme .contact-detail p {
        color: #666;
    }
    
    .light-theme .service-card,
    .light-theme .blog-card,
    .light-theme .form-group input,
    .light-theme .form-group textarea,
    .light-theme .social-link {
        background-color: #fff;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }
    
    .light-theme .skill-bar {
        background-color: #e0e0e0;
    }
    
    .light-theme .footer {
        background-color: #333;
    }
    
    .light-theme .footer p {
        color: #ccc;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightThemeStyles;
document.head.appendChild(styleSheet);