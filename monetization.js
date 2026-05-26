(function(){
  const config = window.GCH_MONETIZATION || {
    adsensePublisherId: '',
    enableAdsense: false,
    enableSponsorPlaceholders: true,
    disclosure: {
      en: 'This site may use ads or affiliate links to support free guide content.',
      da: 'Denne side kan bruge annoncer eller affiliate-links for at støtte gratis guideindhold.'
    }
  };
  function lang(){return localStorage.getItem('gch-lang') || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en';}
  function addDisclosure(){
    if(document.querySelector('.gch-disclosure')) return;
    const main=document.querySelector('main') || document.body;
    const box=document.createElement('aside');
    box.className='gch-disclosure monetization-card';
    box.innerHTML=`<small>${lang().startsWith('da')?'Gennemsigtighed':'Transparency'}</small><p>${lang().startsWith('da')?config.disclosure.da:config.disclosure.en}</p>`;
    const target=document.querySelector('.revenue-strip,.gch-money-panel');
    target ? target.insertAdjacentElement('afterend', box) : main.appendChild(box);
  }
  function activateAdsense(){
    if(!config.enableAdsense || !config.adsensePublisherId) return;
    if(document.querySelector('script[data-gch-adsense]')) return;
    const s=document.createElement('script');
    s.async=true;
    s.dataset.gchAdsense='true';
    s.crossOrigin='anonymous';
    s.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsensePublisherId}`;
    document.head.appendChild(s);
  }
  function markSlots(){
    document.querySelectorAll('[data-ad-slot]').forEach(slot=>{
      if(config.enableAdsense && config.adsensePublisherId){
        slot.classList.add('is-active');
      }
    });
  }
  activateAdsense();
  markSlots();
  addDisclosure();
})();
