const {AsyncSeriesWaterfallHook} = require('tapable');

/***
 * 异步串行, 第一个执行之后，第二个依次执行
 */
class StudyAsyncSeriesWaterfallHook {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['AsyncSeriesHook'])
        };
    }

    tap() { // 注册的监听函数
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                cb(null, '结果');
            }, 2000);
        });
        this.hooks.arch.tapAsync('react', (data, cb) => {
            setTimeout(() => {
                console.log('react',data);
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

let l = new StudyAsyncSeriesWaterfallHook();
l.tap();
l.start();
