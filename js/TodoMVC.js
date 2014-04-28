/* globals Backbone jQuery $ _ */

var TodoMVC = new Backbone.Marionette.Application();


/*
 * リージョンとは、特定の要素の中に表示されるコンテンツを管理するためのもの。
 * TodoMVCオブジェクトのaddRegionsメソッドは、複数のリージョンを一度に作成するための短縮記法。
 * それぞれのリージョンについて、jQueryのセレクタが指定されている。
 * そしてリージョンに対し、Backbone.jsのビューを表示させるよう指示している。
 */
TodoMVC.addRegions({
    header: '#header',
    main: '#main',
    footer: '#footer'
});

/*
 * アプリケーションオブジェクトが初期化されると、Backbone.history.start()を呼び出して
 * 初期URLへのルーティングを行う。
 */
TodoMVC.on('initialize:after', function() {
    Backbone.history.start();
});