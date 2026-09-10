const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const closeMenu = () => {menu?.setAttribute('aria-expanded','false'); navigation?.classList.remove('is-open');};
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
const media = matchMedia('(min-width: 761px)');
media.addEventListener('change',()=>closeMenu());
const copy = document.querySelector('#copy-email');
copy?.addEventListener('click',async()=>{const status=document.querySelector('.copy-status');try{await navigator.clipboard.writeText(copy.dataset.email);status.textContent='Email copied. Let’s talk!';}catch{status.textContent='Select the email address above to copy it, or click it to open your email app.';}});
document.querySelectorAll('.video-launch').forEach(button=>button.addEventListener('click',()=>{const iframe=document.createElement('iframe');iframe.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.video)}?autoplay=1`;iframe.title=button.dataset.videoTitle || 'Project video';iframe.tabIndex=0;iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';button.replaceWith(iframe);iframe.focus();}));
const navLinks=[...document.querySelectorAll('.detail-nav a')];
if(navLinks.length && 'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){navLinks.forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-20% 0px -55% 0px'});navLinks.forEach(a=>{const target=document.querySelector(a.hash);if(target)observer.observe(target);});}
