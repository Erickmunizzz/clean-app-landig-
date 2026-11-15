import type {APIRoute} from 'astro';
export const prerender=false;
// All subscription creation belongs to the authenticated app backend.
export const POST:APIRoute=async({request})=>{
 if(request.headers.get('origin')!=='https://cleanmaapp.com')return Response.json({error:'Origin not allowed'},{status:403});
 const authorization=request.headers.get('authorization');if(!authorization?.startsWith('Bearer '))return Response.json({error:'Sign in at https://cleanmaapp.com/admin/login before subscribing.'},{status:401});
 try{const input=await request.text();if(input.length>4096)return Response.json({error:'Request too large'},{status:413});const payload=JSON.parse(input);const response=await fetch('https://cleanmaapp.com/api/payments',{method:'POST',headers:{Authorization:authorization,'Content-Type':'application/json',Origin:'https://cleanmaapp.com'},body:JSON.stringify({...payload,action:'checkout'}),signal:AbortSignal.timeout(15000)});return new Response(await response.text(),{status:response.status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});}catch{return Response.json({error:'Checkout unavailable. Please try again.'},{status:503});}
};
