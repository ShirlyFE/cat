/**
 * 查找文件 ==> 解析文件 ==> 批量输出
 */
var globExpand, Module, _;

globExpand = require('glob-expand');

Module = require('./Module');

_ = require('underscore');

function Cat( config ) {
    this.config = config;
    this.modules = [];
}

Cat.prototype.build = function() {
    debugger;
    var config = this.config,
        files = globExpand({
            cwd: config.path,
            filter: 'isFile'
        }, '**/*'),
        modules = this.modules,
        _this = this;

    //如果不存在文件则报错
    if(files.length > 0){
        _.each(files, function(filename) {
            modules.push( new Module( {
                path: config.path,
                filename: filename,
                cat: _this,
                template: config.template,
                dstPath: config.dstPath
            } ) );
        });
    } else {
        console.log('文件夹下没有文件！');
    }

};

module.exports = Cat;