/* Single source of truth for the header and footer.
   Each page sets <body data-page="..."> and drops
   <div id="site-header"></div> + <div id="site-footer"></div>. */

function headerHTML(active){
  const a=(href,label,key)=>'<a href="'+href+'"'+(active===key?' class="active"':'')+'>'+label+'</a>';
  return ''+
  '<header id="hdr"><div class="wrap"><nav>'+
    '<a href="index.html" class="logo"><img class="lockup" src="assets/logo.png" alt="Propeers"> <span class="us">US</span></a>'+
    '<div class="navlinks">'+
      a('what-we-do.html','What We Do','whatwedo')+
      a('about.html','Company','company')+
      a('approach.html','Approach','approach')+
      a('contact.html','Contact','contact')+
    '</div>'+
    '<div class="nav-cta">'+
      '<a href="tel:+17817244137" class="btn btn-ghost">Talk to us &#9742;</a>'+
      '<a href="contact.html" class="btn btn-acc">Start a project</a>'+
      '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>'+
    '</div>'+
  '</nav></div></header>';
}

function footerHTML(){
  return ''+
  '<footer><div class="wrap">'+
    '<div class="foot-grid">'+
      '<div>'+
        '<a href="index.html" class="logo"><img class="lockup" src="assets/logo.png" alt="Propeers"> <span class="us">US</span></a>'+
        '<p class="desc">ProPeers Inc. is the US subsidiary of Professional Peers Info Services. We handle the software and the AI inside it, plus the marketing that brings people in.</p>'+
      '</div>'+
      '<div class="foot-col"><h5>Practices</h5>'+
        '<a href="it-consulting.html">IT Consulting</a>'+
        '<a href="ai-solutions.html">AI Platforming</a>'+
        '<a href="affiliate-marketing.html">Affiliate Marketing</a>'+
        '<a href="what-we-do.html">All Services</a>'+
      '</div>'+
      '<div class="foot-col"><h5>Company</h5>'+
        '<a href="about.html">About</a>'+
        '<a href="approach.html">Our Approach</a>'+
        '<a href="contact.html">Contact</a>'+
        '<a href="https://propeersinfo.com" target="_blank" rel="noopener">Parent Company &#8599;</a>'+
      '</div>'+
      '<div class="foot-col"><h5>Get in touch</h5>'+
        '<p><a href="mailto:propeersinfoaffiliate@gmail.com">propeersinfoaffiliate@gmail.com</a></p>'+
        '<p><a href="tel:+17817244137">+1 781-724-4137</a></p>'+
        '<p>United States</p>'+
      '</div>'+
    '</div>'+
    '<div class="foot-bottom">'+
      '<span>&copy; 2026 ProPeers Inc., a US company and the American arm of Professional Peers Info Services. All rights reserved.</span>'+
      '<div class="socials">'+
        '<a href="https://www.facebook.com/ProPeersInfo" target="_blank" rel="noopener" aria-label="Facebook">f</a>'+
        '<a href="https://twitter.com/ProPeersInfo" target="_blank" rel="noopener" aria-label="Twitter">&#120143;</a>'+
        '<a href="https://www.instagram.com/propeersinfoinc" target="_blank" rel="noopener" aria-label="Instagram">ig</a>'+
        '<a href="https://www.linkedin.com/in/propeersinfo-inc-03311a415/" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>'+
      '</div>'+
    '</div>'+
  '</div></footer>';
}

/* contact form -> submits straight to Formspree, which stores every message in
   a dashboard (acting as the database) and forwards it by email to
   propeersinfoaffiliate@gmail.com. Swap the placeholder action URL in
   contact.html for your real Formspree endpoint once the account is set up
   (see README). Falls back to opening the visitor's email client if no real
   endpoint is configured yet, or if the request fails. */
function submitContact(e){
  e.preventDefault();
  var form=e.target;
  var status=document.getElementById('cstatus');
  var btn=document.getElementById('cf-submit');
  var data=new FormData(form);

  function fallbackToEmail(note){
    var name=(data.get('fullname')||'').toString().trim();
    var subject=encodeURIComponent('Project inquiry from '+(name||'the ProPeers website'));
    var body=encodeURIComponent(
      'Name: '+name+'\n'+
      'Email: '+(data.get('email')||'')+'\n'+
      'Company: '+(data.get('company')||'')+'\n'+
      'Interested in: '+(data.get('need')||'')+'\n\n'+
      (data.get('message')||'')
    );
    if(status){status.textContent=note;}
    window.location.href='mailto:propeersinfoaffiliate@gmail.com?subject='+subject+'&body='+body;
  }

  if((form.getAttribute('action')||'').indexOf('your-form-id')!==-1){
    fallbackToEmail('Opening your email app with the message ready to send. (Connect a Formspree endpoint to collect these automatically instead.)');
    return false;
  }

  if(btn){btn.disabled=true; btn.textContent='Sending…';}
  if(status){status.textContent='Sending your message…';}

  fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}})
    .then(function(res){
      if(!res.ok){ throw new Error('bad-response'); }
      form.reset();
      if(status){status.textContent='Thanks, that’s in. We read every message and reply within a day.';}
      if(btn){btn.textContent='Message sent ✓';}
    })
    .catch(function(){
      if(btn){btn.disabled=false; btn.textContent='Send message →';}
      fallbackToEmail('That didn’t go through, so we opened an email instead. Send it to propeersinfoaffiliate@gmail.com and we’ll pick it up from there.');
    });
  return false;
}

/* ---- motion: scroll progress thread ---- */
function initScrollThread(){
  var bar=document.createElement('div');
  bar.className='scroll-thread';
  document.body.appendChild(bar);
  function update(){
    var h=document.documentElement;
    var max=h.scrollHeight-h.clientHeight;
    var p=max>0?h.scrollTop/max:0;
    bar.style.transform='scaleX('+p+')';
  }
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  update();
}

/* ---- intro: the logo draws itself on black before the first paint ---- */
function initIntro(){
  if(sessionStorage.getItem('ppi-intro')) return;
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  sessionStorage.setItem('ppi-intro','1');
  var o=document.createElement('div');
  o.className='intro';
  o.innerHTML='<img src="assets/intro.gif" alt="" width="864" height="864">';
  document.body.appendChild(o);
  document.body.classList.add('intro-hold');
  setTimeout(function(){
    o.classList.add('out');
    document.body.classList.remove('intro-hold');
    setTimeout(function(){ o.remove(); },650);
  },2450);
}

/* ---- motion: cursor aura that eases toward the pointer ---- */
function initCursorAura(){
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var aura=document.createElement('div');
  aura.className='cursor-aura';
  document.body.appendChild(aura);
  window.addEventListener('mousemove',function(e){
    aura.classList.add('live');
    aura.style.transform='translate('+e.clientX+'px,'+e.clientY+'px) translate(-50%,-50%)';
  },{passive:true});
  window.addEventListener('mouseleave',function(){ aura.classList.remove('live'); });
}

/* ---- motion: magnetic pull on buttons ---- */
function initMagneticButtons(){
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('mousemove',function(e){
      var r=btn.getBoundingClientRect();
      var mx=e.clientX-r.left-r.width/2, my=e.clientY-r.top-r.height/2;
      btn.style.transform='translate('+(mx*.28)+'px,'+(my*.4)+'px)';
    });
    btn.addEventListener('mouseleave',function(){ btn.style.transform=''; });
  });
}

/* ---- motion: gentle 3D tilt on cards, following the pointer ---- */
function initTiltCards(){
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var sel='.pillar,.svc,.xlink,.stat,.info-block,.about-card';
  document.querySelectorAll(sel).forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var r=card.getBoundingClientRect();
      var px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
      card.style.transform='perspective(900px) rotateX('+(py*-6)+'deg) rotateY('+(px*8)+'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave',function(){ card.style.transform=''; });
  });
}

/* ---- motion: count up the stat numbers when they enter view ---- */
function initCountUp(){
  var nodes=document.querySelectorAll('.stat .big');
  if(!nodes.length) return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(entry){
      if(!entry.isIntersecting) return;
      io.unobserve(entry.target);
      var el=entry.target;
      var rawHTML=el.innerHTML;
      var text=el.textContent;
      var m=text.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
      if(!m){ return; }
      var prefix=m[1], target=parseFloat(m[2]), suffix=m[3];
      var decimals=(m[2].split('.')[1]||'').length;
      var dur=1100, t0=null;
      function frame(ts){
        if(t0===null) t0=ts;
        var p=Math.min((ts-t0)/dur,1);
        var eased=1-Math.pow(1-p,3);
        var val=(target*eased).toFixed(decimals);
        el.textContent=prefix+val+suffix;
        if(p<1) requestAnimationFrame(frame);
        else el.innerHTML=rawHTML;
      }
      requestAnimationFrame(frame);
    });
  },{threshold:.5});
  nodes.forEach(function(n){ io.observe(n); });
}

/* ---- motion: trigger demo showcases (charts, traces, chat, funnels) when they scroll into view ---- */
function initShowcases(){
  var sel='.demo-chart,.demo-trace,.demo-chat,.demo-funnel';
  var nodes=document.querySelectorAll(sel);
  if(!nodes.length) return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(entry){
      if(!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.classList.add('in');
    });
  },{threshold:.35});
  nodes.forEach(function(n){ io.observe(n); });
}

/* ---- accent switcher: cycles the site's accent color, persisted locally ---- */
function initAccentSwitch(){
  var THEMES=[['lime','Lime'],['blue','Blue'],['violet','Violet'],['amber','Amber']];
  var saved=localStorage.getItem('ppi-accent');
  var idx=0;
  for(var i=0;i<THEMES.length;i++){ if(THEMES[i][0]===saved){ idx=i; break; } }

  var fab=document.createElement('button');
  fab.className='accent-fab';
  fab.type='button';
  fab.setAttribute('aria-label','Switch the site accent color');
  fab.innerHTML='<span class="sw" aria-hidden="true"></span><span class="lab">Accent — '+THEMES[idx][1]+'</span>';
  var label=fab.querySelector('.lab');

  function apply(i,persist){
    idx=((i%THEMES.length)+THEMES.length)%THEMES.length;
    var key=THEMES[idx][0];
    if(key==='lime'){ document.documentElement.removeAttribute('data-accent'); }
    else { document.documentElement.setAttribute('data-accent',key); }
    label.textContent='Accent — '+THEMES[idx][1];
    if(persist){ localStorage.setItem('ppi-accent',key); }
  }
  apply(idx,false);
  fab.addEventListener('click',function(){ apply(idx+1,true); });
  document.body.appendChild(fab);
}

/* ---- FAQ accordion: one panel open at a time, height-animated ---- */
function initFaq(){
  var items=document.querySelectorAll('.faq-item');
  if(!items.length) return;
  items.forEach(function(item){
    var btn=item.querySelector('.faq-q');
    var ans=item.querySelector('.faq-a');
    btn.addEventListener('click',function(){
      var willOpen=!item.classList.contains('open');
      items.forEach(function(other){
        if(other!==item && other.classList.contains('open')){
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded','false');
          other.querySelector('.faq-a').style.maxHeight='';
        }
      });
      item.classList.toggle('open',willOpen);
      btn.setAttribute('aria-expanded',String(willOpen));
      ans.style.maxHeight=willOpen?(ans.scrollHeight+'px'):'';
    });
  });
}

function initSite(){
  initIntro();
  var hWrap=document.getElementById('site-header');
  if(hWrap){hWrap.innerHTML=headerHTML(document.body.getAttribute('data-page')||'');}
  var fWrap=document.getElementById('site-footer');
  if(fWrap){fWrap.innerHTML=footerHTML();}

  var hdr=document.getElementById('hdr');
  function onScroll(){ if(hdr){ hdr.classList.toggle('scrolled', window.scrollY>20);} }
  window.addEventListener('scroll',onScroll); onScroll();

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.14});
  var i=0;
  document.querySelectorAll('.reveal').forEach(function(elm){
    elm.style.transitionDelay=((i++%4)*70)+'ms';
    io.observe(elm);
  });

  var burger=document.getElementById('burger');
  if(burger){
    burger.addEventListener('click',function(){
      var n=document.querySelector('.navlinks');
      var open=n.style.display==='flex';
      n.style.display=open?'none':'flex';
      n.style.position='absolute';n.style.top='74px';n.style.left=0;n.style.right=0;
      n.style.flexDirection='column';n.style.background='var(--ink-2)';
      n.style.padding='20px 24px';n.style.borderBottom='1px solid var(--line)';n.style.gap='18px';
    });
  }

  var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion){
    initScrollThread();
    initCursorAura();
    initMagneticButtons();
    initTiltCards();
  }
  initCountUp();
  initShowcases();
  initAccentSwitch();
  initFaq();
}

if(document.readyState!=='loading'){initSite();}
else{document.addEventListener('DOMContentLoaded',initSite);}
