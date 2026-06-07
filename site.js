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
}

if(document.readyState!=='loading'){initSite();}
else{document.addEventListener('DOMContentLoaded',initSite);}
