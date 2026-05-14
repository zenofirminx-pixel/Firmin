document.addEventListener('DOMContentLoaded', () => {
  const termsScreen = document.getElementById('termsScreen');
  const acceptTerms = document.getElementById('acceptTerms');
  const continueBtn = document.getElementById('continueBtn');

  // Ne cache que si déjà accepté
  if(localStorage.getItem('portfolio_terms_accepted') === 'true'){
    termsScreen.classList.add('hidden');
  }

  acceptTerms.addEventListener('change', () => {
    const checked = acceptTerms.checked;
    continueBtn.disabled = !checked;
    continueBtn.classList.toggle('active', checked);
  });

  continueBtn.addEventListener('click', () => {
    if(!acceptTerms.checked) return;
    continueBtn.classList.add('loading');
    setTimeout(() => {
      localStorage.setItem('portfolio_terms_accepted', 'true');
      termsScreen.classList.add('hidden');
    }, 1500);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Animation au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },{threshold:0.1});

  document.querySelectorAll('.project-card,.about-wrap,.story-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
});