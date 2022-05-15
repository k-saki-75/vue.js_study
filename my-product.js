Vue.component('my-product',{
    template: '<li>{{id}} {{name}} {{price}}(円) </li>',
    props: ['id', 'name', 'price']
});