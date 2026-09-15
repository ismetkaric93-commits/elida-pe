(() => {
  const dialog=document.getElementById('lightbox');
  const large=document.getElementById('large-photo');
  const caption=document.getElementById('caption');
  const close=document.getElementById('close');
  document.querySelectorAll('.photo').forEach((card)=>{
    card.tabIndex=0; card.setAttribute('role','button');
    const openPhoto=()=>{ if(!dialog||!large)return; large.src=card.dataset.src||card.querySelector('img')?.src||''; large.alt=card.dataset.caption||card.querySelector('img')?.alt||'Uvećana fotografija'; if(caption)caption.textContent=card.dataset.caption||card.querySelector('figcaption')?.textContent||''; dialog.showModal?.(); };
    card.addEventListener('click',openPhoto);
    card.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPhoto();}});
  });
  close?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',(e)=>{if(e.target===dialog)dialog.close();});
})();
