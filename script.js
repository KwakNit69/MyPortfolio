document.addEventListener('DOMContentLoaded',()=>{
  const header=document.getElementById('header');
  const nav=document.getElementById('nav');
  const toggle=document.getElementById('menuToggle');
  const links=[...document.querySelectorAll('.nav-link')];
  const sections=[...document.querySelectorAll('main section[id]')];
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  const closeMenu=()=>{
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    const icon=toggle?.querySelector('i');
    icon?.classList.add('fa-bars');
    icon?.classList.remove('fa-xmark');
  };

  toggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    const icon=toggle.querySelector('i');
    icon.classList.toggle('fa-bars',!open);
    icon.classList.toggle('fa-xmark',open);
  });
  links.forEach(a=>a.addEventListener('click',closeMenu));

  const onScroll=()=>header?.classList.toggle('scrolled',scrollY>18);
  onScroll();
  addEventListener('scroll',onScroll,{passive:true});

  const activeObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
      }
    });
  },{rootMargin:'-38% 0px -52% 0px'});
  sections.forEach(section=>activeObserver.observe(section));

  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('show');revealObserver.unobserve(entry.target)}
    });
  },{threshold:.08,rootMargin:'0px 0px -25px'});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  const form=document.getElementById('contactForm');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('contactName').value.trim();
    const email=document.getElementById('contactEmail').value.trim();
    const message=document.getElementById('contactMessage').value.trim();
    const subject=encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body=encodeURIComponent(`Hi Romeo,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href=`mailto:romeoomalay69@gmail.com?subject=${subject}&body=${body}`;
  });
});
