const {SyncLoopHook} = require('tapable');  // 同步执行的钩子
// 遇到某个不反悔undefined的监听函数，重复执行
class StudySyncLoopHook {

    constructor() {
        this.hooks = {
            arch: new SyncLoopHook(['name1'])
        };
        this.index = 0;
    }

    tap() { // 注册的监听函数
        this.hooks.arch.tap('node', name => {
            console.log('node', name);
            return ++this.index === 3 ? undefined : '继续学习';
        });
        this.hooks.arch.tap('react', name => {
            console.log('react', name);
        });
    }

    start() {
        this.hooks.arch.call('hcc');
    }
}

let l = new StudySyncLoopHook();
l.tap();
l.start();
