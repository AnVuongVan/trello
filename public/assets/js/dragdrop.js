
//Cả dragenter và dragover và drop phải có e.preventDefault
// let memberName = ["hoandx", "dxhoan", "abc"];
// loadMember(memberName)

let attachmentJson = {"attachment_name": ""};
dropzone.addEventListener('drop', (e) => {
	e.preventDefault();
	let formData = new FormData();
	let files = e.dataTransfer.files;
	if (files.length != 0) {
		for (let i = 0; i < files.length; i++) {
			//console.log(typeof(files[i].name));
			attachmentJson.attachment_name = files[i].name;
			renderAttachment(attachmentJson);
			formData.append('file[]', files[i]);
		}
	};
	uploadFile(formData);
	dropzone.style.zIndex = -1;
});

dropzone.addEventListener("dragenter", function (e) {
	e.preventDefault();
});

dropzone.addEventListener("dragover", function (e) {
	e.preventDefault();
});

dropzone.addEventListener("dragleave", function () {
	isDrag = false;
	dropzone.style.zIndex = -1;
});

var isDrag = false;

cardInfo.addEventListener('dragover', function (e) {
	e.preventDefault();
	//consoleLog("dragover");
	if (isDrag == false) {
		dropzone.style.zIndex = 3;
		dropzone.style.width = cardInfo.getBoundingClientRect().width + "px";
		dropzone.style.height = cardInfo.getBoundingClientRect().height + "px";
		isDrag = true;
	}
});

function handleDragDrop(card) {
	card.addEventListener('dragstart', function (e) {
		//console.log("dragstart");
		//console.log(e.target.className);
		this.className = "card drag";
	});

	card.addEventListener('dragend', function (e) {
		//console.log("dragend");
		//console.log(e.target.className);
		this.className = "card";
	});

	card.addEventListener('dragover', function(e) {
		e.preventDefault()
		this.className = "card dragover";
		//console.log()
		createEmptyCard(e.target.parentNode, e.targer);
	});

	card.addEventListener('dragleave', function() {
		//console.log('dragleave');
		this.className = "card";
	});

	card.addEventListener('drop', function(e) {
		e.stopPropagation();
		e.preventDefault();
		//console.log('drop');
		this.className = "card";
		//console.log(e.target);
	});
}