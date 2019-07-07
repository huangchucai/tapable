const {SyncBailHook} = require('tapable');  // 同步执行保护的钩子
// 只有当上一个task返回为undefined的时候，才可以进行下一步

class StudyBailSyncHook {

    constructor() {
        this.hooks = {
            arch: new SyncBailHook(['name1'])
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

let l = new StudyBailSyncHook();
l.tap();
l.start();
