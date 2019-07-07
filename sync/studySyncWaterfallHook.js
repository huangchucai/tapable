const {SyncWaterfallHook} = require('tapable'); // 同步执行的钩子
// 第一个回调函数的返回值被第二个回调函数使用
class StudySyncWaterfallHook {

    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name1'])
        };
    }

    tap() { // 注册的监听函数
        this.hooks.arch.tap('node', name => {
            console.log('node', name);
            return '第一个返回'
        });
        this.hooks.arch.tap('react', (data) => {
            console.log('react', data);
        });
    }

    start() {
        this.hooks.arch.call('hcc');
    }
}

let l = new StudySyncWaterfallHook();
l.tap();
l.start();
