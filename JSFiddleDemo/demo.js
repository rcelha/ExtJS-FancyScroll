Ext.onReady(function(){
document.dom_example1 = Ext.create('FancyScroll', {
    targetDom : Ext.DomQuery.select('#dom_example1')[0]
});
document.dom_example2 = Ext.create('FancyScroll', {
    targetDom : Ext.DomQuery.select('#dom_example2')[0],
    position: 'left',
    color: 'cyan'
});
Ext.define('ExampleContent', {
    extend:  'Ext.panel.Panel',
    alias: 'widget.examplecontent',
    html: '<p>EXAMPLE CONTENT</p>',
    height: 300,
    width: 300,
    items: {
        xtype: 'button',
        text: 'abcdefghijlkmnopqrstuvxyz',
        handler: function(){
            console.log('cricou', arguments)
        }
    }
});

document.ex1 = Ext.create('Ext.panel.Panel', {
    renderTo: 'ex1',
    title: 'Testing the fucking scroll',
    height: 320,
    width: 500,
    plugins: [ new Ext.ux.plugin.FancyScroll()],
    items: [
        {html: 'only one item'}
    ]
});

document.ex2 = Ext.create('Ext.Window', {
    autoShow: true,
    title: 'Testing the fucking scroll',
    height: 320,
    width: 500,
    plugins: [ new Ext.ux.plugin.FancyScroll()],
    items: [
        {xtype: 'examplecontent', itemId: 'abc'},
        {xtype: 'examplecontent'},
        {xtype: 'examplecontent'}
    ]
});

Ext.define('Image', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'src', type:'string' },
        { name:'caption', type:'string' }
    ]
});

Ext.create('Ext.data.Store', {
    id:'imagesStore',
    model: 'Image',
    data: [
        { src:'http://www.sencha.com/img/20110215-feat-drawing.png', caption:'Drawing & Charts' },
        { src:'http://www.sencha.com/img/20110215-feat-data.png', caption:'Advanced Data' },
        { src:'http://www.sencha.com/img/20110215-feat-html5.png', caption:'Overhauled Theme' },
        { src:'http://www.sencha.com/img/20110215-feat-perf.png', caption:'Performance Tuned' }
    ]
});

var imageTpl = new Ext.XTemplate(
    '<tpl for=".">',
        '<div style="margin-bottom: 10px;" class="thumb-wrap">',
          '<img src="{src}" />',
          '<br/><span>{caption}</span>',
        '</div>',
    '</tpl>'
);

document.ex3 = Ext.create('Ext.view.View', {
    store: Ext.data.StoreManager.lookup('imagesStore'),
    tpl: imageTpl,
    renderTo: 'ex3',
    autoScroll: true,
    height: 200,
    width: 300,
    plugins: [ new Ext.ux.plugin.FancyScroll()],
    itemSelector: 'div.thumb-wrap',
    emptyText: 'No images available'
});     


});

