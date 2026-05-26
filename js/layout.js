(function(){
  const configs = {
    hub:{theme:'theme-hub',brand:'Game Coach Hub',tagline:'Strategy · Tools · Network',mark:'GCH',links:[['Home','index.html'],['Guides','#guides'],['Featured','#featured'],['Tools','#tools'],['Monetization','#revenue'],['Network','#network']]},
    rdo:{theme:'theme-rdo',brand:'RDO Guide',tagline:'Money · Roles · Builds',mark:'RDO',links:[['Home','index.html'],['Money','money-guide.html'],['Gold','gold-guide.html'],['XP','xp-guide.html'],['Roles','roles.html'],['Builds','best-builds.html'],['Tools','calculators.html'],['Planner','income-planner.html'],['Network','https://game-coach-hub.vercel.app/']]},
    dayz:{theme:'theme-dayz',brand:'DayZ Guide',tagline:'Survival archive',mark:'DZ',links:[['Home','index.html'],['Beginner','beginner.html'],['Survival','survival.html'],['Illness','illness.html'],['Loot','loot.html'],['Base','base-building.html'],['Weapons','weapons.html'],['PvP','pvp.html'],['Map','map-guide.html'],['Network','https://game-coach-hub.vercel.app/']]}
  };
  function detect(){
    const body=document.body; const explicit=body && body.dataset && body.dataset.site;
    if(explicit && configs[explicit]) return explicit;
    const title=document.title.toLowerCase(); const path=location.pathname.toLowerCase();
    if(title.includes('dayz') || path.includes('dayz')) return 'dayz';
    if(title.includes('red dead') || title.includes('rdo') || path.includes('red-dead')) return 'rdo';
    return 'hub';
  }
  const key=detect(), cfg=configs[key], current=location.pathname.split('/').pop()||'index.html';
  document.body.classList.add(cfg.theme);
  function languageSwitch(){return `<div class="gch-language-switch" data-no-i18n="true" aria-label="Language"><button class="gch-lang-btn" type="button" data-lang="en">EN</button><button class="gch-lang-btn" type="button" data-lang="da">DA</button></div>`;}
  function bindNav(header=document){
    const btn=header.querySelector('.gch-nav-toggle,.nav-toggle');
    const links=header.querySelector('.gch-links,.nav-links');
    if(btn && links && !btn.dataset.bound){
      btn.dataset.bound='true';
      btn.addEventListener('click',()=>{const open=links.classList.toggle('open');btn.setAttribute('aria-expanded', String(open));});
      links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');btn.setAttribute('aria-expanded','false');}));
    }
  }
  function nav(){
    const existing=document.querySelector('.gch-header,.topbar,.site-header');
    if(existing){
      const navLinks=existing.querySelector('.gch-links,.nav-links');
      if(navLinks && !navLinks.querySelector('.gch-language-switch')) navLinks.insertAdjacentHTML('beforeend', languageSwitch());
      bindNav(existing);
      return;
    }
    const header=document.createElement('header'); header.className='gch-header';
    header.innerHTML=`<div class="gch-container gch-nav"><a class="gch-brand" href="index.html"><span class="gch-brand-mark">${cfg.mark}</span><span>${cfg.brand}<small>${cfg.tagline}</small></span></a><button class="gch-nav-toggle" type="button" aria-expanded="false">Menu</button><nav class="gch-links" aria-label="Main navigation">${cfg.links.map(([label,href])=>`<a href="${href}" class="${href===current?'active':''}">${label}</a>`).join('')}${languageSwitch()}</nav></div>`;
    document.body.insertBefore(header, document.body.firstChild); bindNav(header);
  }
  function ribbon(){
    if(document.querySelector('.pro-ribbon')) return;
    const r=document.createElement('div'); r.className='pro-ribbon';
    r.innerHTML='<span><b>Game Coach Hub network:</b> shared magazine strategy layout.</span><span>EN / DA · mobile-first · revenue-ready</span>';
    const after=document.querySelector('.gch-header,.topbar,.site-header');
    after ? after.insertAdjacentElement('afterend', r) : document.body.insertBefore(r, document.body.firstChild);
  }
  function footer(){
    if(document.querySelector('.gch-footer') || document.querySelector('.site-footer') || document.querySelector('.footer')) return;
    const f=document.createElement('footer'); f.className='gch-footer';
    f.innerHTML=`<div class="gch-container gch-footer-grid"><div><strong>${cfg.brand}</strong><p>Fan-made guide project built as part of the Game Coach Hub network.</p><small>© ${new Date().getFullYear()} ${cfg.brand}</small></div><div><strong>Network</strong><p><a href="index.html">This guide</a><br><a href="https://game-coach-hub.vercel.app/">Game Coach Hub</a></p></div><div><strong>Monetization</strong><p>AdSense-ready, affiliate-ready and premium-ready layout surfaces are included.</p></div></div>`;
    document.body.appendChild(f);
  }
  function revenue(){
    if(document.querySelector('.revenue-strip,.gch-money-panel')) return;
    const main=document.querySelector('main') || document.body;
    const box=document.createElement('section'); box.className='revenue-strip'; box.id='support';
    box.innerHTML=`<div><strong>Support this free guide network</strong><span>Prepared for relevant sponsors, affiliate recommendations and future premium/ad-free access without interrupting the guide experience.</span></div><div class="revenue-actions"><a class="gch-btn" href="https://game-coach-hub.vercel.app/">Game Coach Hub</a></div>`;
    const after=main.querySelector('.hero,.gch-hero');
    after ? after.insertAdjacentElement('afterend', box) : main.insertBefore(box, main.firstChild);
  }
  nav(); ribbon(); revenue(); footer();
})();
