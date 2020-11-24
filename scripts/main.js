

var arrToDoList = [];

var arrToDoListKey = 'arrToDoListKey';

function initToDoList() {
    let result = localStorage[arrToDoListKey];

    if (result) {
        this.arrToDoList = JSON.parse(result);
    } else {
        this.arrToDoList = [];
    }
}


function addNewToDoItem() {

    this.initToDoList();

    let description = document.getElementById('input_description').value;
    let date = document.getElementById('input_date').value;

    if (!description || !description.length) {
        alertify.error('Please fill task description');
        return;
    }

    if (!date || !date.length) {
        alertify.error('Please fill task date');
        return;
    }

    this.arrToDoList.push({
        description,
        date
    });

    localStorage[arrToDoListKey] = JSON.stringify(this.arrToDoList);

    document.getElementById('input_description').value = null;
    document.getElementById('input_date').value = null;

    alertify.success('Data Saved Successfully');
    this.buildToDoListHtml();



}


function removeToDoItem(index) {
    alertify.confirm('Delete task number ' + (index + 1), 'Are you sure?',
        () => {
            this.initToDoList();

            if (index > -1) {
                this.arrToDoList.splice(index, 1);
            }

            localStorage[arrToDoListKey] = JSON.stringify(this.arrToDoList);

            alertify.success('Task deleted successfully');
            this.buildToDoListHtml();
        }
        , () => {
            //Dont do anything
        })
}


function buildToDoListHtml() {
    this.initToDoList();

    let containerElem = document.getElementById('div_to_do_list');

    let index = 0;

    containerElem.innerHTML = "";

    this.arrToDoList.forEach(item => {

        let newToDoElement = document.createElement('div');
        newToDoElement.className = "div-to-do-list-item";
        newToDoElement.innerHTML += '<div class="div-to-do-description">' + (index + 1) + '. ' + item.description + '</div>';
        newToDoElement.innerHTML += '<div class="div-to-do-delete-action" onclick="removeToDoItem(' + index + ')">X</div>';
        newToDoElement.innerHTML += '<span class="span-date">' + item.date + '</span>';

        containerElem.appendChild(newToDoElement);
        index++;
    });

    containerElem.scrollTop = containerElem.scrollHeight;

}



function initFormData() {
    let divFromTitle = document.getElementById('div_form_title');
    divFromTitle.innerHTML = moment().format('MMM DD YYYY');

    this.buildToDoListHtml();
}

