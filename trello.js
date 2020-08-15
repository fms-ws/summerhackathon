//初期状態のタスク管理ボード用JSONデータ
const defaultBoards = [
    {
        "id": "sample-board-1",
        "title": "タスク",
        "class": "task",
        "dragTo": ['sample-board-2', 'sample-board-3'], 
        "item": [
            { "title": "報告書の作成", "date":"タスク追加日 ： 2020年8月15日 土曜日 12時41分","detail":" "},
            { "title": "14時から打ち合わせ" , "date":"タスク追加日 ： 2020年8月15日 土曜日 12時41分","detail":" "}
        ]
    },
  
    {
        "id": "sample-board-2",
        "title": "進行中",
        "class": "progress",
        "item": [{ "title": "○○案の企画書作成" , "date":"タスク追加日 ： 2020年8月15日 土曜日 12時41分","detail":" "}]
    },
  
    {
        "id": "sample-board-3",
        "title": "完了",
        "class": "done",
        "item": [{"title": "日報の提出", "date":"タスク追加日 ： 2020年8月15日 土曜日 12時41分","detail":" "}]
    }
];
   
  
//jKanbanのインスタンス作成
const kanban = new jKanban({
    element         : '#taskboard',  //タスク管理ボードを表示するHTML要素
    gutter          : '15px',       //ボード同士の間隔
    widthBoard      : '300px',      //ボードのサイズ
    boards          : defaultBoards,//初期状態のJSONデータ
    addItemButton   : true,         //タスク追加用のボタンを表示
    //click: (elem) => kanban.removeElement(elem),
    click: (elem) => removeFormElement(elem),
    buttonClick: (elem, id) => addFormElement(id), //タスク追加用の関数を指定
    dropEl: (elem, target, source, sibling)=> dargstart(elem,target)
});


const boardparent = document.getElementById("taskboard"); 
//console.log(boardparent.childNodes[0].childNodes[1].childNodes[0].childNodes[1]);
//boardparent.removeChild(boardparent.childNodes[0].childNodes[1].childNodes[0].childNodes[1]);
boardparent.getElementsByTagName('button')[2].remove();
boardparent.getElementsByTagName('button')[1].remove();
    

//タスク追加用の関数
function addFormElement(id) {
    const formItem = document.createElement('form');
  
    formItem.innerHTML = '<input type="text">';  //タスクを追加するための入力ボックスを作成
    kanban.addForm(id, formItem);  //入力ボックスをボードに追加
  
    //タスクを登録する時のイベント処理
    formItem.addEventListener('submit', (e) => {
        e.preventDefault();

        //日時の取得
        var today=new Date();
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var week = today.getDay();
        var day = today.getDate();
        var hour = today.getHours()
        var minute = today.getMinutes()
        var week_ja= new Array("日","月","火","水","木","金","土");   

        kanban.addElement(id, {"title": e.target[0].value, "date": "タスク追加日 ： "+year+"年"+month+"月"+day+"日 "+week_ja[week]+"曜日 "+hour+"時"+minute+"分", "detail":" "}); //入力された文字列をタスクとして登録
        formItem.parentNode.removeChild(formItem); //入力ボックスを非表示にするために削除
    }) 
}


//タスク削除用の関数
var clickCount = 0 ;
let countId=0;
function removeFormElement(elem) {
    
    // シングルクリックの場合
    if( !clickCount) {
        ++clickCount ;
        if(elem.id === ""){
            elem.setAttribute("id","kanban-item"+countId);
            console.log(elem.id);
            countId++;
        }else{
            console.log("idふってあるよ");
        }
        
        if(document.getElementById('taskTitle')){
            const tasktitle = document.getElementById('taskTitle');  
            if(tasktitle.childNodes[0].innerText === elem.innerText){
                const tasktitle = document.getElementById('taskTitle');  
                const taskdetail = document.getElementById('taskDetail');
                const tasktime = document.getElementById('taskTime');
                const taskdate = document.getElementById('taskDate');
                taskwindow.removeChild(tasktitle);
                taskwindow.removeChild(taskdetail);
                taskwindow.removeChild(tasktime);
                taskwindow.removeChild(taskdate);
            }
            else{
                taskDisply(elem);
            }
        }
        else{
            taskDisply(elem);
        }
        setTimeout( function() {
            clickCount = 0 ;
            
        }, 350 ) ;

    // ダブルクリックの場合
    } else {
        if(document.getElementById('taskTitle')){
            const tasktitle = document.getElementById('taskTitle');  
            const taskdetail = document.getElementById('taskDetail');
            const tasktime = document.getElementById('taskTime');
            const taskdate = document.getElementById('taskDate');
            taskwindow.removeChild(tasktitle);
            taskwindow.removeChild(taskdetail);
            taskwindow.removeChild(tasktime);
            taskwindow.removeChild(taskdate);
        }
        kanban.removeElement(elem);
        clickCount = 0 ;
    }

}



//タスクウィンドウの生成  
const taskwindow=document.getElementById('taskwindow'); 
function taskDisply(elem) {
    if(document.getElementById('taskTitle')){
        const tasktitle = document.getElementById('taskTitle');  
        const taskdetail = document.getElementById('taskDetail');
        const tasktime = document.getElementById('taskTime');
        const taskdate = document.getElementById('taskDate');
        taskwindow.removeChild(tasktitle);
        taskwindow.removeChild(taskdetail);
        taskwindow.removeChild(tasktime);
        taskwindow.removeChild(taskdate);
    }
    const childtitle = document.createElement("div");
    childtitle.id = "taskTitle";
    childtitle.className = "taskTitle";
    const childdetail = document.createElement("div");
    childdetail.id = "taskDetail";
    childdetail.className = "taskDetail";
    const childtime = document.createElement("div");
    childtime.id = "taskTime";
    childtime.className = "taskTime";
    const childdate = document.createElement("div");
    childdate.id = "taskDate";
    childdate.className = "taskDate";

    //タイトルの要素
    const title = document.createElement("p");
    title.innerText = elem.innerText;
    title.className = "title";
    title.id = "title";
    const title_edit_button = document.createElement("button");
    title_edit_button.innerText = "編集";
    title_edit_button.className = "title_button";
    title_edit_button.id = "title_button";

    //内容の要素
    const detail = document.createElement("p");
    detail.innerText = "";
    detail.className = "detail";
    detail.id = "detail";
    const detail_edit_button = document.createElement("button");
    detail_edit_button.innerText = "編集";
    detail_edit_button.className = "detail_button";
    detail_edit_button.id = "detail_button";

    //経過時間の要素
    const time = document.createElement("p");
    time.innerText = "タスク経過時間 : "+hour+':'+min+':'+sec;

    //追加日の要素
    const date = document.createElement("p");
    date.innerText = elem.dataset.date;

    childtitle.appendChild(title);
    childtitle.appendChild(title_edit_button);
    childdetail.appendChild(detail);
    childdetail.appendChild(detail_edit_button);
    childtime.appendChild(time);
    childdate.appendChild(date);

    taskwindow.appendChild(childtitle);
    taskwindow.appendChild(childdetail);
    taskwindow.appendChild(childtime);
    taskwindow.appendChild(childdate);

    title_button_click();
    detail_button_click();

}; 

//タスクタイトルの編集
function title_button_click(){
    if(document.getElementById("title_button")){
        document.getElementById("title_button").onclick = function(){
            const tasktitle = document.getElementById('taskTitle');  
            const title_edit_button = document.getElementById('title_button');  
            const title = document.getElementById('title');
            tasktitle.removeChild(title_edit_button);
            tasktitle.removeChild(title);
            const formItem = document.createElement('form');
            formItem.innerHTML = '<input type="text" class="text_box">';
            tasktitle.appendChild(formItem);

            formItem.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.createElement("p");
                title.innerText = e.target[0].value;
                title.className = "title";
                title.id = "title";
                const title_edit_button = document.createElement("button");
                title_edit_button.innerText = "編集";
                title_edit_button.className = "title_button";
                title_edit_button.id = "title_button";
                tasktitle.appendChild(title);
                tasktitle.appendChild(title_edit_button);
                //elem.dataset.date = e.target[0].value;
                formItem.parentNode.removeChild(formItem);
                title_button_click();
            })
        }
    }
}

//タスク内容の編集
function detail_button_click(){
    if(document.getElementById("detail_button")){
        document.getElementById("detail_button").onclick = function(){
            const taskdetail = document.getElementById('taskDetail');  
            const detail_edit_button = document.getElementById('detail_button');  
            const detail = document.getElementById('detail');
            taskdetail.removeChild(detail_edit_button);
            taskdetail.removeChild(detail);
            const form_text_area = document.createElement('form');
            form_text_area.id = "form_text_area";
            form_text_area.innerHTML = '<textarea id="text_area" class="text_area" name="t_name" cols="60" rows="30" wrap="hard">';
            taskdetail.appendChild(form_text_area);
            const form_text_submit = document.createElement('form');
            form_text_submit.innerHTML = '<input class="text_submit" type="submit" value="完了する">';
            taskdetail.appendChild(form_text_submit);

            form_text_submit.addEventListener('submit', (e) => {
                e.preventDefault();
                const form_text_area = document.getElementById("form_text_area");
                const text_area = document.getElementById("text_area");
                console.log(text_area.value);
                console.log(form_text_submit);
                const detail = document.createElement("p");
                detail.innerText = text_area.value;
                detail.className = "detail";
                detail.id = "detail";
                const detail_edit_button = document.createElement("button");
                detail_edit_button.innerText = "編集";
                detail_edit_button.className = "detail_button";
                detail_edit_button.id = "detail_button";
                taskdetail.appendChild(detail);
                taskdetail.appendChild(detail_edit_button);
                //elem.dataset.date = e.target[0].value;
                taskdetail.removeChild(form_text_submit);
                taskdetail.removeChild(form_text_area);
                detail_button_click();
            })
        }
    }
}

//タスク経過時間の計算
var t_count = 0 ;
if(t_count===0){
    var hour = "0";
    var min = "0";
    var sec = "0";
}
function dargstart(el, target){
    var starttime;
    if(target.parentElement.getAttribute('data-id')=='sample-board-2'){
        starttime = Date.now();
        //console.log(el);
        startwatch(el,starttime);
        t_count=1;
    }else if(target.parentElement.getAttribute('data-id')=='sample-board-3'){
        clearTimeout(timerId);
        t_count=0;
    }
}

var time;
var timerId;
var restarttime = 0;
function startwatch(el, starttime){
    //var starttime;
    timecount();
    function timeConversion(){
        var hour = Math.floor(time/1000/60/60);
        var min = Math.floor((time/60/1000)%60);
        var sec = Math.floor((time/1000)%60);
        console.log(el);
        console.log(hour+':'+min+':'+sec);
    }
    function timecount(){
        timerId = setTimeout(function(){
            time = Date.now() - starttime + restarttime;
            timeConversion();
            timecount();
        },1000);
    }
}