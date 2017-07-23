var obj = {
	bbsList : []
}

var item1 = {
	no: 1,
	title : "제목",
	content : "내용",
	author : "홍길동",
	date : "2017-06-28 11:33:30"
}

var item2 = {
	no: 2,
	title : "제목2",
	content : "내용입니다2",
	author : "이순신",
	date : "2017-06-28 11:33:30"
}
// obj 객체의 bbsList변수의 배열에 아이템을 하나씩 받는다.
obj.bbsList.push(item1);
obj.bbsList.push(item2);

console.log(obj);
// 완성된 obj객체 json 스트링으로 변경한다.
var jsonString = JSON.stringify(obj);
console.log(jsonString);