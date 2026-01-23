import{k as T,m as M,r as A,n as R,o as c,p as B,A as P,O as fe,q as I,s as Y,R as O,t as Ye,u as D,v as S,w as ht,x as Fi,W as qt,y as ri,z as At,B as Je,M as vi,F as Te,G as qi,H as Be,I as ai,J as si,K as Hi}from"./index-2iFGnYQV.js";import{n as u,c as y,o as v,r as x,U as ae,e as Ki,f as Gi,a as Yi}from"./index-BnEIw7I0.js";const Ji=T`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var ve=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let se=class extends R{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return this.size==="lg"?e="m":this.size==="md"?e="xs":e="xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),c`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?c`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?c`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:c`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};se.styles=[M,A,Ji];ve([u()],se.prototype,"size",void 0);ve([u()],se.prototype,"name",void 0);ve([u()],se.prototype,"imageSrc",void 0);ve([u()],se.prototype,"walletIcon",void 0);ve([u({type:Boolean})],se.prototype,"installed",void 0);ve([u()],se.prototype,"badgeSize",void 0);se=ve([y("wui-wallet-image")],se);const Qi=T`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var yi=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const _t=4;let Qe=class extends R{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<_t;return c`${this.walletImages.slice(0,_t).map(({src:i,walletName:n})=>c`
            <wui-wallet-image
              size="inherit"
              imageSrc=${i}
              name=${v(n)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(_t-this.walletImages.length)].map(()=>c` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};Qe.styles=[A,Qi];yi([u({type:Array})],Qe.prototype,"walletImages",void 0);Qe=yi([y("wui-all-wallets-image")],Qe);const Xi=T`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var U=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let k=class extends R{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return c`
      <button ?disabled=${this.disabled} tabindex=${v(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?c` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?c` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?c`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?c`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?c`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?c`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?c`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};k.styles=[A,M,Xi];U([u({type:Array})],k.prototype,"walletImages",void 0);U([u()],k.prototype,"imageSrc",void 0);U([u()],k.prototype,"name",void 0);U([u()],k.prototype,"tagLabel",void 0);U([u()],k.prototype,"tagVariant",void 0);U([u()],k.prototype,"icon",void 0);U([u()],k.prototype,"walletIcon",void 0);U([u()],k.prototype,"tabIdx",void 0);U([u({type:Boolean})],k.prototype,"installed",void 0);U([u({type:Boolean})],k.prototype,"disabled",void 0);U([u({type:Boolean})],k.prototype,"showAllWallets",void 0);U([u({type:Boolean})],k.prototype,"loading",void 0);U([u({type:String})],k.prototype,"loadingSpinnerColor",void 0);k=U([y("wui-list-wallet")],k);var Ne=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let xe=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=B.state.connectors,this.count=P.state.count,this.isFetchingRecommendedWallets=P.state.isFetchingRecommendedWallets,this.unsubscribe.push(B.subscribeKey("connectors",e=>this.connectors=e),P.subscribeKey("count",e=>this.count=e),P.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(s=>s.id==="walletConnect"),{allWallets:i}=fe.state;if(!e||i==="HIDE"||i==="ONLY_MOBILE"&&!I.isMobile())return null;const n=P.state.featured.length,o=this.count+n,t=o<10?o:Math.floor(o/10)*10,a=t<o?`${t}+`:`${t}`;return c`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${a}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${v(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){Y.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),O.push("AllWallets")}};Ne([u()],xe.prototype,"tabIdx",void 0);Ne([x()],xe.prototype,"connectors",void 0);Ne([x()],xe.prototype,"count",void 0);Ne([x()],xe.prototype,"isFetchingRecommendedWallets",void 0);xe=Ne([y("w3m-all-wallets-widget")],xe);var Ht=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Xe=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=B.state.connectors,this.unsubscribe.push(B.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="ANNOUNCED");return e!=null&&e.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(Ye.showConnector).map(i=>c`
              <wui-list-wallet
                imageSrc=${v(D.getConnectorImage(i))}
                name=${i.name??"Unknown"}
                @click=${()=>this.onConnector(i)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${i.id}`}
                .installed=${!0}
                tabIdx=${v(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e.id==="walletConnect"?I.isMobile()?O.push("AllWallets"):O.push("ConnectingWalletConnect"):O.push("ConnectingExternal",{connector:e})}};Ht([u()],Xe.prototype,"tabIdx",void 0);Ht([x()],Xe.prototype,"connectors",void 0);Xe=Ht([y("w3m-connect-announced-widget")],Xe);var pt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Le=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=B.state.connectors,this.loading=!1,this.unsubscribe.push(B.subscribeKey("connectors",e=>this.connectors=e)),I.isTelegram()&&I.isIos()&&(this.loading=!S.state.wcUri,this.unsubscribe.push(S.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{customWallets:e}=fe.state;if(!(e!=null&&e.length))return this.style.cssText="display: none",null;const i=this.filterOutDuplicateWallets(e);return c`<wui-flex flexDirection="column" gap="xs">
      ${i.map(n=>c`
          <wui-list-wallet
            imageSrc=${v(D.getWalletImage(n))}
            name=${n.name??"Unknown"}
            @click=${()=>this.onConnectWallet(n)}
            data-testid=${`wallet-selector-${n.id}`}
            tabIdx=${v(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){const i=ht.getRecentWallets(),n=this.connectors.map(s=>{var l;return(l=s.info)==null?void 0:l.rdns}).filter(Boolean),o=i.map(s=>s.rdns).filter(Boolean),t=n.concat(o);if(t.includes("io.metamask.mobile")&&I.isMobile()){const s=t.indexOf("io.metamask.mobile");t[s]="io.metamask"}return e.filter(s=>!t.includes(String(s==null?void 0:s.rdns)))}onConnectWallet(e){this.loading||O.push("ConnectingWalletConnect",{wallet:e})}};pt([u()],Le.prototype,"tabIdx",void 0);pt([x()],Le.prototype,"connectors",void 0);pt([x()],Le.prototype,"loading",void 0);Le=pt([y("w3m-connect-custom-widget")],Le);var Kt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ze=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=B.state.connectors,this.unsubscribe.push(B.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const i=this.connectors.filter(n=>n.type==="EXTERNAL").filter(n=>n.id!==Fi.CONNECTOR_ID.COINBASE_SDK);return i!=null&&i.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(n=>c`
            <wui-list-wallet
              imageSrc=${v(D.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??"Unknown"}
              data-testid=${`wallet-selector-external-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${v(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){O.push("ConnectingExternal",{connector:e})}};Kt([u()],Ze.prototype,"tabIdx",void 0);Kt([x()],Ze.prototype,"connectors",void 0);Ze=Kt([y("w3m-connect-external-widget")],Ze);var Gt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let et=class extends R{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(e=>c`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${e.id}`}
              imageSrc=${v(D.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${v(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){B.selectWalletConnector(e)}};Gt([u()],et.prototype,"tabIdx",void 0);Gt([u()],et.prototype,"wallets",void 0);et=Gt([y("w3m-connect-featured-widget")],et);var Yt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let tt=class extends R{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){var i;const e=this.connectors;return!(e!=null&&e.length)||e.length===1&&((i=e[0])==null?void 0:i.name)==="Browser Wallet"&&!I.isMobile()?(this.style.cssText="display: none",null):c`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(n=>{var t;const o=(t=n.info)==null?void 0:t.rdns;return!I.isMobile()&&n.name==="Browser Wallet"?null:!o&&!S.checkInstalled()?(this.style.cssText="display: none",null):Ye.showConnector(n)?c`
            <wui-list-wallet
              imageSrc=${v(D.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${v(this.tabIdx)}
            >
            </wui-list-wallet>
          `:null})}
      </wui-flex>
    `}onConnector(e){B.setActiveConnector(e),O.push("ConnectingExternal",{connector:e})}};Yt([u()],tt.prototype,"tabIdx",void 0);Yt([u()],tt.prototype,"connectors",void 0);tt=Yt([y("w3m-connect-injected-widget")],tt);var Jt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let it=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=B.state.connectors,this.unsubscribe.push(B.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="MULTI_CHAIN"&&i.name!=="WalletConnect");return e!=null&&e.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>c`
            <wui-list-wallet
              imageSrc=${v(D.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${v(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){B.setActiveConnector(e),O.push("ConnectingMultiChain")}};Jt([u()],it.prototype,"tabIdx",void 0);Jt([x()],it.prototype,"connectors",void 0);it=Jt([y("w3m-connect-multi-chain-widget")],it);var ft=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Oe=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=B.state.connectors,this.loading=!1,this.unsubscribe.push(B.subscribeKey("connectors",e=>this.connectors=e)),I.isTelegram()&&I.isIos()&&(this.loading=!S.state.wcUri,this.unsubscribe.push(S.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const i=ht.getRecentWallets().filter(n=>!this.connectors.some(o=>o.id===n.id||o.name===n.name));return i.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(n=>c`
            <wui-list-wallet
              imageSrc=${v(D.getWalletImage(n))}
              name=${n.name??"Unknown"}
              @click=${()=>this.onConnectWallet(n)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${v(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){this.loading||B.selectWalletConnector(e)}};ft([u()],Oe.prototype,"tabIdx",void 0);ft([x()],Oe.prototype,"connectors",void 0);ft([x()],Oe.prototype,"loading",void 0);Oe=ft([y("w3m-connect-recent-widget")],Oe);var gt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ae=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,I.isTelegram()&&I.isIos()&&(this.loading=!S.state.wcUri,this.unsubscribe.push(S.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const{connectors:e}=B.state,{customWallets:i,featuredWalletIds:n}=fe.state,o=ht.getRecentWallets(),t=e.find(_=>_.id==="walletConnect"),s=e.filter(_=>_.type==="INJECTED"||_.type==="ANNOUNCED"||_.type==="MULTI_CHAIN").filter(_=>_.name!=="Browser Wallet");if(!t)return null;if(n||i||!this.wallets.length)return this.style.cssText="display: none",null;const l=s.length+o.length,h=Math.max(0,2-l),p=qt.filterOutDuplicateWallets(this.wallets).slice(0,h);return p.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${p.map(_=>c`
            <wui-list-wallet
              imageSrc=${v(D.getWalletImage(_))}
              name=${(_==null?void 0:_.name)??"Unknown"}
              @click=${()=>this.onConnectWallet(_)}
              tabIdx=${v(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){if(this.loading)return;const i=B.getConnector(e.id,e.rdns);i?O.push("ConnectingExternal",{connector:i}):O.push("ConnectingWalletConnect",{wallet:e})}};gt([u()],Ae.prototype,"tabIdx",void 0);gt([u()],Ae.prototype,"wallets",void 0);gt([x()],Ae.prototype,"loading",void 0);Ae=gt([y("w3m-connect-recommended-widget")],Ae);var wt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let je=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=B.state.connectors,this.connectorImages=ri.state.connectorImages,this.unsubscribe.push(B.subscribeKey("connectors",e=>this.connectors=e),ri.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(I.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find(n=>n.id==="walletConnect");if(!e)return this.style.cssText="display: none",null;const i=e.imageUrl||this.connectorImages[(e==null?void 0:e.imageId)??""];return c`
      <wui-list-wallet
        imageSrc=${v(i)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${v(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(e){B.setActiveConnector(e),O.push("ConnectingWalletConnect")}};wt([u()],je.prototype,"tabIdx",void 0);wt([x()],je.prototype,"connectors",void 0);wt([x()],je.prototype,"connectorImages",void 0);je=wt([y("w3m-connect-walletconnect-widget")],je);const Zi=T`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var Me=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ge=class extends R{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=B.state.connectors,this.recommended=P.state.recommended,this.featured=P.state.featured,this.unsubscribe.push(B.subscribeKey("connectors",e=>this.connectors=e),P.subscribeKey("recommended",e=>this.recommended=e),P.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:a,featured:s,external:l}=Ye.getConnectorsByType(this.connectors,this.recommended,this.featured);return Ye.getConnectorTypeOrder({custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:a,featured:s,external:l}).map(p=>{switch(p){case"injected":return c`
            ${t.length?c`<w3m-connect-multi-chain-widget
                  tabIdx=${v(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${n.length?c`<w3m-connect-announced-widget
                  tabIdx=${v(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?c`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${v(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return c`<w3m-connect-walletconnect-widget
            tabIdx=${v(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return c`<w3m-connect-recent-widget
            tabIdx=${v(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return c`<w3m-connect-featured-widget
            .wallets=${s}
            tabIdx=${v(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return c`<w3m-connect-custom-widget
            tabIdx=${v(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return c`<w3m-connect-external-widget
            tabIdx=${v(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return c`<w3m-connect-recommended-widget
            .wallets=${a}
            tabIdx=${v(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${p}`),null}})}};ge.styles=Zi;Me([u()],ge.prototype,"tabIdx",void 0);Me([x()],ge.prototype,"connectors",void 0);Me([x()],ge.prototype,"recommended",void 0);Me([x()],ge.prototype,"featured",void 0);ge=Me([y("w3m-connector-list")],ge);const en=T`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var he=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ee=class extends R{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,i)=>{var o;const n=i===this.activeTab;return c`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(i)}
          data-active=${n}
          data-testid="tab-${(o=e.label)==null?void 0:o.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?c`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,i){const n=this.buttons[this.activeTab],o=this.buttons[e],t=n==null?void 0:n.querySelector("wui-text"),a=o==null?void 0:o.querySelector("wui-text"),s=o==null?void 0:o.getBoundingClientRect(),l=a==null?void 0:a.getBoundingClientRect();n&&t&&!i&&e!==this.activeTab&&(t.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),n.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&s&&l&&a&&(e!==this.activeTab||i)&&(this.localTabWidth=`${Math.round(s.width+l.width)+6}px`,o.animate([{width:`${s.width+l.width}px`}],{duration:i?0:500,fill:"forwards",easing:"ease"}),a.animate([{opacity:1}],{duration:i?0:125,delay:i?0:200,fill:"forwards",easing:"ease"}))}};ee.styles=[A,M,en];he([u({type:Array})],ee.prototype,"tabs",void 0);he([u()],ee.prototype,"onTabChange",void 0);he([u({type:Array})],ee.prototype,"buttons",void 0);he([u({type:Boolean})],ee.prototype,"disabled",void 0);he([u()],ee.prototype,"localTabWidth",void 0);he([x()],ee.prototype,"activeTab",void 0);he([x()],ee.prototype,"isDense",void 0);ee=he([y("wui-tabs")],ee);var bt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ze=class extends R{constructor(){super(),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0,this.buffering=!1,this.unsubscribe.push(S.subscribeKey("buffering",e=>this.buffering=e))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return c`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs
          ?disabled=${this.buffering}
          .tabs=${e}
          .onTabChange=${this.onTabChange.bind(this)}
        ></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(i=>i==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:i==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:i==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:i==="web"?{label:"Webapp",icon:"browser",platform:"web"}:i==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:i})=>i),e}onTabChange(e){var n;const i=this.platformTabs[e];i&&((n=this.onSelectPlatfrom)==null||n.call(this,i))}};bt([u({type:Array})],ze.prototype,"platforms",void 0);bt([u()],ze.prototype,"onSelectPlatfrom",void 0);bt([x()],ze.prototype,"buffering",void 0);ze=bt([y("w3m-connecting-header")],ze);const tn=T`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var te=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const li={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},nn={lg:"paragraph-600",md:"small-600"},on={lg:"md",md:"md"};let q=class extends R{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;const e=this.textVariant??nn[this.size];return c`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const e=on[this.size],i=this.disabled?li.disabled:li[this.variant];return c`<wui-loading-spinner color=${i} size=${e}></wui-loading-spinner>`}return c``}};q.styles=[A,M,tn];te([u()],q.prototype,"size",void 0);te([u({type:Boolean})],q.prototype,"disabled",void 0);te([u({type:Boolean})],q.prototype,"fullWidth",void 0);te([u({type:Boolean})],q.prototype,"loading",void 0);te([u()],q.prototype,"variant",void 0);te([u({type:Boolean})],q.prototype,"hasIconLeft",void 0);te([u({type:Boolean})],q.prototype,"hasIconRight",void 0);te([u()],q.prototype,"borderRadius",void 0);te([u()],q.prototype,"textVariant",void 0);q=te([y("wui-button")],q);const rn=T`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var mt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ce=class extends R{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return c`
      <button ?disabled=${this.disabled} tabindex=${v(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};Ce.styles=[A,M,rn];mt([u()],Ce.prototype,"tabIdx",void 0);mt([u({type:Boolean})],Ce.prototype,"disabled",void 0);mt([u()],Ce.prototype,"color",void 0);Ce=mt([y("wui-link")],Ce);const an=T`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var xi=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let nt=class extends R{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,n=36-e,o=116+n,t=245+n,a=360+n*1.75;return c`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${o} ${t}"
          stroke-dashoffset=${a}
        />
      </svg>
    `}};nt.styles=[A,an];xi([u({type:Number})],nt.prototype,"radius",void 0);nt=xi([y("wui-loading-thumbnail")],nt);const sn=T`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;var ye=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let le=class extends R{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const e=this.size==="sm"?"small-600":"paragraph-600";return c`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?c`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};le.styles=[A,M,sn];ye([u()],le.prototype,"variant",void 0);ye([u()],le.prototype,"imageSrc",void 0);ye([u({type:Boolean})],le.prototype,"disabled",void 0);ye([u()],le.prototype,"icon",void 0);ye([u()],le.prototype,"size",void 0);ye([u()],le.prototype,"text",void 0);le=ye([y("wui-chip-button")],le);const ln=T`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var vt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let $e=class extends R{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return c`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};$e.styles=[A,M,ln];vt([u({type:Boolean})],$e.prototype,"disabled",void 0);vt([u()],$e.prototype,"label",void 0);vt([u()],$e.prototype,"buttonLabel",void 0);$e=vt([y("wui-cta-button")],$e);const cn=T`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var Ci=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ot=class extends R{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:i,play_store:n,chrome_store:o,homepage:t}=this.wallet,a=I.isMobile(),s=I.isIos(),l=I.isAndroid(),h=[i,n,t,o].filter(Boolean).length>1,p=ae.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return h&&!a?c`
        <wui-cta-button
          label=${`Don't have ${p}?`}
          buttonLabel="Get"
          @click=${()=>O.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!h&&t?c`
        <wui-cta-button
          label=${`Don't have ${p}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:i&&s?c`
        <wui-cta-button
          label=${`Don't have ${p}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:n&&l?c`
        <wui-cta-button
          label=${`Don't have ${p}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&I.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&I.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&I.openHref(this.wallet.homepage,"_blank")}};ot.styles=[cn];Ci([u({type:Object})],ot.prototype,"wallet",void 0);ot=Ci([y("w3m-mobile-download-links")],ot);const un=T`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var Q=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class z extends R{constructor(){var e,i,n,o,t;super(),this.wallet=(e=O.state.data)==null?void 0:e.wallet,this.connector=(i=O.state.data)==null?void 0:i.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=D.getWalletImage(this.wallet)??D.getConnectorImage(this.connector),this.name=((n=this.wallet)==null?void 0:n.name)??((o=this.connector)==null?void 0:o.name)??"Wallet",this.isRetrying=!1,this.uri=S.state.wcUri,this.error=S.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.buffering=!1,this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(S.subscribeKey("wcUri",a=>{var s;this.uri=a,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,(s=this.onConnect)==null||s.call(this))}),S.subscribeKey("wcError",a=>this.error=a),S.subscribeKey("buffering",a=>this.buffering=a)),(I.isTelegram()||I.isSafari())&&I.isIos()&&S.state.wcUri&&((t=this.onConnect)==null||t.call(this))}firstUpdated(){var e;(e=this.onAutoConnect)==null||e.call(this),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearTimeout(this.timeout)}render(){var n;(n=this.onRender)==null||n.call(this),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let i=`Continue in ${this.name}`;return this.buffering&&(i="Connecting..."),this.error&&(i="Connection declined"),c`
      <wui-flex
        data-error=${v(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${v(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${i}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?c`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||!this.error&&this.buffering||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?c`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){var e;if(this.error&&!this.showRetry){this.showRetry=!0;const i=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button");i==null||i.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){var e,i;this.buffering||(S.setWcError(!1),this.onRetry?(this.isRetrying=!0,(e=this.onRetry)==null||e.call(this)):(i=this.onConnect)==null||i.call(this))}loaderTemplate(){const e=At.state.themeVariables["--w3m-border-radius-master"],i=e?parseInt(e.replace("px",""),10):4;return c`<wui-loading-thumbnail radius=${i*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(I.copyToClopboard(this.uri),Je.showSuccess("Link copied"))}catch{Je.showError("Failed to copy")}}}z.styles=un;Q([x()],z.prototype,"isRetrying",void 0);Q([x()],z.prototype,"uri",void 0);Q([x()],z.prototype,"error",void 0);Q([x()],z.prototype,"ready",void 0);Q([x()],z.prototype,"showRetry",void 0);Q([x()],z.prototype,"secondaryBtnLabel",void 0);Q([x()],z.prototype,"secondaryLabel",void 0);Q([x()],z.prototype,"buffering",void 0);Q([x()],z.prototype,"isLoading",void 0);Q([u({type:Boolean})],z.prototype,"isMobile",void 0);Q([u()],z.prototype,"onRetry",void 0);var dn=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ci=class extends z{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),Y.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){var e;try{this.error=!1;const{connectors:i}=B.state,n=i.find(o=>{var t,a,s;return o.type==="ANNOUNCED"&&((t=o.info)==null?void 0:t.rdns)===((a=this.wallet)==null?void 0:a.rdns)||o.type==="INJECTED"||o.name===((s=this.wallet)==null?void 0:s.name)});if(n)await S.connectExternal(n,n.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");vi.close(),Y.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:((e=this.wallet)==null?void 0:e.name)||"Unknown"}})}catch(i){Y.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(i==null?void 0:i.message)??"Unknown"}}),this.error=!0}}};ci=dn([y("w3m-connecting-wc-browser")],ci);var hn=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ui=class extends z{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),Y.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){var e;!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:i,name:n}=this.wallet,{redirect:o,href:t}=I.formatNativeUrl(i,this.uri);S.setWcLinking({name:n,href:t}),S.setRecentWallet(this.wallet),I.openHref(o,"_blank")}catch{this.error=!0}}};ui=hn([y("w3m-connecting-wc-desktop")],ui);var pn=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let di=class extends z{constructor(){if(super(),this.btnLabelTimeout=void 0,this.labelTimeout=void 0,this.onRender=()=>{var e;!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))},this.onConnect=()=>{var e;if((e=this.wallet)!=null&&e.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:i,name:n}=this.wallet,{redirect:o,href:t}=I.formatNativeUrl(i,this.uri);S.setWcLinking({name:n,href:t}),S.setRecentWallet(this.wallet);const a=I.isIframe()?"_top":"_self";I.openHref(o,a),clearTimeout(this.labelTimeout),this.secondaryLabel=Te.CONNECT_LABELS.MOBILE}catch(i){Y.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:i instanceof Error?i.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel=void 0,this.secondaryLabel=Te.CONNECT_LABELS.MOBILE,document.addEventListener("visibilitychange",this.onBuffering.bind(this)),Y.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}}),this.btnLabelTimeout=setTimeout(()=>{this.secondaryBtnLabel="Try again",this.secondaryLabel=Te.CONNECT_LABELS.MOBILE},Te.FIVE_SEC_MS),this.labelTimeout=setTimeout(()=>{this.secondaryLabel="Hold tight... it's taking longer than expected"},Te.THREE_SEC_MS)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onBuffering.bind(this)),clearTimeout(this.btnLabelTimeout),clearTimeout(this.labelTimeout)}onBuffering(){const e=I.isIos();(document==null?void 0:document.visibilityState)==="visible"&&!this.error&&e&&(S.setBuffering(!0),setTimeout(()=>{S.setBuffering(!1)},5e3))}onTryAgain(){this.buffering||(S.setWcError(!1),this.onConnect())}};di=pn([y("w3m-connecting-wc-mobile")],di);var Ue={},fn=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},$i={},F={};let Qt;const gn=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];F.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};F.getSymbolTotalCodewords=function(e){return gn[e]};F.getBCHDigit=function(r){let e=0;for(;r!==0;)e++,r>>>=1;return e};F.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');Qt=e};F.isKanjiModeEnabled=function(){return typeof Qt<"u"};F.toSJIS=function(e){return Qt(e)};var yt={};(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+i)}}r.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},r.from=function(n,o){if(r.isValid(n))return n;try{return e(n)}catch{return o}}})(yt);function Ri(){this.buffer=[],this.length=0}Ri.prototype={get:function(r){const e=Math.floor(r/8);return(this.buffer[e]>>>7-r%8&1)===1},put:function(r,e){for(let i=0;i<e;i++)this.putBit((r>>>e-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(r){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),r&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var wn=Ri;function Ve(r){if(!r||r<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=r,this.data=new Uint8Array(r*r),this.reservedBit=new Uint8Array(r*r)}Ve.prototype.set=function(r,e,i,n){const o=r*this.size+e;this.data[o]=i,n&&(this.reservedBit[o]=!0)};Ve.prototype.get=function(r,e){return this.data[r*this.size+e]};Ve.prototype.xor=function(r,e,i){this.data[r*this.size+e]^=i};Ve.prototype.isReserved=function(r,e){return this.reservedBit[r*this.size+e]};var bn=Ve,Ii={};(function(r){const e=F.getSymbolSize;r.getRowColCoords=function(n){if(n===1)return[];const o=Math.floor(n/7)+2,t=e(n),a=t===145?26:Math.ceil((t-13)/(2*o-2))*2,s=[t-7];for(let l=1;l<o-1;l++)s[l]=s[l-1]-a;return s.push(6),s.reverse()},r.getPositions=function(n){const o=[],t=r.getRowColCoords(n),a=t.length;for(let s=0;s<a;s++)for(let l=0;l<a;l++)s===0&&l===0||s===0&&l===a-1||s===a-1&&l===0||o.push([t[s],t[l]]);return o}})(Ii);var Ei={};const mn=F.getSymbolSize,hi=7;Ei.getPositions=function(e){const i=mn(e);return[[0,0],[i-hi,0],[0,i-hi]]};var _i={};(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};r.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},r.from=function(o){return r.isValid(o)?parseInt(o,10):void 0},r.getPenaltyN1=function(o){const t=o.size;let a=0,s=0,l=0,h=null,p=null;for(let _=0;_<t;_++){s=l=0,h=p=null;for(let C=0;C<t;C++){let m=o.get(_,C);m===h?s++:(s>=5&&(a+=e.N1+(s-5)),h=m,s=1),m=o.get(C,_),m===p?l++:(l>=5&&(a+=e.N1+(l-5)),p=m,l=1)}s>=5&&(a+=e.N1+(s-5)),l>=5&&(a+=e.N1+(l-5))}return a},r.getPenaltyN2=function(o){const t=o.size;let a=0;for(let s=0;s<t-1;s++)for(let l=0;l<t-1;l++){const h=o.get(s,l)+o.get(s,l+1)+o.get(s+1,l)+o.get(s+1,l+1);(h===4||h===0)&&a++}return a*e.N2},r.getPenaltyN3=function(o){const t=o.size;let a=0,s=0,l=0;for(let h=0;h<t;h++){s=l=0;for(let p=0;p<t;p++)s=s<<1&2047|o.get(h,p),p>=10&&(s===1488||s===93)&&a++,l=l<<1&2047|o.get(p,h),p>=10&&(l===1488||l===93)&&a++}return a*e.N3},r.getPenaltyN4=function(o){let t=0;const a=o.data.length;for(let l=0;l<a;l++)t+=o.data[l];return Math.abs(Math.ceil(t*100/a/5)-10)*e.N4};function i(n,o,t){switch(n){case r.Patterns.PATTERN000:return(o+t)%2===0;case r.Patterns.PATTERN001:return o%2===0;case r.Patterns.PATTERN010:return t%3===0;case r.Patterns.PATTERN011:return(o+t)%3===0;case r.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(t/3))%2===0;case r.Patterns.PATTERN101:return o*t%2+o*t%3===0;case r.Patterns.PATTERN110:return(o*t%2+o*t%3)%2===0;case r.Patterns.PATTERN111:return(o*t%3+(o+t)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}r.applyMask=function(o,t){const a=t.size;for(let s=0;s<a;s++)for(let l=0;l<a;l++)t.isReserved(l,s)||t.xor(l,s,i(o,l,s))},r.getBestMask=function(o,t){const a=Object.keys(r.Patterns).length;let s=0,l=1/0;for(let h=0;h<a;h++){t(h),r.applyMask(h,o);const p=r.getPenaltyN1(o)+r.getPenaltyN2(o)+r.getPenaltyN3(o)+r.getPenaltyN4(o);r.applyMask(h,o),p<l&&(l=p,s=h)}return s}})(_i);var xt={};const de=yt,Ke=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Ge=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];xt.getBlocksCount=function(e,i){switch(i){case de.L:return Ke[(e-1)*4+0];case de.M:return Ke[(e-1)*4+1];case de.Q:return Ke[(e-1)*4+2];case de.H:return Ke[(e-1)*4+3];default:return}};xt.getTotalCodewordsCount=function(e,i){switch(i){case de.L:return Ge[(e-1)*4+0];case de.M:return Ge[(e-1)*4+1];case de.Q:return Ge[(e-1)*4+2];case de.H:return Ge[(e-1)*4+3];default:return}};var Wi={},Ct={};const Pe=new Uint8Array(512),rt=new Uint8Array(256);(function(){let e=1;for(let i=0;i<255;i++)Pe[i]=e,rt[e]=i,e<<=1,e&256&&(e^=285);for(let i=255;i<512;i++)Pe[i]=Pe[i-255]})();Ct.log=function(e){if(e<1)throw new Error("log("+e+")");return rt[e]};Ct.exp=function(e){return Pe[e]};Ct.mul=function(e,i){return e===0||i===0?0:Pe[rt[e]+rt[i]]};(function(r){const e=Ct;r.mul=function(n,o){const t=new Uint8Array(n.length+o.length-1);for(let a=0;a<n.length;a++)for(let s=0;s<o.length;s++)t[a+s]^=e.mul(n[a],o[s]);return t},r.mod=function(n,o){let t=new Uint8Array(n);for(;t.length-o.length>=0;){const a=t[0];for(let l=0;l<o.length;l++)t[l]^=e.mul(o[l],a);let s=0;for(;s<t.length&&t[s]===0;)s++;t=t.slice(s)}return t},r.generateECPolynomial=function(n){let o=new Uint8Array([1]);for(let t=0;t<n;t++)o=r.mul(o,new Uint8Array([1,e.exp(t)]));return o}})(Wi);const Si=Wi;function Xt(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}Xt.prototype.initialize=function(e){this.degree=e,this.genPoly=Si.generateECPolynomial(this.degree)};Xt.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(e.length+this.degree);i.set(e);const n=Si.mod(i,this.genPoly),o=this.degree-n.length;if(o>0){const t=new Uint8Array(this.degree);return t.set(n,o),t}return n};var vn=Xt,Ti={},pe={},Zt={};Zt.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var ie={};const Bi="[0-9]+",yn="[A-Z $%*+\\-./:]+";let ke="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";ke=ke.replace(/u/g,"\\u");const xn="(?:(?![A-Z0-9 $%*+\\-./:]|"+ke+`)(?:.|[\r
]))+`;ie.KANJI=new RegExp(ke,"g");ie.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");ie.BYTE=new RegExp(xn,"g");ie.NUMERIC=new RegExp(Bi,"g");ie.ALPHANUMERIC=new RegExp(yn,"g");const Cn=new RegExp("^"+ke+"$"),$n=new RegExp("^"+Bi+"$"),Rn=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");ie.testKanji=function(e){return Cn.test(e)};ie.testNumeric=function(e){return $n.test(e)};ie.testAlphanumeric=function(e){return Rn.test(e)};(function(r){const e=Zt,i=ie;r.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(t,a){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!e.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?t.ccBits[0]:a<27?t.ccBits[1]:t.ccBits[2]},r.getBestModeForData=function(t){return i.testNumeric(t)?r.NUMERIC:i.testAlphanumeric(t)?r.ALPHANUMERIC:i.testKanji(t)?r.KANJI:r.BYTE},r.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},r.isValid=function(t){return t&&t.bit&&t.ccBits};function n(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+o)}}r.from=function(t,a){if(r.isValid(t))return t;try{return n(t)}catch{return a}}})(pe);(function(r){const e=F,i=xt,n=yt,o=pe,t=Zt,a=7973,s=e.getBCHDigit(a);function l(C,m,E){for(let b=1;b<=40;b++)if(m<=r.getCapacity(b,E,C))return b}function h(C,m){return o.getCharCountIndicator(C,m)+4}function p(C,m){let E=0;return C.forEach(function(b){const $=h(b.mode,m);E+=$+b.getBitsLength()}),E}function _(C,m){for(let E=1;E<=40;E++)if(p(C,E)<=r.getCapacity(E,m,o.MIXED))return E}r.from=function(m,E){return t.isValid(m)?parseInt(m,10):E},r.getCapacity=function(m,E,b){if(!t.isValid(m))throw new Error("Invalid QR Code version");typeof b>"u"&&(b=o.BYTE);const $=e.getSymbolTotalCodewords(m),w=i.getTotalCodewordsCount(m,E),f=($-w)*8;if(b===o.MIXED)return f;const g=f-h(b,m);switch(b){case o.NUMERIC:return Math.floor(g/10*3);case o.ALPHANUMERIC:return Math.floor(g/11*2);case o.KANJI:return Math.floor(g/13);case o.BYTE:default:return Math.floor(g/8)}},r.getBestVersionForData=function(m,E){let b;const $=n.from(E,n.M);if(Array.isArray(m)){if(m.length>1)return _(m,$);if(m.length===0)return 1;b=m[0]}else b=m;return l(b.mode,b.getLength(),$)},r.getEncodedBits=function(m){if(!t.isValid(m)||m<7)throw new Error("Invalid QR Code version");let E=m<<12;for(;e.getBCHDigit(E)-s>=0;)E^=a<<e.getBCHDigit(E)-s;return m<<12|E}})(Ti);var Pi={};const jt=F,Li=1335,In=21522,pi=jt.getBCHDigit(Li);Pi.getEncodedBits=function(e,i){const n=e.bit<<3|i;let o=n<<10;for(;jt.getBCHDigit(o)-pi>=0;)o^=Li<<jt.getBCHDigit(o)-pi;return(n<<10|o)^In};var Oi={};const En=pe;function Re(r){this.mode=En.NUMERIC,this.data=r.toString()}Re.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};Re.prototype.getLength=function(){return this.data.length};Re.prototype.getBitsLength=function(){return Re.getBitsLength(this.data.length)};Re.prototype.write=function(e){let i,n,o;for(i=0;i+3<=this.data.length;i+=3)n=this.data.substr(i,3),o=parseInt(n,10),e.put(o,10);const t=this.data.length-i;t>0&&(n=this.data.substr(i),o=parseInt(n,10),e.put(o,t*3+1))};var _n=Re;const Wn=pe,Wt=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Ie(r){this.mode=Wn.ALPHANUMERIC,this.data=r}Ie.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};Ie.prototype.getLength=function(){return this.data.length};Ie.prototype.getBitsLength=function(){return Ie.getBitsLength(this.data.length)};Ie.prototype.write=function(e){let i;for(i=0;i+2<=this.data.length;i+=2){let n=Wt.indexOf(this.data[i])*45;n+=Wt.indexOf(this.data[i+1]),e.put(n,11)}this.data.length%2&&e.put(Wt.indexOf(this.data[i]),6)};var Sn=Ie,Tn=function(e){for(var i=[],n=e.length,o=0;o<n;o++){var t=e.charCodeAt(o);if(t>=55296&&t<=56319&&n>o+1){var a=e.charCodeAt(o+1);a>=56320&&a<=57343&&(t=(t-55296)*1024+a-56320+65536,o+=1)}if(t<128){i.push(t);continue}if(t<2048){i.push(t>>6|192),i.push(t&63|128);continue}if(t<55296||t>=57344&&t<65536){i.push(t>>12|224),i.push(t>>6&63|128),i.push(t&63|128);continue}if(t>=65536&&t<=1114111){i.push(t>>18|240),i.push(t>>12&63|128),i.push(t>>6&63|128),i.push(t&63|128);continue}i.push(239,191,189)}return new Uint8Array(i).buffer};const Bn=Tn,Pn=pe;function Ee(r){this.mode=Pn.BYTE,typeof r=="string"&&(r=Bn(r)),this.data=new Uint8Array(r)}Ee.getBitsLength=function(e){return e*8};Ee.prototype.getLength=function(){return this.data.length};Ee.prototype.getBitsLength=function(){return Ee.getBitsLength(this.data.length)};Ee.prototype.write=function(r){for(let e=0,i=this.data.length;e<i;e++)r.put(this.data[e],8)};var Ln=Ee;const On=pe,An=F;function _e(r){this.mode=On.KANJI,this.data=r}_e.getBitsLength=function(e){return e*13};_e.prototype.getLength=function(){return this.data.length};_e.prototype.getBitsLength=function(){return _e.getBitsLength(this.data.length)};_e.prototype.write=function(r){let e;for(e=0;e<this.data.length;e++){let i=An.toSJIS(this.data[e]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),r.put(i,13)}};var jn=_e;(function(r){const e=pe,i=_n,n=Sn,o=Ln,t=jn,a=ie,s=F,l=qi;function h(w){return unescape(encodeURIComponent(w)).length}function p(w,f,g){const d=[];let W;for(;(W=w.exec(g))!==null;)d.push({data:W[0],index:W.index,mode:f,length:W[0].length});return d}function _(w){const f=p(a.NUMERIC,e.NUMERIC,w),g=p(a.ALPHANUMERIC,e.ALPHANUMERIC,w);let d,W;return s.isKanjiModeEnabled()?(d=p(a.BYTE,e.BYTE,w),W=p(a.KANJI,e.KANJI,w)):(d=p(a.BYTE_KANJI,e.BYTE,w),W=[]),f.concat(g,d,W).sort(function(j,G){return j.index-G.index}).map(function(j){return{data:j.data,mode:j.mode,length:j.length}})}function C(w,f){switch(f){case e.NUMERIC:return i.getBitsLength(w);case e.ALPHANUMERIC:return n.getBitsLength(w);case e.KANJI:return t.getBitsLength(w);case e.BYTE:return o.getBitsLength(w)}}function m(w){return w.reduce(function(f,g){const d=f.length-1>=0?f[f.length-1]:null;return d&&d.mode===g.mode?(f[f.length-1].data+=g.data,f):(f.push(g),f)},[])}function E(w){const f=[];for(let g=0;g<w.length;g++){const d=w[g];switch(d.mode){case e.NUMERIC:f.push([d,{data:d.data,mode:e.ALPHANUMERIC,length:d.length},{data:d.data,mode:e.BYTE,length:d.length}]);break;case e.ALPHANUMERIC:f.push([d,{data:d.data,mode:e.BYTE,length:d.length}]);break;case e.KANJI:f.push([d,{data:d.data,mode:e.BYTE,length:h(d.data)}]);break;case e.BYTE:f.push([{data:d.data,mode:e.BYTE,length:h(d.data)}])}}return f}function b(w,f){const g={},d={start:{}};let W=["start"];for(let L=0;L<w.length;L++){const j=w[L],G=[];for(let ue=0;ue<j.length;ue++){const Z=j[ue],Se=""+L+ue;G.push(Se),g[Se]={node:Z,lastCount:0},d[Se]={};for(let Et=0;Et<W.length;Et++){const oe=W[Et];g[oe]&&g[oe].node.mode===Z.mode?(d[oe][Se]=C(g[oe].lastCount+Z.length,Z.mode)-C(g[oe].lastCount,Z.mode),g[oe].lastCount+=Z.length):(g[oe]&&(g[oe].lastCount=Z.length),d[oe][Se]=C(Z.length,Z.mode)+4+e.getCharCountIndicator(Z.mode,f))}}W=G}for(let L=0;L<W.length;L++)d[W[L]].end=0;return{map:d,table:g}}function $(w,f){let g;const d=e.getBestModeForData(w);if(g=e.from(f,d),g!==e.BYTE&&g.bit<d.bit)throw new Error('"'+w+'" cannot be encoded with mode '+e.toString(g)+`.
 Suggested mode is: `+e.toString(d));switch(g===e.KANJI&&!s.isKanjiModeEnabled()&&(g=e.BYTE),g){case e.NUMERIC:return new i(w);case e.ALPHANUMERIC:return new n(w);case e.KANJI:return new t(w);case e.BYTE:return new o(w)}}r.fromArray=function(f){return f.reduce(function(g,d){return typeof d=="string"?g.push($(d,null)):d.data&&g.push($(d.data,d.mode)),g},[])},r.fromString=function(f,g){const d=_(f,s.isKanjiModeEnabled()),W=E(d),L=b(W,g),j=l.find_path(L.map,"start","end"),G=[];for(let ue=1;ue<j.length-1;ue++)G.push(L.table[j[ue]].node);return r.fromArray(m(G))},r.rawSplit=function(f){return r.fromArray(_(f,s.isKanjiModeEnabled()))}})(Oi);const $t=F,St=yt,zn=wn,kn=bn,Dn=Ii,Nn=Ei,zt=_i,kt=xt,Mn=vn,at=Ti,Un=Pi,Vn=pe,Tt=Oi;function Fn(r,e){const i=r.size,n=Nn.getPositions(e);for(let o=0;o<n.length;o++){const t=n[o][0],a=n[o][1];for(let s=-1;s<=7;s++)if(!(t+s<=-1||i<=t+s))for(let l=-1;l<=7;l++)a+l<=-1||i<=a+l||(s>=0&&s<=6&&(l===0||l===6)||l>=0&&l<=6&&(s===0||s===6)||s>=2&&s<=4&&l>=2&&l<=4?r.set(t+s,a+l,!0,!0):r.set(t+s,a+l,!1,!0))}}function qn(r){const e=r.size;for(let i=8;i<e-8;i++){const n=i%2===0;r.set(i,6,n,!0),r.set(6,i,n,!0)}}function Hn(r,e){const i=Dn.getPositions(e);for(let n=0;n<i.length;n++){const o=i[n][0],t=i[n][1];for(let a=-2;a<=2;a++)for(let s=-2;s<=2;s++)a===-2||a===2||s===-2||s===2||a===0&&s===0?r.set(o+a,t+s,!0,!0):r.set(o+a,t+s,!1,!0)}}function Kn(r,e){const i=r.size,n=at.getEncodedBits(e);let o,t,a;for(let s=0;s<18;s++)o=Math.floor(s/3),t=s%3+i-8-3,a=(n>>s&1)===1,r.set(o,t,a,!0),r.set(t,o,a,!0)}function Bt(r,e,i){const n=r.size,o=Un.getEncodedBits(e,i);let t,a;for(t=0;t<15;t++)a=(o>>t&1)===1,t<6?r.set(t,8,a,!0):t<8?r.set(t+1,8,a,!0):r.set(n-15+t,8,a,!0),t<8?r.set(8,n-t-1,a,!0):t<9?r.set(8,15-t-1+1,a,!0):r.set(8,15-t-1,a,!0);r.set(n-8,8,1,!0)}function Gn(r,e){const i=r.size;let n=-1,o=i-1,t=7,a=0;for(let s=i-1;s>0;s-=2)for(s===6&&s--;;){for(let l=0;l<2;l++)if(!r.isReserved(o,s-l)){let h=!1;a<e.length&&(h=(e[a]>>>t&1)===1),r.set(o,s-l,h),t--,t===-1&&(a++,t=7)}if(o+=n,o<0||i<=o){o-=n,n=-n;break}}}function Yn(r,e,i){const n=new zn;i.forEach(function(l){n.put(l.mode.bit,4),n.put(l.getLength(),Vn.getCharCountIndicator(l.mode,r)),l.write(n)});const o=$t.getSymbolTotalCodewords(r),t=kt.getTotalCodewordsCount(r,e),a=(o-t)*8;for(n.getLengthInBits()+4<=a&&n.put(0,4);n.getLengthInBits()%8!==0;)n.putBit(0);const s=(a-n.getLengthInBits())/8;for(let l=0;l<s;l++)n.put(l%2?17:236,8);return Jn(n,r,e)}function Jn(r,e,i){const n=$t.getSymbolTotalCodewords(e),o=kt.getTotalCodewordsCount(e,i),t=n-o,a=kt.getBlocksCount(e,i),s=n%a,l=a-s,h=Math.floor(n/a),p=Math.floor(t/a),_=p+1,C=h-p,m=new Mn(C);let E=0;const b=new Array(a),$=new Array(a);let w=0;const f=new Uint8Array(r.buffer);for(let j=0;j<a;j++){const G=j<l?p:_;b[j]=f.slice(E,E+G),$[j]=m.encode(b[j]),E+=G,w=Math.max(w,G)}const g=new Uint8Array(n);let d=0,W,L;for(W=0;W<w;W++)for(L=0;L<a;L++)W<b[L].length&&(g[d++]=b[L][W]);for(W=0;W<C;W++)for(L=0;L<a;L++)g[d++]=$[L][W];return g}function Qn(r,e,i,n){let o;if(Array.isArray(r))o=Tt.fromArray(r);else if(typeof r=="string"){let h=e;if(!h){const p=Tt.rawSplit(r);h=at.getBestVersionForData(p,i)}o=Tt.fromString(r,h||40)}else throw new Error("Invalid data");const t=at.getBestVersionForData(o,i);if(!t)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=t;else if(e<t)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+t+`.
`);const a=Yn(e,i,o),s=$t.getSymbolSize(e),l=new kn(s);return Fn(l,e),qn(l),Hn(l,e),Bt(l,i,0),e>=7&&Kn(l,e),Gn(l,a),isNaN(n)&&(n=zt.getBestMask(l,Bt.bind(null,l,i))),zt.applyMask(n,l),Bt(l,i,n),{modules:l,version:e,errorCorrectionLevel:i,maskPattern:n,segments:o}}$i.create=function(e,i){if(typeof e>"u"||e==="")throw new Error("No input text");let n=St.M,o,t;return typeof i<"u"&&(n=St.from(i.errorCorrectionLevel,St.M),o=at.from(i.version),t=zt.from(i.maskPattern),i.toSJISFunc&&$t.setToSJISFunction(i.toSJISFunc)),Qn(e,o,n,t)};var Ai={},ei={};(function(r){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let n=i.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+i);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(t){return[t,t]}))),n.length===6&&n.push("F","F");const o=parseInt(n.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+n.slice(0,6).join("")}}r.getOptions=function(n){n||(n={}),n.color||(n.color={});const o=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,t=n.width&&n.width>=21?n.width:void 0,a=n.scale||4;return{width:t,scale:t?4:a,margin:o,color:{dark:e(n.color.dark||"#000000ff"),light:e(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},r.getScale=function(n,o){return o.width&&o.width>=n+o.margin*2?o.width/(n+o.margin*2):o.scale},r.getImageWidth=function(n,o){const t=r.getScale(n,o);return Math.floor((n+o.margin*2)*t)},r.qrToImageData=function(n,o,t){const a=o.modules.size,s=o.modules.data,l=r.getScale(a,t),h=Math.floor((a+t.margin*2)*l),p=t.margin*l,_=[t.color.light,t.color.dark];for(let C=0;C<h;C++)for(let m=0;m<h;m++){let E=(C*h+m)*4,b=t.color.light;if(C>=p&&m>=p&&C<h-p&&m<h-p){const $=Math.floor((C-p)/l),w=Math.floor((m-p)/l);b=_[s[$*a+w]?1:0]}n[E++]=b.r,n[E++]=b.g,n[E++]=b.b,n[E]=b.a}}})(ei);(function(r){const e=ei;function i(o,t,a){o.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=a,t.width=a,t.style.height=a+"px",t.style.width=a+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(t,a,s){let l=s,h=a;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),a||(h=n()),l=e.getOptions(l);const p=e.getImageWidth(t.modules.size,l),_=h.getContext("2d"),C=_.createImageData(p,p);return e.qrToImageData(C.data,t,l),i(_,h,p),_.putImageData(C,0,0),h},r.renderToDataURL=function(t,a,s){let l=s;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),l||(l={});const h=r.render(t,a,l),p=l.type||"image/png",_=l.rendererOpts||{};return h.toDataURL(p,_.quality)}})(Ai);var ji={};const Xn=ei;function fi(r,e){const i=r.a/255,n=e+'="'+r.hex+'"';return i<1?n+" "+e+'-opacity="'+i.toFixed(2).slice(1)+'"':n}function Pt(r,e,i){let n=r+e;return typeof i<"u"&&(n+=" "+i),n}function Zn(r,e,i){let n="",o=0,t=!1,a=0;for(let s=0;s<r.length;s++){const l=Math.floor(s%e),h=Math.floor(s/e);!l&&!t&&(t=!0),r[s]?(a++,s>0&&l>0&&r[s-1]||(n+=t?Pt("M",l+i,.5+h+i):Pt("m",o,0),o=0,t=!1),l+1<e&&r[s+1]||(n+=Pt("h",a),a=0)):o++}return n}ji.render=function(e,i,n){const o=Xn.getOptions(i),t=e.modules.size,a=e.modules.data,s=t+o.margin*2,l=o.color.light.a?"<path "+fi(o.color.light,"fill")+' d="M0 0h'+s+"v"+s+'H0z"/>':"",h="<path "+fi(o.color.dark,"stroke")+' d="'+Zn(a,t,o.margin)+'"/>',p='viewBox="0 0 '+s+" "+s+'"',C='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+p+' shape-rendering="crispEdges">'+l+h+`</svg>
`;return typeof n=="function"&&n(null,C),C};const eo=fn,Dt=$i,zi=Ai,to=ji;function ti(r,e,i,n,o){const t=[].slice.call(arguments,1),a=t.length,s=typeof t[a-1]=="function";if(!s&&!eo())throw new Error("Callback required as last argument");if(s){if(a<2)throw new Error("Too few arguments provided");a===2?(o=i,i=e,e=n=void 0):a===3&&(e.getContext&&typeof o>"u"?(o=n,n=void 0):(o=n,n=i,i=e,e=void 0))}else{if(a<1)throw new Error("Too few arguments provided");return a===1?(i=e,e=n=void 0):a===2&&!e.getContext&&(n=i,i=e,e=void 0),new Promise(function(l,h){try{const p=Dt.create(i,n);l(r(p,e,n))}catch(p){h(p)}})}try{const l=Dt.create(i,n);o(null,r(l,e,n))}catch(l){o(l)}}Ue.create=Dt.create;Ue.toCanvas=ti.bind(null,zi.render);Ue.toDataURL=ti.bind(null,zi.renderToDataURL);Ue.toString=ti.bind(null,function(r,e,i){return to.render(r,i)});const io=.1,gi=2.5,re=7;function Lt(r,e,i){return r===e?!1:(r-e<0?e-r:r-e)<=i+io}function no(r,e){const i=Array.prototype.slice.call(Ue.create(r,{errorCorrectionLevel:e}).modules.data,0),n=Math.sqrt(i.length);return i.reduce((o,t,a)=>(a%n===0?o.push([t]):o[o.length-1].push(t))&&o,[])}const oo={generate({uri:r,size:e,logoSize:i,dotColor:n="#141414"}){const o="transparent",a=[],s=no(r,"Q"),l=e/s.length,h=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];h.forEach(({x:b,y:$})=>{const w=(s.length-re)*l*b,f=(s.length-re)*l*$,g=.45;for(let d=0;d<h.length;d+=1){const W=l*(re-d*2);a.push(Be`
            <rect
              fill=${d===2?n:o}
              width=${d===0?W-5:W}
              rx= ${d===0?(W-5)*g:W*g}
              ry= ${d===0?(W-5)*g:W*g}
              stroke=${n}
              stroke-width=${d===0?5:0}
              height=${d===0?W-5:W}
              x= ${d===0?f+l*d+5/2:f+l*d}
              y= ${d===0?w+l*d+5/2:w+l*d}
            />
          `)}});const p=Math.floor((i+25)/l),_=s.length/2-p/2,C=s.length/2+p/2-1,m=[];s.forEach((b,$)=>{b.forEach((w,f)=>{if(s[$][f]&&!($<re&&f<re||$>s.length-(re+1)&&f<re||$<re&&f>s.length-(re+1))&&!($>_&&$<C&&f>_&&f<C)){const g=$*l+l/2,d=f*l+l/2;m.push([g,d])}})});const E={};return m.forEach(([b,$])=>{var w;E[b]?(w=E[b])==null||w.push($):E[b]=[$]}),Object.entries(E).map(([b,$])=>{const w=$.filter(f=>$.every(g=>!Lt(f,g,l)));return[Number(b),w]}).forEach(([b,$])=>{$.forEach(w=>{a.push(Be`<circle cx=${b} cy=${w} fill=${n} r=${l/gi} />`)})}),Object.entries(E).filter(([b,$])=>$.length>1).map(([b,$])=>{const w=$.filter(f=>$.some(g=>Lt(f,g,l)));return[Number(b),w]}).map(([b,$])=>{$.sort((f,g)=>f<g?-1:1);const w=[];for(const f of $){const g=w.find(d=>d.some(W=>Lt(f,W,l)));g?g.push(f):w.push([f])}return[b,w.map(f=>[f[0],f[f.length-1]])]}).forEach(([b,$])=>{$.forEach(([w,f])=>{a.push(Be`
              <line
                x1=${b}
                x2=${b}
                y1=${w}
                y2=${f}
                stroke=${n}
                stroke-width=${l/(gi/2)}
                stroke-linecap="round"
              />
            `)})}),a}},ro=T`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var ce=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const ao="#3396ff";let J=class extends R{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??ao}
    `,c`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const e=this.theme==="light"?this.size:this.size-32;return Be`
      <svg height=${e} width=${e}>
        ${oo.generate({uri:this.uri,size:e,logoSize:this.arenaClear?0:e/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?c`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?c`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:c`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};J.styles=[A,ro];ce([u()],J.prototype,"uri",void 0);ce([u({type:Number})],J.prototype,"size",void 0);ce([u()],J.prototype,"theme",void 0);ce([u()],J.prototype,"imageSrc",void 0);ce([u()],J.prototype,"alt",void 0);ce([u()],J.prototype,"color",void 0);ce([u({type:Boolean})],J.prototype,"arenaClear",void 0);ce([u({type:Boolean})],J.prototype,"farcaster",void 0);J=ce([y("wui-qr-code")],J);const so=T`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var Fe=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let we=class extends R{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: ${`clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px)`};
    `,c`<slot></slot>`}};we.styles=[so];Fe([u()],we.prototype,"width",void 0);Fe([u()],we.prototype,"height",void 0);Fe([u()],we.prototype,"borderRadius",void 0);Fe([u()],we.prototype,"variant",void 0);we=Fe([y("wui-shimmer")],we);const lo=T`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }
`;var co=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Nt=class extends R{render(){return c`
      <wui-flex
        justifyContent="center"
        alignItems="center"
        gap="xs"
        .padding=${["0","0","l","0"]}
      >
        <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
        <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
      </wui-flex>
    `}};Nt.styles=[A,M,lo];Nt=co([y("wui-ux-by-reown")],Nt);const uo=T`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var ho=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Mt=class extends z{constructor(){var e;super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),Y.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:((e=this.wallet)==null?void 0:e.name)??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.unsubscribe)==null||e.forEach(i=>i()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,i=this.wallet?this.wallet.name:void 0;return S.setWcLinking(void 0),S.setRecentWallet(this.wallet),c` <wui-qr-code
      size=${e}
      theme=${At.state.themeMode}
      uri=${this.uri}
      imageSrc=${v(D.getWalletImage(this.wallet))}
      color=${v(At.state.themeVariables["--w3m-qr-color"])}
      alt=${v(i)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return c`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};Mt.styles=uo;Mt=ho([y("w3m-connecting-wc-qrcode")],Mt);var po=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let wi=class extends R{constructor(){var e;if(super(),this.wallet=(e=O.state.data)==null?void 0:e.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");Y.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${v(D.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};wi=po([y("w3m-connecting-wc-unsupported")],wi);var ki=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ut=class extends z{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel="Open and continue in a new browser tab",this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(S.subscribeKey("wcUri",()=>{this.updateLoadingState()})),Y.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:i,name:n}=this.wallet,{redirect:o,href:t}=I.formatUniversalUrl(i,this.uri);S.setWcLinking({name:n,href:t}),S.setRecentWallet(this.wallet),I.openHref(o,"_blank")}catch{this.error=!0}}};ki([x()],Ut.prototype,"isLoading",void 0);Ut=ki([y("w3m-connecting-wc-web")],Ut);var Rt=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let De=class extends R{constructor(){var e;super(),this.wallet=(e=O.state.data)==null?void 0:e.wallet,this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!fe.state.siwx,this.determinePlatforms(),this.initializeConnection()}render(){return c`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      <wui-ux-by-reown></wui-ux-by-reown>
    `}async initializeConnection(e=!1){if(!(this.platform==="browser"||fe.state.manualWCControl&&!e))try{const{wcPairingExpiry:i,status:n}=S.state;(e||I.isPairingExpired(i)||n==="connecting")&&(await S.connectWalletConnect(),this.isSiwxEnabled||vi.close())}catch(i){Y.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(i==null?void 0:i.message)??"Unknown"}}),S.setWcError(!0),Je.showError(i.message??"Connection error"),S.resetWcConnection(),O.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:e,desktop_link:i,webapp_link:n,injected:o,rdns:t}=this.wallet,a=o==null?void 0:o.map(({injected_id:E})=>E).filter(Boolean),s=[...t?[t]:a??[]],l=fe.state.isUniversalProvider?!1:s.length,h=e,p=n,_=S.checkInstalled(s),C=l&&_,m=i&&!I.isMobile();C&&!ai.state.noAdapters&&this.platforms.push("browser"),h&&this.platforms.push(I.isMobile()?"mobile":"qrcode"),p&&this.platforms.push("web"),m&&this.platforms.push("desktop"),!C&&l&&!ai.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return c`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return c`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return c`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return c`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return c`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return c`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?c`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){var n;const i=(n=this.shadowRoot)==null?void 0:n.querySelector("div");i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};Rt([x()],De.prototype,"platform",void 0);Rt([x()],De.prototype,"platforms",void 0);Rt([x()],De.prototype,"isSiwxEnabled",void 0);De=Rt([y("w3m-connecting-wc-view")],De);var Di=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Vt=class extends R{constructor(){super(...arguments),this.isMobile=I.isMobile()}render(){if(this.isMobile){const{featured:e,recommended:i}=P.state,{customWallets:n}=fe.state,o=ht.getRecentWallets(),t=e.length||i.length||(n==null?void 0:n.length)||o.length;return c`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${t?c`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return c`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};Di([x()],Vt.prototype,"isMobile",void 0);Vt=Di([y("w3m-connecting-wc-basic-view")],Vt);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ii=()=>new fo;class fo{}const Ot=new WeakMap,ni=Ki(class extends Gi{render(r){return si}update(r,[e]){var n;const i=e!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=(n=r.options)==null?void 0:n.host,this.rt(this.ct=r.element)),si}rt(r){if(this.isConnected||(r=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let i=Ot.get(e);i===void 0&&(i=new WeakMap,Ot.set(e,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,r),r!==void 0&&this.G.call(this.ht,r)}else this.G.value=r}get lt(){var r,e;return typeof this.G=="function"?(r=Ot.get(this.ht??globalThis))==null?void 0:r.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),go=T`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var Ni=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let st=class extends R{constructor(){super(...arguments),this.inputElementRef=ii(),this.checked=void 0}render(){return c`
      <label>
        <input
          ${ni(this.inputElementRef)}
          type="checkbox"
          ?checked=${v(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){var e;this.dispatchEvent(new CustomEvent("switchChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.checked,bubbles:!0,composed:!0}))}};st.styles=[A,M,Hi,go];Ni([u({type:Boolean})],st.prototype,"checked",void 0);st=Ni([y("wui-switch")],st);const wo=T`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var Mi=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let lt=class extends R{constructor(){super(...arguments),this.checked=void 0}render(){return c`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${v(this.checked)}></wui-switch>
      </button>
    `}};lt.styles=[A,M,wo];Mi([u({type:Boolean})],lt.prototype,"checked",void 0);lt=Mi([y("wui-certified-switch")],lt);const bo=T`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var Ui=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ct=class extends R{constructor(){super(...arguments),this.icon="copy"}render(){return c`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};ct.styles=[A,M,bo];Ui([u()],ct.prototype,"icon",void 0);ct=Ui([y("wui-input-element")],ct);const mo=T`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var ne=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let H=class extends R{constructor(){super(...arguments),this.inputElementRef=ii(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){const e=`wui-padding-right-${this.inputRightPadding}`,n={[`wui-size-${this.size}`]:!0,[e]:!!this.inputRightPadding};return c`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${ni(this.inputElementRef)}
        class=${Yi(n)}
        type=${this.type}
        enterkeyhint=${v(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${v(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?c`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){var e;this.dispatchEvent(new CustomEvent("inputChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.value,bubbles:!0,composed:!0}))}};H.styles=[A,M,mo];ne([u()],H.prototype,"size",void 0);ne([u()],H.prototype,"icon",void 0);ne([u({type:Boolean})],H.prototype,"disabled",void 0);ne([u()],H.prototype,"placeholder",void 0);ne([u()],H.prototype,"type",void 0);ne([u()],H.prototype,"keyHint",void 0);ne([u()],H.prototype,"value",void 0);ne([u()],H.prototype,"inputRightPadding",void 0);ne([u()],H.prototype,"tabIdx",void 0);H=ne([y("wui-input-text")],H);const vo=T`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var yo=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ft=class extends R{constructor(){super(...arguments),this.inputComponentRef=ii()}render(){return c`
      <wui-input-text
        ${ni(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const e=this.inputComponentRef.value,i=e==null?void 0:e.inputElementRef.value;i&&(i.value="",i.focus(),i.dispatchEvent(new Event("input")))}};Ft.styles=[A,vo];Ft=yo([y("wui-search-bar")],Ft);const xo=Be`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,Co=T`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var Vi=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ut=class extends R{constructor(){super(...arguments),this.type="wallet"}render(){return c`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?c` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${xo}`:c`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};ut.styles=[A,M,Co];Vi([u()],ut.prototype,"type",void 0);ut=Vi([y("wui-card-select-loader")],ut);const $o=T`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var K=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let N=class extends R{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&ae.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&ae.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&ae.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&ae.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&ae.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&ae.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&ae.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&ae.getSpacingStyles(this.margin,3)};
    `,c`<slot></slot>`}};N.styles=[A,$o];K([u()],N.prototype,"gridTemplateRows",void 0);K([u()],N.prototype,"gridTemplateColumns",void 0);K([u()],N.prototype,"justifyItems",void 0);K([u()],N.prototype,"alignItems",void 0);K([u()],N.prototype,"justifyContent",void 0);K([u()],N.prototype,"alignContent",void 0);K([u()],N.prototype,"columnGap",void 0);K([u()],N.prototype,"rowGap",void 0);K([u()],N.prototype,"gap",void 0);K([u()],N.prototype,"padding",void 0);K([u()],N.prototype,"margin",void 0);N=K([y("wui-grid")],N);const Ro=T`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var qe=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let be=class extends R{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){var i,n;const e=((i=this.wallet)==null?void 0:i.badge_type)==="certified";return c`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${v(e?"certified":void 0)}
            >${(n=this.wallet)==null?void 0:n.name}</wui-text
          >
          ${e?c`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){var e,i;return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():c`
      <wui-wallet-image
        size="md"
        imageSrc=${v(this.imageSrc)}
        name=${(e=this.wallet)==null?void 0:e.name}
        .installed=${(i=this.wallet)==null?void 0:i.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return c`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=D.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await D.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};be.styles=Ro;qe([x()],be.prototype,"visible",void 0);qe([x()],be.prototype,"imageSrc",void 0);qe([x()],be.prototype,"imageLoading",void 0);qe([u()],be.prototype,"wallet",void 0);be=qe([y("w3m-all-wallets-list-item")],be);const Io=T`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var He=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const bi="local-paginator";let me=class extends R{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!P.state.wallets.length,this.wallets=P.state.wallets,this.recommended=P.state.recommended,this.featured=P.state.featured,this.unsubscribe.push(P.subscribeKey("wallets",e=>this.wallets=e),P.subscribeKey("recommended",e=>this.recommended=e),P.subscribeKey("featured",e=>this.featured=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){var e;this.unsubscribe.forEach(i=>i()),(e=this.paginationObserver)==null||e.disconnect()}render(){return c`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){var i;this.loading=!0;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("wui-grid");e&&(await P.fetchWallets({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,i){return[...Array(e)].map(()=>c`
        <wui-card-select-loader type="wallet" id=${v(i)}></wui-card-select-loader>
      `)}walletsTemplate(){const e=I.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return qt.markWalletsAsInstalled(e).map(n=>c`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(n)}
          .wallet=${n}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:i,featured:n,count:o}=P.state,t=window.innerWidth<352?3:4,a=e.length+i.length;let l=Math.ceil(a/t)*t-a+t;return l-=e.length?n.length%t:0,o===0&&n.length>0?null:o===0||[...n,...e,...i].length<o?this.shimmerTemplate(l,bi):null}createPaginationObserver(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector(`#${bi}`);e&&(this.paginationObserver=new IntersectionObserver(([n])=>{if(n!=null&&n.isIntersecting&&!this.loading){const{page:o,count:t,wallets:a}=P.state;a.length<t&&P.fetchWallets({page:o+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){B.selectWalletConnector(e)}};me.styles=Io;He([x()],me.prototype,"loading",void 0);He([x()],me.prototype,"wallets",void 0);He([x()],me.prototype,"recommended",void 0);He([x()],me.prototype,"featured",void 0);me=He([y("w3m-all-wallets-list")],me);const Eo=T`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var It=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let We=class extends R{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?c`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await P.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=P.state,i=qt.markWalletsAsInstalled(e);return e.length?c`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${i.map(n=>c`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(n)}
              .wallet=${n}
              data-testid="wallet-search-item-${n.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:c`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){B.selectWalletConnector(e)}};We.styles=Eo;It([x()],We.prototype,"loading",void 0);It([u()],We.prototype,"query",void 0);It([u()],We.prototype,"badge",void 0);We=It([y("w3m-all-wallets-search")],We);var oi=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let dt=class extends R{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=I.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return c`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?c`<w3m-all-wallets-search
            query=${this.search}
            badge=${v(this.badge)}
          ></w3m-all-wallets-search>`:c`<w3m-all-wallets-list badge=${v(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if(this.badge==="certified"){this.badge=void 0;return}this.badge="certified",Je.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return I.isMobile()?c`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){O.push("ConnectingWalletConnect")}};oi([x()],dt.prototype,"search",void 0);oi([x()],dt.prototype,"badge",void 0);dt=oi([y("w3m-all-wallets-view")],dt);const _o=T`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var X=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let V=class extends R{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return c`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${v(this.iconVariant)}
        tabindex=${v(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if(this.variant==="image"&&this.imageSrc)return c`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if(this.iconVariant==="square"&&this.icon&&this.variant==="icon")return c`<wui-icon name=${this.icon}></wui-icon>`;if(this.variant==="icon"&&this.icon&&this.iconVariant){const e=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",i=this.iconVariant==="square-blue"?"mdl":"md",n=this.iconSize?this.iconSize:i;return c`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${n}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${i}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?c`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:c``}chevronTemplate(){return this.chevron?c`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};V.styles=[A,M,_o];X([u()],V.prototype,"icon",void 0);X([u()],V.prototype,"iconSize",void 0);X([u()],V.prototype,"tabIdx",void 0);X([u()],V.prototype,"variant",void 0);X([u()],V.prototype,"iconVariant",void 0);X([u({type:Boolean})],V.prototype,"disabled",void 0);X([u()],V.prototype,"imageSrc",void 0);X([u()],V.prototype,"alt",void 0);X([u({type:Boolean})],V.prototype,"chevron",void 0);X([u({type:Boolean})],V.prototype,"loading",void 0);V=X([y("wui-list-item")],V);var Wo=function(r,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,n);else for(var s=r.length-1;s>=0;s--)(a=r[s])&&(t=(o<3?a(t):o>3?a(e,i,t):a(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let mi=class extends R{constructor(){var e;super(...arguments),this.wallet=(e=O.state.data)==null?void 0:e.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return c`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){var e;return(e=this.wallet)!=null&&e.chrome_store?c`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){var e;return(e=this.wallet)!=null&&e.app_store?c`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){var e;return(e=this.wallet)!=null&&e.play_store?c`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){var e;return(e=this.wallet)!=null&&e.homepage?c`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){var e;(e=this.wallet)!=null&&e.chrome_store&&I.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&I.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&I.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&I.openHref(this.wallet.homepage,"_blank")}};mi=Wo([y("w3m-downloads-view")],mi);export{dt as W3mAllWalletsView,Vt as W3mConnectingWcBasicView,mi as W3mDownloadsView};
