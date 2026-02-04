// Elements
const openBtn = document.getElementById('openGift');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.querySelector('.modal');
const closeBtn = document.getElementById('modalClose');
const messageTextEl = document.getElementById('messageText');

// The affectionate message (feel free to edit)
const fullMessage = `Valentine này, anh chỉ mong em luôn vui vẻ và cảm nhận được rằng có một người thật lòng nghĩ về em. Anh biết mỗi ngày em đi làm rất mệt, có những lúc áp lực mà anh vẫn chưa thể ở bên san sẻ hay giúp em được nhiều. Điều đó khiến anh tự nhắc bản thân phải cố gắng hơn nữa. Anh muốn học nhiều hơn, trưởng thành hơn, để sau này có một tương lai đủ vững vàng, đủ bình yên cho cả hai. Anh không hứa những điều quá lớn lao, chỉ xin em cho anh 10 năm để nỗ lực, để chứng minh bằng hành động, và anh nhất định sẽ cưới em về làm vợ anh.`;

function showFireworks(text){
  const container = document.createElement('div');
  container.className = 'fireworks-container';
  text.split('').forEach((ch,i)=>{
    const span = document.createElement('span');
    span.textContent = ch;
    span.style.animationDelay = (i*35)+'ms';
    container.appendChild(span);
  });
  // insert at top of modal content
  const modalContent = document.querySelector('.modal-content');
  modalContent.appendChild(container);
}

function typeMessage(el, text, ms=25){
  el.textContent = '';
  let i=0;
  const t = setInterval(()=>{
    el.textContent += text[i]||'';
    i++;
    if(i>text.length){ clearInterval(t);}  
  }, ms);
}

function openModal(){
  // animate button
  openBtn.disabled = true;
  // show overlay
  modalOverlay.classList.remove('hidden');
  modal.classList.add('show');
  modalOverlay.setAttribute('aria-hidden','false');
  // small fireworks animation
  showFireworks('Chúc em luôn hạnh phúc ❤️');
  // type the main message
  const messageEl = document.getElementById('messageText');
  typeMessage(messageEl, fullMessage, 18);
  // focus close button for accessibility
  closeBtn.focus();
}

function closeModal(){
  modal.classList.remove('show');
  modalOverlay.setAttribute('aria-hidden','true');
  // remove fireworks
  const fw = document.querySelector('.fireworks-container');
  if(fw) fw.remove();
  // hide overlay after animation
  setTimeout(()=>{
    modalOverlay.classList.add('hidden');
    openBtn.disabled = false;
    openBtn.focus();
  },280);
}

// Events
openBtn.addEventListener('click', (e)=>{ e.preventDefault(); openModal(); });
closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e)=>{ if(e.target===modalOverlay) closeModal(); });
document.addEventListener('keydown',(e)=>{ if(e.key==='Escape' && !modalOverlay.classList.contains('hidden')) closeModal(); });

// For progressive enhancement: ensure message text is present for non-JS users
messageTextEl.textContent = '';
