const products = [
  {id:'ip15pro',brand:'Apple',name:'iPhone 15 Pro',spec:'256GB · 原色钛金属',price:3680,original:7999,condition:95,battery:'91%',tag:'本周热卖',image:'assets/phone-iphone.jpg',date:12,description:'外观轻微使用痕迹，屏幕显示与触控正常。原装屏幕，功能齐全，电池健康 91%。'},
  {id:'mate60pro',brand:'华为',name:'HUAWEI Mate 60 Pro',spec:'256GB · 雅川青',price:3180,original:6999,condition:95,battery:'92%',tag:'成色不错',image:'assets/phone-pixel.jpg',date:11,description:'机身有轻微细纹，屏幕无明显划痕。卫星通话、影像和各项功能均已检测。'},
  {id:'s24ultra',brand:'Samsung',name:'Samsung Galaxy S24 Ultra',spec:'256GB · 钛灰',price:4680,original:10199,condition:99,battery:'96%',tag:'近乎全新',image:'assets/phone-samsung.jpg',date:10,description:'整体成色接近全新，屏幕无划痕，S Pen 与相机功能正常。附赠通用充电线。'},
  {id:'xiaomi14',brand:'小米',name:'Xiaomi 14',spec:'256GB · 黑色',price:2380,original:3999,condition:95,battery:'94%',tag:'人气好机',image:'assets/phone-xiaomi.jpg',date:9,description:'正常轻微使用痕迹，屏幕状态良好，徕卡影像功能正常。电池健康度良好。'},
  {id:'ip14',brand:'Apple',name:'iPhone 14',spec:'128GB · 午夜色',price:2280,original:5999,condition:95,battery:'89%',tag:'实惠入手',image:'assets/phone-product.jpg',date:8,description:'边框有少量细小使用痕迹，屏幕无明显划伤。人脸识别、相机与扬声器正常。'},
  {id:'pura70pro',brand:'华为',name:'HUAWEI Pura 70 Pro',spec:'256GB · 雪域白',price:3280,original:6499,condition:99,battery:'97%',tag:'近乎全新',image:'assets/phone-pixel.jpg',date:7,description:'整体状态优秀，屏幕与机身细节干净。长焦微距、超聚光影像均已检测正常。'},
  {id:'oppoX7',brand:'OPPO',name:'OPPO Find X7',spec:'256GB · 大漠银月',price:2080,original:3999,condition:95,battery:'92%',tag:'好价精选',image:'assets/phone-xiaomi.jpg',date:6,description:'轻微使用痕迹，屏幕无明显划痕，哈苏影像与快充功能正常。'},
  {id:'ip13',brand:'Apple',name:'iPhone 13',spec:'128GB · 粉色',price:1580,original:4799,condition:90,battery:'86%',tag:'千元好机',image:'assets/phone-product.jpg',date:5,description:'机身有正常使用痕迹，屏幕显示正常，所有基础功能均通过检测。'},
  {id:'s23',brand:'Samsung',name:'Samsung Galaxy S23',spec:'256GB · 幽夜黑',price:2180,original:6999,condition:95,battery:'90%',tag:'轻巧旗舰',image:'assets/phone-samsung.jpg',date:4,description:'机身轻微使用痕迹，屏幕显示正常。相机、指纹与充电接口检测通过。'},
  {id:'redmik70',brand:'小米',name:'Redmi K70 Pro',spec:'256GB · 墨羽',price:1680,original:3599,condition:95,battery:'94%',tag:'性能之选',image:'assets/phone-xiaomi.jpg',date:3,description:'轻微使用痕迹，性能与散热状态良好。原装屏幕，各项功能正常。'},
  {id:'ip15',brand:'Apple',name:'iPhone 15',spec:'128GB · 蓝色',price:2980,original:5999,condition:99,battery:'98%',tag:'近乎全新',image:'assets/phone-iphone.jpg',date:2,description:'成色接近全新，电池健康 98%。屏幕、相机与 USB-C 接口检测正常。'},
  {id:'ip14promax',brand:'Apple',name:'iPhone 14 Pro Max',spec:'256GB · 深空黑',price:3480,original:8999,condition:90,battery:'87%',tag:'大屏旗舰',image:'assets/phone-product.jpg',date:1,description:'机身有正常使用痕迹，屏幕功能完好。灵动岛、Face ID、长焦相机均检测正常。'}
];

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
const money = value => value.toLocaleString('zh-CN');
const productById = id => products.find(item => item.id === id);
function storedSet(key){try{return new Set(JSON.parse(localStorage.getItem(key)||'[]'));}catch{return new Set();}}
const state={brand:'全部',price:'all',minPrice:'',maxPrice:'',conditions:new Set(),query:'',sort:'featured',favoritesOnly:false,favorites:storedSet('shiji-favorites'),bag:storedSet('shiji-bag')};

function filteredProducts(){
  let list=products.filter(item=>{
    const queryMatch=!state.query||(item.name+' '+item.brand+' '+item.spec).toLowerCase().includes(state.query.toLowerCase());
    const brandMatch=state.brand==='全部'||item.brand===state.brand;
    let priceMatch=true;
    if(state.price!=='all'){const bounds=state.price.split('-').map(Number);priceMatch=item.price>=bounds[0]&&item.price<bounds[1];}
    const customMatch=(!state.minPrice||item.price>=Number(state.minPrice))&&(!state.maxPrice||item.price<=Number(state.maxPrice));
    const conditionMatch=!state.conditions.size||state.conditions.has(String(item.condition));
    return queryMatch&&brandMatch&&priceMatch&&customMatch&&conditionMatch&&(!state.favoritesOnly||state.favorites.has(item.id));
  });
  if(state.sort==='price-asc')list.sort((a,b)=>a.price-b.price);
  if(state.sort==='price-desc')list.sort((a,b)=>b.price-a.price);
  if(state.sort==='newest')list.sort((a,b)=>b.date-a.date);
  return list;
}
function cardTemplate(item){
  const isFavorite=state.favorites.has(item.id);
  const badge=item.condition>=99?'product-badge':('product-badge'+(item.price<2000?' special':''));
  return '<article class="product-card" data-id="'+item.id+'" tabindex="0" aria-label="查看 '+item.name+' 商品详情">'+
    '<div class="product-photo"><img class="product-image" src="'+item.image+'" alt="'+item.name+' 实拍参考图" loading="lazy"><span class="'+badge+'">'+item.tag+'</span>'+ 
    '<button class="favorite-button'+(isFavorite?' active':'')+'" data-action="favorite" aria-label="'+(isFavorite?'取消':'添加')+'收藏" aria-pressed="'+isFavorite+'">'+(isFavorite?'♥':'♡')+'</button>'+ 
    '<button class="quick-add" data-action="add"><span>加入购物袋</span><span>＋</span></button></div>'+ 
    '<div class="product-info"><div class="product-meta"><span>'+item.brand+'</span><span class="condition-pill">'+item.condition+' 新</span></div><h3>'+item.name+'</h3><div class="product-spec">'+item.spec+'</div>'+ 
    '<div class="product-bottom"><span class="product-price"><small>¥</small>'+money(item.price)+'</span><span class="product-original">¥'+money(item.original)+'</span><span class="product-saving">省 '+money(item.original-item.price)+'</span></div></div></article>';
}
function render(){
  const list=filteredProducts();
  $('#productGrid').innerHTML=list.map(cardTemplate).join('');
  $('#resultCount').textContent=list.length;
  $('#emptyState').classList.toggle('hidden',list.length>0);$('#productGrid').classList.toggle('hidden',list.length===0);
  $('#resultLabel').textContent=state.favoritesOnly?'我的收藏':(state.query?'搜索「'+state.query+'」':(state.brand==='全部'?'全部精选':state.brand+' 精选'));
  $('.aside-count').innerHTML=list.length+'<span> 台在售</span>';
  $('#bagCount').textContent=state.bag.size;
  $('#favoriteFilter').classList.toggle('active',state.favoritesOnly);$('#favoriteFilter span').textContent=state.favoritesOnly?'♥':'♡';
}
function persist(){localStorage.setItem('shiji-favorites',JSON.stringify(Array.from(state.favorites)));localStorage.setItem('shiji-bag',JSON.stringify(Array.from(state.bag)));}
let toastTimer;
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2100);}
function setFavorite(id){if(state.favorites.has(id)){state.favorites.delete(id);toast('已取消收藏');}else{state.favorites.add(id);toast('已加入收藏');}persist();render();}
function addToBag(id){if(state.bag.has(id)){toast('这台手机已在购物袋中');return;}state.bag.add(id);persist();render();toast('已加入购物袋');}
function openModal(html){$('#modalContent').innerHTML=html;$('#modalBackdrop').classList.add('open');$('#modalBackdrop').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('#modalClose').focus();}
function closeModal(){$('#modalBackdrop').classList.remove('open');$('#modalBackdrop').setAttribute('aria-hidden','true');document.body.style.overflow='';}
function showProduct(id){
  const item=productById(id);if(!item)return;
  const favoriteLabel=state.favorites.has(id)?'♥ 已收藏':'♡ 收藏';
  const html='<div class="detail-content"><img class="detail-image" src="'+item.image+'" alt="'+item.name+' 实拍参考图"><div class="detail-copy"><span class="mini-label">SHIJI SELECTED · '+item.brand+'</span><h2 id="modalTitle">'+item.name+'</h2><span class="detail-spec">'+item.spec+'</span><div class="detail-price"><small>¥</small>'+money(item.price)+' <span class="product-original">¥'+money(item.original)+'</span></div>'+ 
  '<div class="detail-facts"><div class="detail-fact"><span>外观成色</span><b>'+item.condition+' 新 · 如实描述</b></div><div class="detail-fact"><span>电池健康</span><b>'+item.battery+'</b></div><div class="detail-fact"><span>检测状态</span><b>32 项检测通过</b></div><div class="detail-fact"><span>发货方</span><b>拾机严选仓</b></div></div>'+ 
  '<p class="detail-description">'+item.description+' 页面商品图片用于展示机型，实际外观成色以收到的商品为准。</p><div class="detail-actions"><button class="button button-dark" data-modal-add="'+item.id+'">加入购物袋 <span>＋</span></button><button class="button button-outline" data-modal-favorite="'+item.id+'">'+favoriteLabel+'</button></div></div></div>';
  openModal(html);
}
function showBag(){
  const items=Array.from(state.bag).map(productById).filter(Boolean);
  const rows=items.map(item=>'<div class="bag-row"><img src="'+item.image+'" alt=""><div class="bag-row-main"><b>'+item.name+'</b><span>'+item.spec+' · '+item.condition+' 新</span></div><span class="bag-row-price">¥'+money(item.price)+'</span><button class="bag-remove" data-remove="'+item.id+'">移除</button></div>').join('');
  const total=items.reduce((sum,item)=>sum+item.price,0);
  let content='<div class="bag-modal-content"><span class="mini-label">YOUR GOOD FINDS</span><h2 id="modalTitle">我的购物袋 <span class="result-count">'+items.length+' 台</span></h2>';
  if(items.length)content+='<div class="bag-list">'+rows+'</div><div class="bag-total"><span>商品金额 <small>（参考价）</small></span><strong>¥'+money(total)+'</strong></div><div class="bag-footer"><small>示例商城暂不支持真实下单，商品价格请以实际检测及交易为准。</small><button class="button button-dark" id="checkoutButton">确认商品 <span>↗</span></button></div>';
  else content+='<div class="bag-empty">购物袋还是空的，去挑一台喜欢的好机吧。</div><a class="button button-dark" href="#shop" id="continueShopping">去逛好机 <span>↘</span></a>';
  openModal(content+'</div>');
}
function resetFilters(){
  state.brand='全部';state.price='all';state.minPrice='';state.maxPrice='';state.conditions.clear();state.query='';state.favoritesOnly=false;
  $('#searchInput').value='';$('#minPrice').value='';$('#maxPrice').value='';$$('.check-option input').forEach(input=>input.checked=false);
  $$('[data-brand]').forEach(button=>button.classList.toggle('selected',button.dataset.brand==='全部'));
  $$('[data-price]').forEach(button=>button.classList.toggle('selected',button.dataset.price==='all'));render();
}

$('#brandOptions').addEventListener('click',event=>{const button=event.target.closest('[data-brand]');if(!button)return;state.brand=button.dataset.brand;$$('[data-brand]').forEach(el=>el.classList.toggle('selected',el===button));render();});
$$('[data-price]').forEach(button=>button.addEventListener('click',()=>{state.price=button.dataset.price;$$('[data-price]').forEach(el=>el.classList.toggle('selected',el===button));render();}));
$('#minPrice').addEventListener('input',event=>{state.minPrice=event.target.value;render();});$('#maxPrice').addEventListener('input',event=>{state.maxPrice=event.target.value;render();});
$$('.check-option input').forEach(input=>input.addEventListener('change',()=>{if(input.checked)state.conditions.add(input.value);else state.conditions.delete(input.value);render();}));
$('#searchInput').addEventListener('input',event=>{state.query=event.target.value.trim();render();});$('#sortSelect').addEventListener('change',event=>{state.sort=event.target.value;render();});
$('#favoriteFilter').addEventListener('click',()=>{state.favoritesOnly=!state.favoritesOnly;render();});$('#clearFilters').addEventListener('click',resetFilters);$('#emptyReset').addEventListener('click',resetFilters);
$('#mobileFilterButton').addEventListener('click',()=>{const isOpen=$('.filter-panel').classList.toggle('mobile-open');$('#mobileFilterButton').setAttribute('aria-expanded',String(isOpen));});
$('#productGrid').addEventListener('click',event=>{const card=event.target.closest('.product-card');if(!card)return;const action=event.target.closest('[data-action]')?.dataset.action;if(action==='favorite'){event.stopPropagation();setFavorite(card.dataset.id);return;}if(action==='add'){event.stopPropagation();addToBag(card.dataset.id);return;}showProduct(card.dataset.id);});
$('#productGrid').addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.classList.contains('product-card')){event.preventDefault();showProduct(event.target.dataset.id);}});
$('#bagButton').addEventListener('click',showBag);$('#modalClose').addEventListener('click',closeModal);
$('#modalBackdrop').addEventListener('click',event=>{if(event.target===$('#modalBackdrop'))closeModal();});
$('#modalContent').addEventListener('click',event=>{
  const add=event.target.closest('[data-modal-add]'),favorite=event.target.closest('[data-modal-favorite]'),remove=event.target.closest('[data-remove]');
  if(add){addToBag(add.dataset.modalAdd);return;}
  if(favorite){const id=favorite.dataset.modalFavorite;setFavorite(id);showProduct(id);return;}
  if(remove){state.bag.delete(remove.dataset.remove);persist();showBag();render();return;}
  if(event.target.id==='checkoutButton'){toast('这是商品展示页面，暂未开放真实下单');return;}
  if(event.target.id==='continueShopping')closeModal();
});
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#searchInput').focus();}
  if(event.key==='Escape'){if($('#modalBackdrop').classList.contains('open'))closeModal();else if($('.search-box').classList.contains('expanded'))$('.search-box').classList.remove('expanded');}
});
$('#menuToggle').addEventListener('click',()=>$('.main-nav').classList.toggle('open'));
const searchBox=$('.search-box');
$('#searchInput').addEventListener('focus',()=>{if(innerWidth<=600)searchBox.classList.add('expanded');});
$('#searchInput').addEventListener('blur',()=>{if(innerWidth<=600&&!$('#searchInput').value)searchBox.classList.remove('expanded');});
render();
