const {AsyncSeriesHook} = require('tapable');

/***
 * 异步串行, 第一个执行之后，第二个依次执行
 */
class StudyAsyncSeriesHook {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHook(['AsyncSeriesHook'])
        };
    }

    tap() { // 注册的监听函数
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                cb();
            }, 2000);
        });
        this.hooks.arch.tapAsync('react', (name, cb) => {
            setTimeout(() => {
                console.log('react', name);
                cb();
            }, 4000);
        });
    }

    start() {
        this.hooks.arch.callAsync('hcc', () => {
            console.log('都学习完了');
        });
    }
}

let l = new StudyAsyncSeriesHook();
l.tap();
l.start()
