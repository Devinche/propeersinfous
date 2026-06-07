/* Single source of truth for the header and footer.
   Each page sets <body data-page="..."> and drops
   <div id="site-header"></div> + <div id="site-footer"></div>. */

function headerHTML(active){
  const a=(href,label,key)=>'<a href="'+href+'"'+(active===key?' class="active"':'')+'>'+label+'</a>';
  return ''+
  '<header id="hdr"><div class="wrap"><nav>'+
    '<a href="index.html" class="logo"><span class="mark">P</span> ProPeers <span class="us">US</span></a>'+
    '<div class="navlinks">'+
      a('what-we-do.html','What We Do','whatwedo')+
      a('about.html','Company','company')+
      a('approach.html','Approach','approach')+
      a('contact.html','Contact','contact')+
    '</div>'+
    '<div class="nav-cta">'+
      '<a href="contact.html" class="btn btn-ghost">Talk to us</a>'+
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
        '<a href="index.html" class="logo"><span class="mark">P</span> ProPeers <span class="us">US</span></a>'+
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
        '<p><a href="mailto:sales@propeersinfo.com">sales@propeersinfo.com</a></p>'+
        '<p><a href="tel:+17817244137">+1 781-724-4137</a></p>'+
        '<p>United States</p>'+
      '</div>'+
    '</div>'+
    '<div class="foot-bottom">'+
      '<span>&copy; 2026 ProPeers Inc. A subsidiary of Professional Peers Info Services Pvt. Ltd. All rights reserved.</span>'+
      '<div class="socials">'+
        '<a href="https://www.facebook.com/ProPeersInfo" target="_blank" rel="noopener" aria-label="Facebook">f</a>'+
        '<a href="https://twitter.com/ProPeersInfo" target="_blank" rel="noopener" aria-label="Twitter">&#120143;</a>'+
        '<a href="http://in.linkedin.com/in/propeersinfo" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>'+
      '</div>'+
    '</div>'+
  '</div></footer>';
}

/* contact form -> opens the visitor's email client with the fields filled in.
   To collect submissions without email, point the <form> at a service like
   Formspree (set action + method="POST") and remove the onsubmit handler. */
function submitContact(e){
  e.preventDefault();
  var el=e.target.elements;
  var name=(el.fullname.value||'').trim();
  var email=(el.email.value||'').trim();
  var company=(el.company.value||'').trim();
  var need=el.need.value;
  var message=(el.message.value||'').trim();
  var subject=encodeURIComponent('Project inquiry from '+(name||'the ProPeers website'));
  var body=encodeURIComponent(
    'Name: '+name+'\n'+
    'Email: '+email+'\n'+
    'Company: '+company+'\n'+
    'Interested in: '+need+'\n\n'+
    message
  );
  var status=document.getElementById('cstatus');
  if(status){status.textContent='Opening your email app with the message ready to send.';}
  window.location.href='mailto:sales@propeersinfo.com?subject='+subject+'&body='+body;
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

/* ---- motion: cursor aura that eases toward the pointer ---- */
function initCursorAura(){
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var aura=document.createElement('div');
  aura.className='cursor-aura';
  document.body.appendChild(aura);
  var tx=0,ty=0,x=0,y=0,started=false;
  window.addEventListener('mousemove',function(e){
    tx=e.clientX; ty=e.clientY;
    if(!started){ x=tx; y=ty; started=true; aura.classList.add('live'); }
  },{passive:true});
  window.addEventListener('mouseleave',function(){ aura.classList.remove('live'); });
  (function tick(){
    x+=(tx-x)*.12; y+=(ty-y)*.12;
    aura.style.transform='translate('+x+'px,'+y+'px) translate(-50%,-50%)';
    requestAnimationFrame(tick);
  })();
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

function initSite(){
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
}

if(document.readyState!=='loading'){initSite();}
else{document.addEventListener('DOMContentLoaded',initSite);}
