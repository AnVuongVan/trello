let newBoardBtn = document.getElementById('new-board');
let popup = document.getElementById('popup');
let saveBoardBtn = document.getElementById('save-board');
let cancelBoardBtn = document.getElementById('cancel-board');
let inputNameBoard = document.getElementById('input-name-board');

let popupAction = document.getElementById('popup-action');
let changeTitleBtn = document.getElementById('change-title-btn');
let deleteBoardBtn = document.getElementById('delete-board-btn');
let changeAvatarBtn = document.getElementById('camera');
let colorPalette = document.getElementById('color-picker');
let avatar = document.getElementById('avatar');

let colorIndex = 0;

let btnGroup = document.querySelectorAll(".btn");
btnGroup.forEach(function (btn) {
	btn.addEventListener('click', function () {
		btnGroup.forEach(function (btn) {
			btn.className = "btn";
		});
		if (!this.classList.contains('is-clicked')) {
			this.classList.toggle('is-clicked');
		} else {
			this.classList.toggle('is-clicked');
		}
	});
});

newBoardBtn.addEventListener('click', function () {
	if (popup.classList.contains('hide')) {
		popup.classList.toggle('hide');
		inputNameBoard.focus();
	}
});

saveBoardBtn.addEventListener('click', function (e) {
	e.preventDefault();
	if (inputNameBoard.value != "") {
		handleAPI("/boards", setTokenToData("title",inputNameBoard.value), "POST", "board");
		popup.classList.toggle('hide');
	}
});

cancelBoardBtn.addEventListener('click', function () {
	popup.classList.toggle('hide');
	inputNameBoard.value = "";
});

changeTitleBtn.addEventListener('click', function () {

});

deleteBoardBtn.addEventListener('click', function () {
	handleAPI("/boards/" + popupAction.getAttribute('data-id-board'), setTokenToData("",""), "DELETE", "board");
	popupAction.className = "action hide";
});

changeAvatarBtn.addEventListener('click', function () {
	colorPalette.classList.toggle('hide');
	setPosition(changeAvatarBtn, colorPalette, 0, 40);
	//console.log("click");
});

function renderBoard(boardId, boardName) {
	let boardWrapper = document.getElementById('board-wrapper');
	let newBoard = document.createElement('a');
	newBoard.href = "/board/" + boardId;
	newBoard.className = "board background";
	newBoard.setAttribute('data-id-board', boardId);
	setBackGround(newBoard);

	let newBoardName = document.createElement('div');
	newBoardName.className = "board-name";
	newBoardName.innerHTML = "<span>" + boardName + "</span>";

	let newBoardControl = document.createElement('div');
	newBoardControl.className = "board-control";
	newBoardControl.innerHTML = "<i class=\"fas fa-sliders-h\"></i>";

	newBoardControl.addEventListener('click', function (e) {
		e.preventDefault();
		if (popupAction.getAttribute('data-id-board') == boardId) {
			popupAction.className = "popup-action hide";
			popupAction.setAttribute('data-id-board', "");
		} else {
			popupAction.className = "popup-action";
			popupAction.setAttribute('data-id-board', boardId);
		}
		setPosition(this, popupAction, 0, 40);
	});

	newBoard.appendChild(newBoardName);
	newBoard.appendChild(newBoardControl);
	boardWrapper.insertBefore(newBoard, newBoardBtn);
}

function setBackGround(board) {
	let index = parseInt(board.getAttribute('data-id-board')) % 10;
	//console.log(index);
	let url = "assets/img/bg" + index + ".jpg";
	board.style.background = "url('" + url + "')";
	board.style.backgroundPosition = "center";
	board.style.backgroundRepeat = "no-repeat";
	board.style.backgroundSize = "cover";
	
}

function resetAllColor() {
	let palette = colorPalette.children[3];
	for (let i = 0; i < palette.childElementCount; i++) {
		palette.children[i].className = "color";
	}
}

function createColorPalatte() {
	var hex = ["#6bc950", "#ff533c", "#5b5eff", "#ff7fab", "#000"];
	hex.forEach(function (c) {
		let color = document.createElement('div');
		color.className = "color";
		color.style.backgroundColor = c;
		color.innerHTML = "<i class=\"fas fa-check\"></i>";
		color.addEventListener('click', function () {
			if (!this.classList.contains('picked')) {
				resetAllColor();
				color.className = "color picked";
				avatar.style.backgroundColor = c;
			}
		});
		colorPalette.children[3].appendChild(color);
	});

	colorPalette.children[0].addEventListener('click', function () {
		colorPalette.classList.toggle('hide');
	});
}