TypeScript Cypress Unfetch Demo
=========================================

由于Cypress目前不支持对浏览器的`window.fetch`进行捕获，有时候我们需要使用一个叫unfetch的库，来替换fetch，
使得使用fetch的操作在内部改为使用XHR。

注意点：

1. 网上的做法是先访问 https://unpkg.com/unfetch/dist/unfetch.umd.js 拿到其代码，再放在程序中执行，在这个Demo中我是把其内容直接放在了代码中。
2. 在`win.eval(unfetchPolyfill)`前，旧版本(3.x)的unfetch一定要先删除`window.fetch`，因为unfetch内部会先尝试使用window.fetch，但是新版本（4.x)不需要
3. 在`Cypress.on`内部不能使用`cy.request`，因为它会在`cy.visit`中被调用，而cypress为了维护内部逻辑，不允许这样调用。
   所以如果我们想通过`cypress.request`拿unfetch代码，那么可以把它放在外面，比如另一个`before()`中。
4. 不能从本地拿unfetch，`import unfetch from 'unfetch'`，因为没有在目标window中运行，内部使用的xhr还是最外层window的，会导致cypress依旧无法捕获。

```
npm install
npm run server

npm run test:open
npm run test:run
```
