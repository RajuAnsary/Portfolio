(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  const nav = document.getElementById('navigation');
  const menu = document.getElementById('menu-toggle');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        nav.querySelectorAll('a').forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      }
    }, {rootMargin: '-15% 0px -55% 0px'});
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
  const cards = [...document.querySelectorAll('.project-card')];
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    document.querySelector('.project-count').textContent = 'Showing ' + cards.filter(card => !card.hidden).length + ' projects';
  }));
  document.getElementById('contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = data.get('subject') + ' — ' + data.get('name');
    const body = 'Hi Raju,\n\n' + data.get('message') + '\n\nFrom: ' + data.get('name') + '\nEmail: ' + data.get('email');
    window.location.href = 'mailto:rajuansary569@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('form-status').textContent = 'Your email draft is ready to open. If no email app appears, email rajuansary569@gmail.com directly.';
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.getElementById('motion-toggle');
  const canvas = document.getElementById('constellation');
  const ctx = canvas.getContext('2d');
  const hero = document.getElementById('home');
  let paused = reduced.matches, visible = true, frame = 0, angle = 0, last = 0, width = 0, height = 0;
  const pointer = {x: 0, y: 0};
  const nodes = Array.from({length: 65}, (_, i) => {
    const y = 1 - (i / 64) * 2;
    const radius = Math.sqrt(1 - y * y);
    const a = i * Math.PI * (3 - Math.sqrt(5));
    return {x: Math.cos(a) * radius, y, z: Math.sin(a) * radius};
  });
  function draw(time = 0) {
    frame = 0;
    if (!ctx) return;
    const moving = !paused && !reduced.matches && visible && !document.hidden;
    if (moving) angle += Math.min((time - last) / 1000 || 0, .04) * .055;
    last = time;
    ctx.clearRect(0, 0, width, height);
    const radius = Math.min(width * .55, 650), centerX = width * .64, centerY = height * .5;
    const points = nodes.map(n => {
      const x = n.x * Math.cos(angle) - n.z * Math.sin(angle);
      const z = n.x * Math.sin(angle) + n.z * Math.cos(angle);
      const scale = 2.8 / (2.8 + z);
      return {x: centerX + x * radius * scale + pointer.x, y: centerY + n.y * radius * .6 * scale + pointer.y, z};
    });
    points.forEach((p,i) => {
      for (let j=i+1;j<points.length;j++) {
        const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<130){ctx.strokeStyle='rgba(93,170,205,' + ((1-d/130)*.17) + ')';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
      }
      ctx.fillStyle='rgba(111,223,221,' + (.12+(p.z+1)*.15) + ')';
      ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.fill();
    });
    if(moving) frame=requestAnimationFrame(draw);
  }
  function start() { if(frame) cancelAnimationFrame(frame); frame=0; last=performance.now(); draw(last); }
  function resize() {
    width=hero.clientWidth;height=hero.clientHeight;
    const dpr=Math.min(devicePixelRatio || 1,2);canvas.width=width*dpr;canvas.height=height*dpr;
    if(ctx) ctx.setTransform(dpr,0,0,dpr,0,0);start();
  }
  function motion() {
    document.body.classList.toggle('motion-paused',paused || !visible || document.hidden);
    toggle.setAttribute('aria-pressed',String(paused));toggle.disabled=reduced.matches;
    toggle.setAttribute('aria-label',reduced.matches?'Reduced motion enabled':paused?'Resume animation':'Pause animation');
    toggle.textContent=paused?'▷':'Ⅱ';start();
  }
  toggle.addEventListener('click',()=>{paused=!paused;motion();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;motion();});
  document.addEventListener('visibilitychange',motion);
  if('IntersectionObserver' in window) new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;motion();}).observe(hero);
  hero.addEventListener('pointermove',event=>{
    if(paused || reduced.matches || event.pointerType==='touch')return;
    const bounds=hero.getBoundingClientRect();pointer.x=(event.clientX-bounds.left-width/2)*.018;pointer.y=(event.clientY-bounds.top-height/2)*.018;
  });
  hero.addEventListener('pointerleave',()=>{pointer.x=0;pointer.y=0;});
  window.addEventListener('resize',resize);resize();motion();
})();
