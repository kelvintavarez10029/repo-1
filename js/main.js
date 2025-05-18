const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = 'theme-tab';
const switcherbtn = 'switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';
const modelOpen = '[data-open]';
const modelClose = '[data-close]';
const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';
const isVisible = 'is-visible';
const searchBox = document.querySelector('#search');

const openModel = document.querySelectorAll(modelOpen);
const closeModel = document.querySelectorAll(modelClose);
const filterLink =document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);

const setActive = (el,selector)=>{    
  if(document.querySelector(`${selector}.${active}`) !== null){
    document.querySelector(`${selector}.${active}`).classList.remove(active);
   ;
}
    el.classList.add(active);
}

const root = document.documentElement;

// pop-up model and full model
for( const el of openModel ){
    el.addEventListener('click', function(){
        const modelId = this.dataset.open;
        document.getElementById(modelId).classList.add(isVisible);
    })
}
for(const el of closeModel){
  el.addEventListener('click', function(){
      const model = this.closest('.model') || this.closest('.full-site-model');
      if(model) {
          model.classList.remove(isVisible);
      }
  })
}
// model popup 
document.addEventListener('click', (e) => {
    if(e.target === document.querySelector('.model.is-visible')){
      document.querySelector('.model.is-visible').classList.remove(isVisible);
    }
})
document.addEventListener('keyup', (e) => {
  if(e.key === 'Escape'){
    document.querySelector('.model.is-visible').classList.remove(isVisible);
  }
})

// Theme Switcher

const toggleTheme = document.querySelector(`.${themeTab}`);
const switcher = document.querySelectorAll(`.${switcherbtn}`);
const currentTheme = localStorage.getItem(theme);

// model
if(currentTheme)

toggleTheme.addEventListener('click', function(){
    const tab = this.parentElement.parentElement;
  if( !tab.className.includes(open) ){
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
})

const setTheme =(val)=>{
  if(val === dark){   
    root.setAttribute(dataTheme,dark);
    localStorage.setItem(theme,dark);
}
else{
    root.setAttribute(dataTheme,light);
    localStorage.setItem(theme,light);
}
}
if(currentTheme){
  root.setAttribute(dataTheme,currentTheme);
  switcher.forEach((btn)  =>{
   btn.classList.remove(active);
  }
);
if(currentTheme === dark){
    setActive(switcher[1],`.${switcherbtn}`);

}
else{
    setActive(switcher[0],`.${switcherbtn}`);
}
}
for( const el of switcher ){
    el.addEventListener('click', function(){
        const toggle = this.dataset.theme;
        setActive(el,`.${switcherbtn}`);
        setTheme(toggle);
    })
}
searchBox.addEventListener('keyup', (e) =>{
  const searchInput = e.target.value.toLowerCase().trim();
    portfolioItems.forEach(card =>{
    if(card.dataset.item.includes(searchInput)){
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  })
})
// filter
for (const link of filterLink) {
  link.addEventListener('click', function () {
    setActive(link, dataFilter);  
    const filter = this.dataset.filter;

    portfolioItems.forEach((card) => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.item === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
// carousel
const elmsDisplayed = getComputedStyle(root).getPropertyValue('--marque-elms-displayed');
const marqueContent = document.querySelector('ul.marque-content');

root.style.setProperty('--marque-elms', marqueContent.children.length);

for(let i = 0; i < elmsDisplayed; i += 1){
 marqueContent.appendChild(marqueContent.children[i].cloneNode(true));
}





