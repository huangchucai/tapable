const {SyncHook} = require('tapable');  // 同步执行的钩子

class StudySyncHook {

    constructor() {
        this.hooks = {
            arch: new SyncHook(['name1'])
        };
    }

    tap() { // 注册的监听函数
        this.hooks.arch.tap('node', name => {
            console.log('node', name);
        });
        this.hooks.arch.tap('react', name => {
            console.log('react', name);
        });
    }

    start() {
        this.hooks.arch.call('hcc');
    }
}

let l = new StudySyncHook();
l.tap();
l.start();
console.log(l.hooks);
