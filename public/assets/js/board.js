// const { first } = require("lodash");

let boardLabel = document.getElementById('board-label');
let boardNameEdit = document.getElementById('board-name-edit');
let boardFav = document.getElementById('board-header-fav ');

let addList = document.getElementById('add-list');
let openAddList = document.getElementById('open-list-box');
let listAddControls = document.getElementById('list-add-controls');
let listCloseBtn = document.getElementById('list-close-btn');
let listAddBtn = document.getElementById('list-add-btn');
let listNameInput = document.getElementById('list-name-input');

function createCardComposerContainer(list) {
	var newCardComposerContainer = document.createElement('div');
	newCardComposerContainer.className = "card-control";

	var newOpenCardComposer = document.createElement('div');
	newOpenCardComposer.className = "open-card-box";
	newOpenCardComposer.innerHTML = "<span style=\"line-height: 30px;height: 20px;font-size:" +
		"16px;width: 20px;margin-right: 10px;border-radius: 3px;\"><i " +
		"class=\"fas fa-plus\"></i></span><span style=\"font-size: 16px;\">" +
		"Add another card</span>";

	var newCardComposer = document.createElement('div');
	newCardComposer.className = "card-composer hide";

	var newCardComposerTitle = document.createElement('textarea');
	newCardComposerTitle.className = "card-composer-title";
	newCardComposerTitle.placeholder = "Enter a title for this card..."

	var newDiv = document.createElement('div');
	newDiv.style.width = "100%";
	newDiv.style.height = "32px";
	newDiv.style.display = "flex";

	var newCardAddBtn = document.createElement('div');
	newCardAddBtn.className = "card-add-btn";
	newCardAddBtn.innerHTML = "Add card";

	var newCardCloseBtn = document.createElement('div');
	newCardCloseBtn.className = "card-close-btn";
	newCardCloseBtn.innerHTML = "<i class=\"fas fa-times\"></i>";

	newDiv.appendChild(newCardAddBtn);
	newDiv.appendChild(newCardCloseBtn);
	newCardComposer.appendChild(newCardComposerTitle);
	newCardComposer.appendChild(newDiv);
	newCardComposerContainer.appendChild(newOpenCardComposer);
	newCardComposerContainer.appendChild(newCardComposer);
	list.appendChild(newCardComposerContainer);

	newOpenCardComposer.addEventListener('click', function () {
		swapElement(newOpenCardComposer, newCardComposer);
		newCardComposerTitle.focus();
	});

	newCardAddBtn.addEventListener('click', function () {
		if (newCardComposerTitle.value !== "") {
			let url = "/boards/" + list.getAttribute('data-id-board') + "/lists/" + list.getAttribute('data-id-list') + "/cards";
			handleAPI(url, setTokenToData("title", newCardComposerTitle.value), "POST", "card");
			swapElement(newOpenCardComposer, newCardComposer);
			newCardComposerTitle.value = "";
		}
	});

	newCardCloseBtn.addEventListener('click', function () {
		swapElement(newOpenCardComposer, newCardComposer);
		newCardComposerTitle.value = "";
	});
	return newCardComposerContainer;
}

function createList(title) {

	let boardContent = document.getElementById('board-content');
	let newListWrapper = document.createElement('div');
	newListWrapper.className = "list-wrapper";

	let newList = document.createElement('div');
	newList.className = "list";

	createListHeader(newList, title);
	createListCard(newList);
	createCardComposerContainer(newList);

	newListWrapper.appendChild(newList);
	boardContent.insertBefore(newListWrapper, addList);
	newList.setAttribute("data-list", title);
	return newList;
}

boardLabel.addEventListener("dblclick", function () {
	boardNameEdit.style.zIndex = 1;
	boardNameEdit.focus();
});

boardNameEdit.addEventListener('blur', function () {
	if (boardNameEdit.value !== "") {
		boardLabel.innerHTML = boardNameEdit.value;
	}
	boardNameEdit.style.zIndex = -1;
});

boardFav.addEventListener("click", function () {
	boardFav.classList.toggle('board-header-fav-check');
});

openAddList.addEventListener('click', function () {
	swapElement(openAddList, listAddControls);
	listNameInput.focus();
});


listCloseBtn.addEventListener('click', function () {
	swapElement(openAddList, listAddControls);
});

listAddBtn.addEventListener('click', function () {
	if (listNameInput.value !== "") {
		let url = "/boards/" + board.getAttribute('data-id-board') + "/lists";
		let data = setTokenToData("title", listNameInput.value);
		handleAPI(url, data, "POST", "list");
		swapElement(openAddList, listAddControls);
		listNameInput.value = "";
	}
});

let listMember = document.querySelectorAll('.member-picker');

listMember.forEach((memberBadge) => {
	memberBadge.addEventListener('click', function () {
		if (this.children[0].classList.contains('hide')) {
			this.style.border = "3px solid #5c7cfa";
			this.children[0].classList.toggle('hide');
		} else {
			this.style.border = "none";
			this.children[0].classList.toggle('hide');
		}
	});
});

function loadMember(members) {
	members.forEach((memberName) => {
		let member = document.createElement('div');
		member.className = "member-picker";
		member.setAttribute('data-user', memberName);
		member.innerHTML = "<div class=\"member-choose hide\">" +
			"<i class=\"fas fa-check\"></i></div><span>" + memberName[0] + "</span>";
		listMemberBoard.children[2].appendChild(member);
		member.addEventListener('click', function () {
			if (this.children[0].classList.contains('hide')) {
				this.style.border = "3px solid #5c7cfa";
				this.children[0].classList.toggle('hide');
			} else {
				this.style.border = "none";
				this.children[0].classList.toggle('hide');
			}
		});
	});
}

function setBackGround(root, boardId) {
	let index = parseInt(boardId) % 10;
	let url = "../../assets/img/bg" + index + ".jpg";
	root.style.background = url;
	root.style.backgroundPosition = "center";
	root.style.backgroundRepeat = "no-repeat";
	root.style.backgroundSize = "cover";
}