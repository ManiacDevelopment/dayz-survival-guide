
(function(){
  const STORAGE_KEY='gch_language';
  const urlLang=new URLSearchParams(location.search).get('lang');
  const initial=(urlLang==='da'||urlLang==='en')?urlLang:(localStorage.getItem(STORAGE_KEY)||'en');

  const exact={
    'Game Coach Hub':'Game Coach Hub',
    'Guides · Tools · Strategy':'Guides · Værktøjer · Strategi',
    'Money · Roles · Builds':'Penge · Roller · Builds',
    'Survival archive':'Overlevelsesarkiv',
    'Home':'Forside','Guides':'Guides','Tools':'Værktøjer','Network':'Netværk','Support':'Støt siden',
    'Money':'Penge','Gold':'Guld','XP':'XP','Roles':'Roller','Builds':'Builds','Planner':'Planlægger',
    'Beginner':'Begynder','Survival':'Overlevelse','Illness':'Sygdom','Loot':'Loot','Base':'Base','Weapons':'Våben','PvP':'PvP','Map':'Kort',
    'Menu':'Menu','Open guide':'Åbn guide','Open coach':'Åbn coach','Explore guides':'Se guides','View tools':'Se værktøjer',
    'Concept 3 · Magazine strategy layout':'Koncept 3 · Magazine/strategy-layout',
    'Game Coach Hub network':'Game Coach Hub-netværk',
    'Strategy-first design':'Strategi-først design',
    'Featured network':'Fremhævet netværk',
    'Active projects':'Aktive projekter','Guide network':'Guide-netværk','Monetization-ready':'Klar til indtjening',
    'Built to earn later':'Bygget til senere indtjening','Sponsored cards':'Sponsor-kort','Affiliate sections':'Affiliate-sektioner','Premium upgrade path':'Premium-opgradering',
    'Support this free guide network':'Støt dette gratis guide-netværk',
    'Revenue system included':'Indtjeningssystem inkluderet','Back to guides':'Tilbage til guides',
    'Fan-made guide project built as part of the Game Coach Hub network.':'Fanlavet guideprojekt bygget som en del af Game Coach Hub-netværket.',
    'Monetization':'Indtjening','Includes sponsor, affiliate and premium CTA zones that can be activated without redesigning the site.':'Indeholder sponsor-, affiliate- og premium-CTA-zoner, som kan aktiveres uden at redesigne siden.',
    'English':'English','Dansk':'Dansk',
    'Language':'Sprog','Read guide':'Læs guide','View all':'Se alle','Popular guides':'Populære guides','Featured tools':'Fremhævede værktøjer',
    'Latest strategy articles':'Seneste strategiartikler','Beginner guides':'Begynderguides','Build guides':'Build-guides','Featured guide':'Fremhævet guide',
    'Recommended tools':'Anbefalede værktøjer','Sponsored':'Sponsoreret','Premium':'Premium','Upgrade':'Opgrader',
    'Search guides, games...':'Søg i guides og spil...','Search guides, tools, builds...':'Søg i guides, værktøjer og builds...',
    'All rights reserved.':'Alle rettigheder forbeholdes.',
    'Privacy Policy':'Privatlivspolitik','Terms of Service':'Vilkår','About':'Om siden','Contact':'Kontakt',
    'Not affiliated with Rockstar Games.':'Ikke tilknyttet Rockstar Games.'
  };

  const replacements=[
    [/One central gaming-guide network for strategy articles, tools, calculators, builds and companion pages across your game projects\./g,'Ét samlet gaming-guide-netværk til strategiartikler, værktøjer, beregnere, builds og companion-sider på tværs af dine spilprojekter.'],
    [/The visual system is built around strong guide discovery: featured articles, category rows, readable cards and network links between every project\./g,'Det visuelle system er bygget omkring stærk guide-navigation: fremhævede artikler, kategorirækker, læsevenlige kort og netværkslinks mellem alle projekter.'],
    [/Each card links to a real deployed project and follows the same magazine-style design system\./g,'Hvert kort linker til et rigtigt deployet projekt og følger det samme magazine-inspirerede designsystem.'],
    [/Complete RDO hub for money, gold, XP, roles, weapons, builds and interactive planners\./g,'Komplet RDO-hub til penge, guld, XP, roller, våben, builds og interaktive planlæggere.'],
    [/Gritty survival guide for beginners, illness, loot, PvP, vehicles, bases and maps\./g,'Rå survival-guide til begyndere, sygdom, loot, PvP, køretøjer, baser og kort.'],
    [/App-like companion for heroes, abilities, matchups, builds and coaching decisions\./g,'App-lignende companion til helte, abilities, matchups, builds og coaching-valg.'],
    [/The layout includes clean, labeled zones for sponsor cards, affiliate recommendations and premium CTAs\./g,'Layoutet indeholder rene, tydeligt markerede zoner til sponsorkort, affiliate-anbefalinger og premium-CTA’er.'],
    [/Native card format for relevant sponsors like server hosting, gaming tools, peripherals or companion services\./g,'Native kortformat til relevante sponsorer som serverhosting, gaming-værktøjer, udstyr eller companion-services.'],
    [/Editorial recommendation blocks can be added without interrupting guide reading or tool use\./g,'Redaktionelle anbefalingsblokke kan tilføjes uden at forstyrre guide-læsning eller brug af værktøjer.'],
    [/Prepared CTA pattern for future ad-free, advanced tools or saved-build functionality\./g,'Forberedt CTA-mønster til fremtidig reklamefri version, avancerede værktøjer eller gemte builds.'],
    [/No fake ads are shown\. The site has real implementation points for activating sponsors, affiliates and premium CTAs later\./g,'Der vises ingen falske reklamer. Siden har reelle implementeringspunkter til senere aktivering af sponsorer, affiliates og premium-CTA’er.'],
    [/Layout is prepared for sponsor placements, affiliate cards and a future premium\/ad-free version without hurting the reading experience\./g,'Layoutet er forberedt til sponsorplaceringer, affiliate-kort og en fremtidig premium\/reklamefri version uden at skade læseoplevelsen.'],
    [/Prepared for sponsor cards, affiliate recommendations and a future premium\/ad-free upgrade without disrupting the coach workflow\./g,'Forberedt til sponsorkort, affiliate-anbefalinger og en fremtidig premium\/reklamefri opgradering uden at forstyrre coach-flowet.'],
    [/Deadlock Coach is now using the shared magazine strategy system\./g,'Deadlock Coach bruger nu det fælles magazine/strategy-system.'],
    [/Fan-made guide project and part of the Game Coach Hub network\./g,'Fanlavet guideprojekt og en del af Game Coach Hub-netværket.'],
    [/Prepared for sponsor cards, affiliate blocks and premium CTA areas\./g,'Forberedt til sponsorkort, affiliate-blokke og premium-CTA-områder.'],
    [/Complete guide/g,'Komplet guide'],[/Ultimate guide/g,'Ultimativ guide'],[/Beginner guide/g,'Begynderguide'],[/Survival guide/g,'Overlevelsesguide'],[/Money guide/g,'Pengeguide'],[/Gold guide/g,'Guldguide'],[/XP guide/g,'XP-guide'],[/Role guide/g,'Rolleguide'],[/Weapon guide/g,'Våbenguide'],[/Build guide/g,'Build-guide'],[/Map guide/g,'Kortguide'],[/Illness guide/g,'Sygdomsguide'],
    [/Red Dead Online Guide/g,'Red Dead Online Guide'],[/DayZ Survival Guide/g,'DayZ Survival Guide'],[/Deadlock Coach/g,'Deadlock Coach'],
    [/Game guides/g,'Spilguides'],[/game guides/g,'spilguides'],[/Strategy Guides/g,'Strategiguides'],[/strategy guides/g,'strategiguides'],[/Strategy/g,'Strategi'],[/strategy/g,'strategi'],[/Tools/g,'Værktøjer'],[/tools/g,'værktøjer'],[/Guide/g,'Guide'],[/guide/g,'guide'],[/Guides/g,'Guides'],[/guides/g,'guides'],
    [/Beginner/g,'Begynder'],[/beginners/g,'begyndere'],[/Beginner's/g,'Begynderens'],[/Survival/g,'Overlevelse'],[/survival/g,'overlevelse'],[/Illness/g,'Sygdom'],[/illness/g,'sygdom'],[/Loot/g,'Loot'],[/loot/g,'loot'],[/Base building/g,'Basebygning'],[/Base Building/g,'Basebygning'],[/Weapons/g,'Våben'],[/weapons/g,'våben'],[/Vehicles/g,'Køretøjer'],[/vehicles/g,'køretøjer'],[/Maps/g,'Kort'],[/maps/g,'kort'],[/Map/g,'Kort'],[/map/g,'kort'],
    [/Money/g,'Penge'],[/money/g,'penge'],[/Gold/g,'Guld'],[/gold/g,'guld'],[/Roles/g,'Roller'],[/roles/g,'roller'],[/Bounty/g,'Bounty'],[/Trader/g,'Trader'],[/Moonshine/g,'Moonshine'],[/Collector/g,'Collector'],[/Naturalist/g,'Naturalist'],[/Ability Cards/g,'Ability Cards'],[/Ability cards/g,'Ability cards'],[/Horses/g,'Heste'],[/horses/g,'heste'],[/Weapons/g,'Våben'],[/weapons/g,'våben'],[/Ammo/g,'Ammunition'],[/Food/g,'Mad'],
    [/Heroes/g,'Helte'],[/heroes/g,'helte'],[/Abilities/g,'Abilities'],[/abilities/g,'abilities'],[/Matchups/g,'Matchups'],[/matchups/g,'matchups'],[/Builds/g,'Builds'],[/builds/g,'builds'],[/Coach/g,'Coach'],[/coach/g,'coach'],
    [/Featured/g,'Fremhævet'],[/Popular/g,'Populær'],[/Latest/g,'Seneste'],[/Updated/g,'Opdateret'],[/New/g,'Ny'],[/All/g,'Alle'],[/Open/g,'Åbn'],[/View/g,'Se'],[/Read/g,'Læs'],[/Explore/g,'Udforsk'],[/Search/g,'Søg'],[/Next/g,'Næste'],[/Back/g,'Tilbage'],[/Home/g,'Forside'],[/About/g,'Om siden'],[/Contact/g,'Kontakt'],[/Privacy/g,'Privatliv'],[/Terms/g,'Vilkår'],[/Support/g,'Støt'],
    [/Free/g,'Gratis'],[/Premium/g,'Premium'],[/Sponsor/g,'Sponsor'],[/Sponsored/g,'Sponsoreret'],[/Affiliate/g,'Affiliate'],[/Revenue/g,'Indtjening'],[/Monetization/g,'Indtjening'],[/Ads/g,'Reklamer'],[/ad-free/g,'reklamefri'],
    [/online/g,'online'],[/Offline/g,'Offline'],[/Active/g,'Aktiv'],[/active/g,'aktiv'],[/Network/g,'Netværk'],[/network/g,'netværk'],[/Project/g,'Projekt'],[/project/g,'projekt'],[/Projects/g,'Projekter'],[/projects/g,'projekter']
  ];

  function translateText(s){
    if(!s || !s.trim()) return s;
    const trimmed=s.trim();
    if(exact[trimmed]) return s.replace(trimmed, exact[trimmed]);
    let out=s;
    for(const [r,v] of replacements) out=out.replace(r,v);
    return out;
  }
  function skip(node){
    const p=node.parentElement;
    if(!p) return true;
    const tag=p.tagName;
    return ['SCRIPT','STYLE','NOSCRIPT','CODE','PRE','TEXTAREA','INPUT','OPTION'].includes(tag) || p.closest('[data-no-i18n]');
  }
  function walk(root, lang){
    const walker=document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode(n){return skip(n)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    for(const n of nodes){
      if(n.nodeValue.trim().length<2) continue;
      if(n.parentElement && !n.parentElement.dataset.i18nOriginal){ n.parentElement.dataset.i18nOriginal=n.nodeValue; }
      const original=n.parentElement ? n.parentElement.dataset.i18nOriginal : n.nodeValue;
      n.nodeValue = lang==='da' ? translateText(original) : original;
    }
    document.querySelectorAll('[placeholder]').forEach(el=>{
      if(!el.dataset.i18nPlaceholderOriginal) el.dataset.i18nPlaceholderOriginal=el.getAttribute('placeholder')||'';
      const original=el.dataset.i18nPlaceholderOriginal;
      el.setAttribute('placeholder', lang==='da'?translateText(original):original);
    });
    document.querySelectorAll('[aria-label]').forEach(el=>{
      if(!el.dataset.i18nAriaOriginal) el.dataset.i18nAriaOriginal=el.getAttribute('aria-label')||'';
      const original=el.dataset.i18nAriaOriginal;
      el.setAttribute('aria-label', lang==='da'?translateText(original):original);
    });
    if(!document.documentElement.dataset.originalTitle) document.documentElement.dataset.originalTitle=document.title;
    document.title=lang==='da'?translateText(document.documentElement.dataset.originalTitle):document.documentElement.dataset.originalTitle;
    document.documentElement.lang=lang==='da'?'da':'en';
  }
  function setLang(lang){
    localStorage.setItem(STORAGE_KEY,lang);
    walk(document.body,lang);
    document.querySelectorAll('.gch-lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  }
  function insertSwitch(){
    if(document.querySelector('.gch-language-switch')) return;
    const wrap=document.createElement('div'); wrap.className='gch-language-switch'; wrap.setAttribute('aria-label','Language'); wrap.dataset.noI18n='true';
    wrap.innerHTML='<button class="gch-lang-btn" type="button" data-lang="en">EN</button><button class="gch-lang-btn" type="button" data-lang="da">DA</button>';
    const target=document.querySelector('.gch-links') || document.querySelector('.nav-links') || document.querySelector('.topbar-actions') || document.querySelector('header') || document.body;
    target.appendChild(wrap);
    wrap.addEventListener('click',e=>{const btn=e.target.closest('[data-lang]'); if(btn) setLang(btn.dataset.lang);});
  }
  function boot(){
    insertSwitch();
    setLang(initial);
    let pending=false;
    const obs=new MutationObserver(()=>{
      if(pending) return; pending=true;
      requestAnimationFrame(()=>{pending=false; insertSwitch(); setLang(localStorage.getItem(STORAGE_KEY)||initial);});
    });
    obs.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
