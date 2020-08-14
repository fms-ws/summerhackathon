//日時の取得
var today=new Date();
var year = today.getFullYear();
var month = today.getMonth()+1;
var week = today.getDay();
var day = today.getDate();
var week_ja= new Array("日","月","火","水","木","金","土");   

//初期状態のタスク管理ボード用JSONデータ
const defaultBoards = [
    {
        "id": "sample-board-1",
        "title": "タスク",
        "class": "task",
        "dragTo": ['sample-board-2', 'sample-board-3'], 
        "item": [
            { "title": "報告書の作成" },
            { "title": "14時から打ち合わせ" }
        ]
    },
  
    {
        "id": "sample-board-2",
        "title": "進行中",
        "class": "progress",
        "item": [{ "title": "○○案の企画書作成" }]
    },
  
    {
        "id": "sample-board-3",
        "title": "完了",
        "class": "done",
        "item": [{ "title": "日報の提出"}]
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
    buttonClick: (elem, id) => addFormElement(id) //タスク追加用の関数を指定
});
    

//タスク追加用の関数
function addFormElement(id) {
    const formItem = document.createElement('form');
  
    formItem.innerHTML = '<input type="text">';  //タスクを追加するための入力ボックスを作成
    kanban.addForm(id, formItem);  //入力ボックスをボードに追加
  
    //タスクを登録する時のイベント処理
    formItem.addEventListener('submit', (e) => {
        e.preventDefault();

        kanban.addElement(id, {"title": e.target[0].value}); //入力された文字列をタスクとして登録
        formItem.parentNode.removeChild(formItem); //入力ボックスを非表示にするために削除
    }) 
}   


//タスク削除用の関数
var clickCount = 0 ;
function removeFormElement(elem) {
    console.log(elem);
    
    // シングルクリックの場合
    if( !clickCount) {
        ++clickCount ;
        taskDisply(elem);
        setTimeout( function() {
            clickCount = 0 ;
            
        }, 350 ) ;

    // ダブルクリックの場合
    } else {
        if(document.getElementById('taskdetail')){
            const tasktitle = document.getElementById('taskTitle');  
            const taskdetail = document.getElementById('taskDetail');
            const taskdate = document.getElementById('taskDate');
            taskwindow.removeChild(tasktitle);
            taskwindow.removeChild(taskdetail);
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
        const taskdate = document.getElementById('taskDate');
        taskwindow.removeChild(tasktitle);
        taskwindow.removeChild(taskdetail);
        taskwindow.removeChild(taskdate);
    }
    const childtitle = document.createElement("div");
    childtitle.id = "taskTitle";
    childtitle.className = "taskTitle";
    const childdetail = document.createElement("div");
    childdetail.id = "taskDetail";
    childdetail.className = "taskDetail";
    const childdate = document.createElement("div");
    childdate.id = "taskDate";
    childdate.className = "taskDate";

    const title = document.createElement("h2");
    title.innerText = elem.innerText;
    const date = document.createElement("p");
    date.innerText = "追加日　：　"+year+"年"+month+"月"+day+"日 "+week_ja[week]+"曜日";
    childtitle.appendChild(title);
    childdate.appendChild(date);
    taskwindow.appendChild(childtitle);
    taskwindow.appendChild(childdetail);
    taskwindow.appendChild(childdate);

}; 