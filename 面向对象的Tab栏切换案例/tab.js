var that;
class Tab {
    //传入要做Tab栏的元素的id
    constructor(id){
        that=this;
        //获取元素
        this.main = document.getElementById(id);
        this.ul=this.main.querySelector('.tab_list ul:first-child');
        // this.lis = this.ul.querySelectorAll('li');
        this.con=this.main.querySelector('.tab_con');
        // this.sections=this.con.querySelectorAll('section');
        // this.guanbiBtns=this.main.querySelectorAll('.tab_list .guanbi-btn');
        this.add=this.main.querySelector('.tabAdd');
        this.init();
    }
    //初始化函数
    init(){
        this.update();
        //绑定事件
        this.add.addEventListener('click',this.addTab);
    }
    //切换功能
    toggleTab(){
        that.clearStyle();
        this.className='current';
        that.sections[this.dataIndex].className='item';
    }
    //添加功能
    addTab(){
        //直接用字符串形式创建li和section,创建新的Tab页时，tab页停留在创建的新元素上，之前所停留的页面要清除样式。
        that.clearStyle();
        var li = '<li class="current"><span>新建Tab页</span><span class="guanbi-btn">x</span></li>';
        var section = '<section class="item">新建Tab页内容</section>';
        //把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend',li);
        that.con.insertAdjacentHTML('beforeend',section);
        that.update();
    }
    //删除功能
    removeTab(e){
        //阻止冒泡
        e.stopPropagation();
        var index=this.parentNode.dataIndex;
        //移除对应的li元素
        this.parentNode.remove();
        //移除对应的section元素
        that.sections[index].remove();
        that.update();
        //如果删除的是当前没有选定状态的li，那么删除他自己后，保持原来的li仍处于选定状态
        if(document.querySelector('.current')) return;
        //如果删除的是当前处于选定状态的li，那么删除后让他的前一个li处于选定状态
        console.log(index);
        console.log(that.lis.length);
        if(index > 0){
            that.lis[index - 1].click();
        } else {
            if(that.lis.length == 0){
                return;
            }else{
                that.lis[index].click();
            }
        }
    }
    //编辑功能
    editTab(){
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        
        var str=this.innerHTML;
        this.innerHTML='<input type="text" />';
        
        var input = this.children[0];
        input.value = str;
        //里面的文字处于被选中状态，同时也自动获得了焦点
        input.select();
        //失去焦点后，把文本框里面的值给span
        input.addEventListener('blur', function () {
            this.parentNode.innerHTML = this.value;
        })
        //按下回车键也可以把文本框里面的值给span
        input.addEventListener('keyup', function (e) {
            if (e.keyCode == 13) {
                this.blur();
            }
        })
    }
    //清除样式 排他思想
    clearStyle(){
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].className='';
            this.sections[i].className='';
        }
    }
    //更新li和section
    update(){
        //重新获取lis和sections和guanbiBtns
        this.lis = this.ul.querySelectorAll('li');
        this.sections=this.con.querySelectorAll('section');
        this.guanbiBtns=this.main.querySelectorAll('.tab_list .guanbi-btn');
        this.spans=this.ul.querySelectorAll('li span:first-child');

        //重新绑定事件
        for(var i = 0;i<this.lis.length; i++){
            this.lis[i].dataIndex=i;
            this.lis[i].addEventListener('click', this.toggleTab);
            this.spans[i].addEventListener('dblclick',this.editTab);
            this.sections[i].addEventListener('dblclick',this.editTab);
            this.guanbiBtns[i].addEventListener('click',this.removeTab);
        }
    }
}
var mytab = new Tab('tab');