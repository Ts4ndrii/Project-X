// Add task btn

const popupBg = document.querySelector('.form__bg');
const popup = document.querySelector('.card__form');
const popupOpen = document.querySelector('.btn__open');
const popupClose = document.querySelector('.popup__close');
const addBtn = document.querySelector('.btn__add')

popupOpen.addEventListener('click', function() {
    popupBg.classList.add('active');
    popup.classList.add('active');
})

popupClose.addEventListener('click', function() {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
})

document.addEventListener('click', function() {
    if (event.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    }
})

addBtn.addEventListener('click', function() {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
    
})

// Add task btn end




// Task manager
const tasks = [
    // {
    //     _id: '546446e5crfxexxew376yt',
    //     completed: true,
    //     body: 'Just do',
    //     title: 'Title'
    // },
    // {
    //     _id: '569746e5crfxexxew376yt',
    //     completed: true,
    //     body: 'Just do2',
    //     title: 'Title2'
    // },
    // {
    //     _id: '546446rd6e8io7y09tdetzxexxew376yt',
    //     completed: true,
    //     body: 'Just do3',
    //     title: 'Title3'
        
    // },



];

(function(arrOfTasks) {
    const objOftasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {})

    
 // dom elements 

    const tasksCards = document.querySelector(".tasks-cards")

    const form = document.forms['add-task'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];

 // dom elements 



    renderAllTasks(objOftasks);

    form.addEventListener('submit', onFormSubmitHandler)
   
    function renderAllTasks(taskList){
        if(!taskList) {
            const error = 1;
            console.error('!error')
            return
        }

        const fragment = document.createDocumentFragment();
        Object.values(taskList).forEach(task => {
            const taskCard = listItemTemplate(task)
            fragment.appendChild(taskCard)
        });
        tasksCards.appendChild(fragment)
    };

    function listItemTemplate({_id, title, body} = {}) {
        const col = document.createElement('div');
        col.classList.add('col-lg-4');

        const card = document.createElement('div');
        card.classList.add('card', 'text-light', 'bg-dark', 'm-3', 'p-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = title;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = body; 

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'delete-btn');
        deleteBtn.textContent = "Delete"



        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        card.appendChild(deleteBtn);
        col.appendChild(card)

        return col
    }

    function onFormSubmitHandler(e) {
        e.preventDefault()
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

        if (!titleValue || !bodyValue) {
            console.error('task empty')
            return
        }

        const task = createTask(titleValue, bodyValue)
        const taskItem = listItemTemplate(task)
        tasksCards.insertAdjacentElement('afterbegin', taskItem)
        form.reset()

    }

    function createTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`
        }

        objOftasks[newTask._id] = newTask;
        return { ...newTask }
    }

    



}(tasks));

// Task manager end




// Timer

let deadline = '09-01-2022'

function getTime(endTime) {

    let time = Date.parse(deadline) - Date.parse(new Date());
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 1000 / 60) % 60);
    let hours = Math.floor(time / (1000 * 60 * 60) % 24);
    let days = Math.floor(time / (1000 * 60 * 60 * 24));

    return {
        'total' : time,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}

function sedTime(id, endtime) {

    let timer1 = document.getElementById(id)
    let days = timer1.querySelector('.timer__numbers-days');
    let hours = timer1.querySelector('.timer__numbers-hours');
    let minutes = timer1.querySelector('.timer__numbers-minutes');
    let seconds = timer1.querySelector('.timer__numbers-seconds');

    timeInterval = setInterval(updateTime, 1000)

    function updateTime() {
        let t = getTime(endtime);
        days.textContent = `${t.days} d`;
        hours.textContent = `${t.hours} h`;
        minutes.textContent = `${t.minutes} m`;
        seconds.textContent = `${t.seconds} s`;

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
    
}

sedTime('timer', deadline)
// Timer end





// Tabs

const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItem = document.querySelectorAll('.task-manager');

tabsBtn.forEach(function(btn) {
    btn.addEventListener('click', function() {
        let activeBtn = btn;
        
        let tabId = activeBtn.getAttribute("data-tab");
        
        let activeTab = document.querySelector(tabId)


        tabsBtn.forEach(function(btn) {
            btn.classList.remove('active');
        })

        tabsItem.forEach(function(item) {
            item.classList.remove('active');
        })

        activeBtn.classList.add('active');
        activeTab.classList.add('active');

    })
})

// Tabs end
