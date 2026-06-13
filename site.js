/* Single source of truth for the header and footer.
   Each page sets <body data-page="..."> and drops
   <div id="site-header"></div> + <div id="site-footer"></div>. */

var chevron='<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>';

function navItem(key,label,active,dropHTML,wide){
  var isActive=(active===key)||
    (key==='whatwedo'&&['whatwedo'].indexOf(active)!==-1)||
    (key==='company'&&active==='company')||
    (key==='approach'&&active==='approach');
  return '<div class="nav-item" data-key="'+key+'">'+
    '<button class="nav-trigger'+(isActive?' active':'')+'" aria-haspopup="true" aria-expanded="false">'+
      label+chevron+
    '</button>'+
    '<div class="nav-drop" role="menu">'+dropHTML+'</div>'+
  '</div>';
}

function dropLink(href,label,active){
  return '<a href="'+href+'" class="drop-item'+(active?' active':'')+'" role="menuitem">'+label+'</a>';
}

function headerHTML(active){
  var home=
    dropLink('index.html','Home',active==='home')+
    dropLink('index.html#pillars','Our Practices',false)+
    dropLink('index.html#top','See the demo',false);

  var services=
    dropLink('what-we-do.html','All Services',active==='whatwedo')+
    dropLink('it-consulting.html','IT Consulting',false)+
    dropLink('ai-solutions.html','AI Platforming',false)+
    dropLink('affiliate-marketing.html','Affiliate Marketing',false);

  var approach=
    dropLink('approach.html','How We Work',active==='approach')+
    dropLink('contact.html','Start a Project',false);

  var company=
    dropLink('about.html','About ProPeersInfo',active==='company')+
    dropLink('https://propeersinfo.com','Parent Company ↗',false);

  return ''+
  '<div class="annc" id="annc"><div class="wrap">'+
    '<span>ProPeersInfo Inc. is the new US arm of Professional Peers Info Services.</span>'+
    '<a href="about.html">Read the story &rarr;</a>'+
    '<button id="annc-x" aria-label="Dismiss">&times;</button>'+
  '</div></div>'+
  '<header id="hdr"><div class="wrap"><nav>'+
    '<a href="index.html" class="logo"><img class="lockup" src="assets/logo.png" alt="ProPeersInfo"></a>'+
    '<div class="navlinks" id="navlinks">'+
      navItem('home','Home',active,home)+
      navItem('whatwedo','What We Do',active,services)+
      navItem('approach','Approach',active,approach)+
      navItem('company','Company',active,company)+
    '</div>'+
    '<div class="nav-cta">'+
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
        '<a href="index.html" class="logo"><img class="lockup" src="assets/logo.png" alt="ProPeersInfo"></a>'+
        '<p class="desc">ProPeersInfo Inc. is the US subsidiary of Professional Peers Info Services. We handle the software and the AI inside it, plus the marketing that brings people in.</p>'+
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
      '<span>&copy; 2026 ProPeersInfo Inc., a US company and the American arm of Professional Peers Info Services. All rights reserved.</span>'+
      '<div class="socials">'+
        '<a href="https://www.facebook.com/ProPeersInfo" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>'+
        '<a href="https://twitter.com/ProPeersInfo" target="_blank" rel="noopener" aria-label="X / Twitter"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>'+
        '<a href="https://www.instagram.com/propeersinfoinc" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>'+
        '<a href="https://www.linkedin.com/in/propeersinfo-inc-03311a415/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>'+
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
    var subject=encodeURIComponent('Project inquiry from '+(name||'the ProPeersInfo website'));
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
  var img=document.createElement('img');
  img.src='assets/intro.gif';
  img.alt='';
  img.width=864;
  img.height=864;
  o.appendChild(img);
  document.body.appendChild(o);
  document.body.classList.add('intro-hold');

  // Wait for GIF to be loaded AND at least one full loop to play.
  // We use 3800ms as the minimum display time (covers a typical 2-4s logo loop).
  var minWait=3800;
  var start=Date.now();

  function dismiss(){
    var elapsed=Date.now()-start;
    var remaining=Math.max(0, minWait-elapsed);
    setTimeout(function(){
      o.classList.add('out');
      document.body.classList.remove('intro-hold');
      setTimeout(function(){ o.remove(); },650);
    }, remaining);
  }

  if(img.complete && img.naturalWidth>0){
    dismiss();
  } else {
    img.addEventListener('load', dismiss);
    img.addEventListener('error', function(){
      // If GIF fails to load, still dismiss after minimum wait
      dismiss();
    });
    // Fallback: force dismiss after 5s regardless
    setTimeout(function(){
      if(document.body.classList.contains('intro-hold')){
        o.classList.add('out');
        document.body.classList.remove('intro-hold');
        setTimeout(function(){ if(o.parentNode) o.remove(); },650);
      }
    }, 5000);
  }
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
  var sel='.demo-chart,.demo-trace,.demo-chat,.demo-funnel,.demo-funnel-svg';
  var nodes=document.querySelectorAll(sel);
  if(!nodes.length) return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(entry){
      if(!entry.isIntersecting) return;
      io.unobserve(entry.target);
      var parent=entry.target.closest('.reveal');
      var delay=parent ? 600 : 0;
      setTimeout(function(){
        entry.target.classList.add('in');
        // also trigger sprint bar which is a sibling in the same pane
        var pane=entry.target.closest('.tab-pane');
        if(pane){
          pane.querySelectorAll('.ds-fill').forEach(function(el){
            el.style.transform='scaleX('+( el.style.getPropertyValue('--w')||el.parentElement.style.getPropertyValue('--w')||'.76')+')';
          });
        }
      }, delay);
    });
  },{threshold:.1});
  nodes.forEach(function(n){
    var pane=n.closest('.tab-pane');
    if(!pane || pane.classList.contains('on')){
      io.observe(n);
    }
  });
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

  var annc=document.getElementById('annc');
  if(annc){
    if(localStorage.getItem('ppi-annc')==='off'){ annc.remove(); }
    else{
      document.getElementById('annc-x').addEventListener('click',function(){
        annc.remove(); localStorage.setItem('ppi-annc','off');
      });
    }
  }

  document.querySelectorAll('.tabs').forEach(function(tabs){
    var btns=tabs.querySelectorAll('.tab-btn');
    var panes=tabs.querySelectorAll('.tab-pane');
    btns.forEach(function(btn,i){
      btn.addEventListener('click',function(){
        btns.forEach(function(b){ b.classList.remove('on'); b.setAttribute('aria-selected','false'); });
        panes.forEach(function(p){ p.classList.remove('on'); });
        btn.classList.add('on'); btn.setAttribute('aria-selected','true');
        panes[i].classList.add('on');
        // demos in hidden panes never intersect, so kick their animation here
        panes[i].querySelectorAll('.demo-chart,.demo-trace,.demo-chat,.demo-funnel,.demo-funnel-svg').forEach(function(d){
          requestAnimationFrame(function(){ d.classList.add('in'); });
        });
        // also kick sprint bar
        panes[i].querySelectorAll('.ds-fill').forEach(function(el){
          var w=el.style.getPropertyValue('--w')||'.76';
          requestAnimationFrame(function(){ el.style.transform='scaleX('+w+')'; });
        });
      });
    });
  });

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.14});
  var i=0;
  document.querySelectorAll('.reveal').forEach(function(elm){
    elm.style.transitionDelay=((i++%4)*70)+'ms';
    io.observe(elm);
  });

  /* ---- nav dropdowns ---- */
  var navItems=document.querySelectorAll('.nav-item');
  function closeAll(){
    navItems.forEach(function(ni){
      ni.classList.remove('open');
      var t=ni.querySelector('.nav-trigger');
      if(t) t.setAttribute('aria-expanded','false');
    });
  }
  navItems.forEach(function(ni){
    var trigger=ni.querySelector('.nav-trigger');
    if(!trigger) return;
    trigger.addEventListener('click',function(e){
      e.stopPropagation();
      var isOpen=ni.classList.contains('open');
      closeAll();
      if(!isOpen){
        ni.classList.add('open');
        trigger.setAttribute('aria-expanded','true');
      }
    });
  });
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeAll(); });
  // prevent clicks inside a dropdown from bubbling up and closing it
  document.querySelectorAll('.nav-drop').forEach(function(drop){
    drop.addEventListener('click',function(e){ e.stopPropagation(); });
  });

  /* ---- burger: toggle mobile nav ---- */
  var burger=document.getElementById('burger');
  var navlinks=document.getElementById('navlinks');
  if(burger && navlinks){
    burger.addEventListener('click',function(e){
      e.stopPropagation();
      navlinks.classList.toggle('open');
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
