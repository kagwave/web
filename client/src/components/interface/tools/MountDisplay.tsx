export default function MountDisplay(iconUrl: string | undefined | boolean, pageTitle: string | undefined, location?: string) {

  let link: any = document.querySelector("link[rel='icon']")!

  if (iconUrl === undefined && link) {
    link!.href = "favicon.ico";
  } else {
    link!.href = iconUrl;   
  }

  if (pageTitle === undefined) {
    document.title = "Kagwave";
  } else if (location === undefined){
    document.title = pageTitle + " | Kagwave";
  } else {
    document.title = pageTitle;
  }

  if (location === undefined) {
    document.body.style.overflow = 'auto';
    if (document.querySelector('.header-bar') !== null) {
      var header: any = document.querySelector('.header-bar');
      var navbar: any = document.querySelector('.navbar');
      var body = document.getElementById('page-content');
      var footer = document.getElementById("footer-container");
      header!.style.display = 'flex';
      navbar!.style.display = 'flex';
      if (body) body.classList.remove("blur-effect");
      if (header) header.classList.remove("blur-effect");
      if (footer) footer.classList.remove("blur-effect");
    }
  } else if (location === 'world'){
    document.getElementById('page-content')!.style.maxHeight = '100vh';
    document.getElementById('page-content')!.style.marginTop = '0';
    document.body.style.overflow = 'hidden'
  }
    
}