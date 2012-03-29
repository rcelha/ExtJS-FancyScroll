Ext.define('FancyScroll', {
    config:{
        /**
         * The scrollbar position, possible 'right' or 'left'
         */
        position: 'right',
        color: '#C0C0C0',
        targetDom: null
    },

    createDom: function(){
        var
            td = this.targetDom,
            t = this.target = Ext.get(td),
            height = t.getHeight(),
            scrollWrapper = null,
            scrollArea = null,
            scrollBar = null;

        t.setStyle('overflow', 'hidden');
        t.setStyle('display', 'block');
        t.setStyle('position', 'relative');
        t.setStyle('z-index', '1');
        t.addCls('fancy-scroll-bar-target');
        t.addClsOnOver('fancy-scroll-bar-over')

        scrollWrapper = this.scrollWrapper = Ext.DomHelper.createDom({
            tag: 'div',
            style: {
                display: 'block',
                height: 'auto',
                position: 'absolute'
            }
        });

        var len = td.children.length;
        for(var i = 0; i < len; i++){
            scrollWrapper.appendChild(td.removeChild(td.children[0]));
        }

        var style = {
            position: 'absolute',
            'top': '0px',
            display: 'block',
            width: '10px',
            height: height + 'px',
            visibility: 'hidden',
            'z-index': 9999
        }
        style[this.position] = '0px';
        scrollArea = this.scrollArea = Ext.DomHelper.createDom({
            tag: 'div',
            'class': 'fancy-scroll-bar-area',
            style: style
        }, t);

        scrollBar = this.scrollBar = Ext.DomHelper.createDom({
            tag: 'div',
            'class': 'fancy-scroll-bar-bar',
            style: {
                position: 'absolute',
                'top': '0px',
                right: 'auto',
                display: 'block',
                width: '10px',
                height: '10px',
                background: this.color
            }
        }, scrollArea);

        /**
         * When a image loading causes the div resize!
         */
        var me = this;
        Ext.each(Ext.get(scrollWrapper).query('img'), function(v){v.onload = function(){me.resizeScrollBar()} })
        t.appendChild(scrollWrapper);

        t.on('mousewheel', this.doScroll, this);

        this.resizeScrollBar();
    },
      
    doScroll: function(evt){
        var
            way = evt.browserEvent.detail ? evt.browserEvent.detail : evt.browserEvent.wheelDelta,
            t = this.target,
            swEl = Ext.get(this.scrollWrapper),
            sbEl = Ext.get(this.scrollBar),
            scrollTop = swEl.getTop(true),
            scrollHeight = swEl.getHeight(),
            height = t.getHeight(),
            maxHeight = (scrollHeight - height) * -1;
        scrollTop += way > 0 ? 20 : -20;
      
        if(scrollTop > 0){scrollTop = 0}
        if(scrollTop  < maxHeight){ scrollTop = maxHeight}
      
        swEl.setTop(scrollTop);
        sbEl.setTop((scrollTop *-1)* (height/ scrollHeight ));
        evt.preventDefault();
    },
      
    resizeScrollBar: function(){
        var
            t = this.target,
            height = t.getHeight(),
            scrollHeight = Ext.get(this.scrollWrapper).getHeight()
            sbEl = Ext.get(this.scrollBar);
      
            sbEl.setHeight(height * (height/ scrollHeight));
    },
      
    constructor: function(options){
        this.initConfig(options);
        this.createDom();
        zzz = this;
    } 
});

Ext.util.CSS.createStyleSheet(".fancy-scroll-bar-over .fancy-scroll-bar-area {visibility: visible}");
Ext.util.CSS.createStyleSheet(".fancy-scroll-bar-over .fancy-scroll-bar-bar {visibility: visible}");
          
Ext.define('Ext.ux.plugin.FancyScroll', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.fancyscroll',

    constructor: function(options){
        this.fsConfig = options || {};
    },

    initFancyScroll: function(){
        this.fsConfig['targetDom'] = this.owner.getTargetEl().dom;
        this.fancyscroll = Ext.create('FancyScroll', this.fsConfig);
    },

    init: function(owner){
        this.owner= owner;
        bla = owner;
        var e = 'afterrender';
        if(owner instanceof Ext.view.View){
            e = 'refresh'; // viewready?
        }
        owner.on(e, this.initFancyScroll, this);
    }
});

