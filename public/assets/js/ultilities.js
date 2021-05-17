function swapElement(fisrt, second) {
    fisrt.classList.toggle('hide');
    second.classList.toggle('hide');
}

function setPosition(first, second, offsetX, offsetY) {
    let position = first.getBoundingClientRect();
    let positionLeft = position.left + offsetX;
    let positionTop = position.top + offsetY;
    second.style.top = positionTop + "px";
    second.style.left = positionLeft + "px";
}

function handleAPI(url, data, method, type) {
    //let boardContent = document.getElementById('board-content');
    console.log(url);
    console.log(data);
    console.log(method);
    console.log(type);
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: function(response) {
            //console.log(response);
            if (type == "board") {
                switch (method) {
                    case "GET":
                        for (let i = 0; i < response.length; i++) {
                            renderBoard(response[i].id, response[i].title);
                        }
                        break;
                    case "POST":
                        renderBoard(response.id, response.title);
                        setPopupMessage("Add board successfully !!!", true);
                        break;
                    case "PUT":
                        setPopupMessage("Update board successfully !!!", true);
                        break;
                    case "DELETE":
                        deleteBoard();
                        setPopupMessage("Delete board successfully !!!", true);
                        break;
                    default:
                        //console.log("Error method at type board");
                }
            } else if (type == "list") {
                switch (method) {
                    case "GET":
                        let board = document.getElementById('board');
                        board.setAttribute('data-id-board', document.URL.split("/")[4]);
                        response.forEach(item => {
                            let list = renderList(item);
                            renderListCard(list, item.card);
                        });
                        break;
                    case "POST":
                        let list = setEmptyList(response);
                        renderList(list);
                        setPopupMessage("Add board successfully !!!", true);
                        break;
                    case "PUT":
                        setPopupMessage("Update list successfully !!!", true);
                        break;
                    case "DELETE":
                        deleteList();
                        setPopupMessage("Delete list successfully !!!", true);
                        break;
                    default:
                        //console.log("Error method at type list");
                }

            } else if (type == "card") {
                switch (method) {
                    case "GET":
                        //console.log(response);
                        renderCardInfo(response);
                        break;
                    case "POST":
                        let list = getList(response.list_id);
                        let card = setEmptyCard(response);
                        loadCard(list, card);
                        setPopupMessage("Add card successfully !!!", true);
                        break;
                    case "PUT":
                        setPopupMessage("Update card successfully !!!", true);
                        break;
                    case "DELETE":
                        setPopupMessage("Delete card successfully !!!", true);
                        break;
                    default:
                        //console.log("Error method at type card");
                }
            } else if (type == "comment") {
                switch (method) {
                    case "GET":
                        break;
                    case "POST":
                        renderComment(response, new Date());
                        break;
                    case "PUT":
                        break;
                    case "DELETE":
                        break;
                    default:
                        //console.log("Error method at type card");
                }
            } else if (type == "attachment") {
                switch (method) {
                    case "GET":
                        break;
                    case "POST":
                        renderAttachment(response);
                        break;
                    case "PUT":
                        break;
                    case "DELETE":
                        break;
                    default:
                        //console.log("Error method at type card");
                }
            } else if (type == "checklist") {
                switch (method) {
                    case "GET":
                        break;
                    case "POST":
                        //console.log(response);
                        renderCheckList(response);
                        break;
                    case "PUT":
                        console.log(response);
                        break;
                    case "DELETE":
                        break;
                }
            }
        },
        error: function(request, status, error) {
            setPopupMessage(status, false);
        }
    });
}

function setDateText(date, format) {
    let d = new Date(date);
    let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : (d.getHours());
    let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : (d.getMinutes());
    let second = (d.getSeconds() < 10) ? ("0" + d.getSeconds()) : (d.getSeconds());
    if (format == "y-m-d h:i:s") {
        return d.getFullYear() + "-" + `${d.getMonth() + 1}` + "-" + d.getDate() +
            " " + hour + ":" + minute + ":" + second;
    } else if (format == "d/m/y h:i") {

        return d.getDate() + "/" + `${d.getMonth() + 1}` + "/" + d.getFullYear() +
            " " + hour + ":" + minute;
    } else if (format == "d/m h:i") {
        return `${d.getDate()}` + " Month " + `${d.getMonth() + 1}` + " at " + hour + ":" + minute;
    } else {
        return `${d.getDate()}` + " Month " + `${d.getMonth() + 1}`;
    }
}

function setTokenToData(tag, data) {
    console.log(data);
    let json;
    if (data != "") {
        if (tag != "list_checklists") {
            let token = $('meta[name="csrf-token"]').attr('content');
            json = "{\"" + tag + "\":\"" + data + "\",\"_token\":\"" + token + "\"}";
        } else {
            let token = $('meta[name="csrf-token"]').attr('content');
            json = "{\"" + tag + "\":[" + data + "],\"_token\":\"" + token + "\"}";
        }
        return JSON.parse(json);
    } else {
        let token = $('meta[name="csrf-token"]').attr('content');
        json = "{\"_token\":\"" + token + "\"}";
        return JSON.parse(json);
    }
}

function uploadFile(formData) {
    let request = new XMLHttpRequest();
    request.onload = () => {
        //console.log(request.responseText);
    };

    request.open('POST', 'upload.php');
    request.setRequestHeader('Content-type', 'multipart/form-data');
    request.send(formData);
}

function setURLCard(boardId, listId, cardId) {
    let url = "/boards/" + boardId + "/lists/" + listId + "/cards/" + cardId;
    return url;
}

function deleteList() {
    let boardContent = document.getElementById('board-content');
    let listControl = document.getElementById('list-control');
    for (let i = 0; i < boardContent.childElementCount - 1; i++) {
        if (boardContent.children[i].children[0].getAttribute('data-id-list') == listControl.getAttribute('data-id-list')) {
            boardContent.removeChild(boardContent.children[i]);
        }
    }
}

function deleteBoard() {
    let boardWrapper = document.getElementById('board-wrapper');
    let popupAction = document.getElementById('popup-action');
    for (let i = 0; i < boardWrapper.childElementCount; i++) {
        if (boardWrapper.children[i].getAttribute('data-id-board') == popupAction.getAttribute('data-id-board')) {
            boardWrapper.removeChild(boardWrapper.children[i]);
        }
    }
}

function getList(listId) {
    let boardContent = document.getElementById('board-content');
    for (let i = 0; i < boardContent.childElementCount - 1; i++) {
        if (boardContent.children[i].children[0].getAttribute('data-id-list') == listId) {
            let list = boardContent.children[i].children[0];
            return list;
        }
    }
}

function getCard(listId, cardId) {
    let boardContent = document.getElementById('board-content');

    for (let i = 0; i < boardContent.childElementCount - 1; i++) {
        if (boardContent.children[i].children[0].getAttribute('data-id-list') == listId) {
            let list = boardContent.children[i].children[0];
            for (let j = 0; j < list.children[1].childElementCount; j++) {
                let card = list.children[1].children[j];
                if (card.getAttribute('data-id-card') == cardId) {
                    return card;
                }
            }
        }
    }
}

function setEmptyCard(response) {
    let cardJson = { id: response.id, title: response.title, lists_id: response.list_id, dead_line: null, status: "", description: "", attachment: null, check_lists: [], comments: [] };
    return cardJson;
}

function setEmptyList(response) {
    let listJson = { id: response.id, title: response.title, board_id: 0, card: [] };
    return listJson;
}

function setUrlBackground(boardId) {
    let index = parseInt(boardId) % 10;
    let url = "../../assets/img/bg" + index + ".jpg";
    return url;
}

function setPopupMessage(msg, isSuccess) {
    let popupMessage = document.getElementById('popup-message');
    if (isSuccess == true) {
        popupMessage.className = "popup popup-message success";
    } else {
        popupMessage.className = "popup popup-message fail";
    }
    popupMessage.innerHTML = "<span>" + msg + "</span>";
    setTimeout(function() {
        popupMessage.className = "popup popup-message hidden";
    }, 2000);
}