(() => {
 const form=document.getElementById('cma-newsletter');if(!form)return;
 const button=form.querySelector('button[type="submit"]');const status=document.getElementById('cma-lead-status');
 form.addEventListener('submit',async(event)=>{
  event.preventDefault();if(button.disabled||!form.reportValidity())return;
  button.disabled=true;button.textContent='Sending…';status.textContent='';delete status.dataset.state;
  try{
   const data=new FormData(form);
   const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json',apikey:'sb_publishable_MQz1s2hIcpM-w83-akFCPA_TJDDgYjG'},body:JSON.stringify({email:data.get('email'),consent:data.get('consent')==='on',website:data.get('website')||''}),signal:AbortSignal.timeout(15000)});
   const result=await response.json().catch(()=>null);
   if(!response.ok||result?.success!==true)throw new Error(result?.error||'Sign-up is temporarily unavailable. Please try again later.');
   form.reset();status.dataset.state='success';status.textContent='Your email has been registered successfully! We will be in touch soon.';
  }catch(error){status.dataset.state='error';status.textContent=error instanceof Error?error.message:'We could not save your email. Please try again.';}
  finally{button.disabled=false;button.textContent='Subscribe';}
 });
})();
