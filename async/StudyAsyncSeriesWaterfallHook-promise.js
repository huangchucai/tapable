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
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve('node已经学完了');
                }, 2000);
            });
        });
        this.hooks.arch.tapPromise('react', (data) => {
            return new Promise((resolve => {
                setTimeout(() => {
                    console.log('react', data);
                    resolve();
                },1000);
            }))
        });
    }

    start() {
        this.hooks.arch.promise('hcc').then(() => {
            console.log('都学习完了');
        });
    }
}

let l = new StudyAsyncSeriesWaterfallHook();
l.tap();
l.start();
